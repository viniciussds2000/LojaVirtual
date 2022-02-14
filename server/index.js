const express = require('express');
const mysql = require("mysql");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

//Cria a ligação com o banco de dados
const db = mysql.createConnection({
    user:"root",
    host: "localhost",
    password: "",
    database: "lojavirtual",
    
});
//Recebe dados do pedido feito no front e guarda os dados do pedido no banco de dados
app.post("/pedido", (req, res) => {
    const clientName = req.body.client;
    const cartTotal = req.body.totalValue;

    db.query("INSERT INTO pedidos(cliente, valor) VALUES (?,?)", [clientName,cartTotal]),
    (err, result) => {
        if (err) {
            console.log(err);
        } else{
            res.send("Valores inseridos")
        }
    }

});
//Seleciona dados dos produtos no banco de dados e envia para o front
app.get('/produtos', (req, res) => {
    console.log("Produtos atualizados")
    db.query("SELECT * FROM produtos ", (err, result) => {
        if (err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});
//Aviso de quando o server está iniciado
app.listen(3001, ()=>{
    console.log("Server start");
});

