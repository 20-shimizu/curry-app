const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const app = express();
const port = 3001;

dotenv.config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'curry'
});

app.get('/', (req,res) => {
    res.send('Hello World');
})

app.get('/api', (req, res) => {
    connection.query(
        'SELECT * FROM users',
        function(err, results, fields){
            if(err){
                console.log('接続エラー');
                throw err;
            }
            res.json({message: results[0].name});
        }
    )
});

app.listen(port, () => {
    console.log(`listening on *:${port}`);
})