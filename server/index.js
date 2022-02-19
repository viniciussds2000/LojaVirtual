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
    const purchaseItems = req.body.purchaseItems;

    const clientEmail = req.body.clientEmail;
    const clientCpf = req.body.clientCpf;

    //validar se cliente é existente
    var cpf = {cpf: clientCpf}
    db.query("SELECT cpf FROM clientes WHERE ? ",cpf ,(err, result2) => {
        if (result2 != clientCpf){
            console.log("Não existe esse cpf!")
            console.log ("resultado:",result2.RowDataPacket,"cpf:",clientCpf)
        }else{
            console.log("resultado é:",result2)
            console.log("Existe esse cpf!")
        }
        
    });
    

    // Adiciona cliente
    var cliente  = {nome: clientName, email: clientEmail, cpf: clientCpf};
    db.query('INSERT INTO clientes SET ?', cliente, function (error, results) {
      if (error) throw error;
      console.log("cliente: ", results.insertId)
      let clientId = results.insertId

        // Adiciona pedidos
        var pedido  = {cliente: clientId, valor: cartTotal, produtos: purchaseItems};
        db.query('INSERT INTO pedidos SET ?', pedido, function (error, results) {
            if (error) throw error;
            console.log("pedido: ", results.insertId)
            res.send(results)
        });
        
    });
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
//Seleciona dados dos produtos no banco de dados e envia para o front
app.get('/pedidos', (req, res) => {
    console.log("Pedidos atualizados")
    db.query("SELECT * FROM pedidos ", (err, result) => {
        if (err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});
//Aviso de quando a conexão com o banco de dados foi iniciada
app.listen(3001, ()=>{
    console.log("Server start");
});

