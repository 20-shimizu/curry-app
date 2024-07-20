// データベース構成
// (database)   (tables)   (data)
// curry      | recipes  | id : INT
//            |          | title : TEXT
//            |          | ingredients : TEXT
//            |          | how_to_make : TEXT
//            |          | point : TEXT
//            |          | image_path : TEXT

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

app.listen(port, () => {
    console.log(`listening on *:${port}`);
});
