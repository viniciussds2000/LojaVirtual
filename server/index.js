const express = require('express');
const mysql = require("mysql");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user:"root",
    host: "localhost",
    password: "",
    database: "lojavirtual",
    
});

app.get('/produtos', (req, res) => {
    db.query("SELECT * FROM produtos ", (err, result) => {
        if (err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.listen(3001, ()=>{
    console.log("yey, server start");
});

