// データベース構成
// (database)   (tables)   (data)
// curry      | recipes  | id : INT
//            |          | title : TEXT
//            |          | ingredients : TEXT
//            |          | how_to_make : TEXT
//            |          | point : TEXT
//            |          | image_path : TEXT

const OpenAI = require("openai")
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());
dotenv.config();
const openai = new OpenAI(process.env.OPENAI_API_KEY);
const fs = require('fs');
const path = require('path');


const client = mysql.createConnection({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'curry'
});

// データベース(curry)と接続
client.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + client.threadId);
});

// レシピ読み込み
app.get('/recipes', (req,res) => {
    client.query('select * from recipes;', (err, result) => {
        if (err) {
            console.error('read error from recipe table');
            throw err;
        }
        res.json(result);
    });
});

// レシピ追加
app.post('/recipes/add', (req,res) => {
    const title = req.body.title;
    const ingredients = req.body.ingredients;
    const how_to_make = req.body.how_to_make;
    const point = req.body.point;
    const image_path = req.body.image_path;
    client.query('insert into recipes(title, ingredients, how_to_make, point, image_path) values(?, ?, ?, ?, ?)', [title, ingredients, how_to_make, point, image_path], (err, result) => {
        if (err) {
            console.error('add error into recipe table');
            throw err;
        }
        res.send(result)
    });
});

// レシピ削除
app.delete('/recipes/delete', (req,res) => {
    const id = req.body.id;
    let request = '';
    if (id == 0) request = 'delete from recipes order by id desc limit 1';
    else request = `delete from recipes where id = ${id}`;
    client.query(request, (err) => {
        if (err) {
            console.error('delete error from recipe table');
            throw err;
        }
        client.query('select * from recipes;', (err, result) => {
            if (err) {
                console.error('read error from recipe table');
                throw err;
            }
            res.send(result);
        });
    });
});

// 画像生成
app.post("/recipes/openai",async(req,res) => {
    console.log(req.body);
    const img_text = "以下のタイトルのおいしそうなカレーライスの写真を作ってください\n" + req.body.title+ "テキストは少なめにしてください"
    // const img_text = "おいしいカレーライス"

    async function generateImage(img_text) {
        const img_Response = await openai.images.generate({
            model: "dall-e-3",
            prompt: img_text,
            n: 1,
            size: "1024x1024",
            quality: "standard"
        });
        return img_Response;
    }

    try {
        const img_Response = await generateImage(img_text);
        console.log(img_Response);
        const img_url = img_Response.data[0].url;
        // setResponseParts(responseParts + `\n\n![カレーライスの画像](${img_url})`);
        res.send(img_url);
        console.log("Image generated successfully");
    }
    catch (error) {
        console.error("Error generating image:", error);
    }

})

app.post("/recipes/download", async(req,res) => {
        
    const response = await app.get(req.body.img_url, {
        responseType: "blob",
    });
    const currentDirectory = process.cwd();
    console.log(currentDirectory);
    const fileName = src.substring(src.lastIndexOf("/") + 1);
    fs.writeFile(path.resolve(img_url), response, (err) => {
        if (err) {
        console.error('Error while saving the file:', err);
        } else {
        console.log('File saved successfully');
        }
    })}
)

app.listen(port, () => {
    console.log(`listening on *:${port}`);
});
