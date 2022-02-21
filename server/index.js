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
app.post("/finalizarpedido", (req, res) => {
    const clientName = req.body.client;
    const cartTotal = req.body.totalValue;
    const purchaseItems = req.body.purchaseItems;

    const clientEmail = req.body.clientEmail;
    const clientCpf = req.body.clientCpf;

    // validar se cliente é existente
    db.query("SELECT cpf FROM clientes WHERE cpf = ? ",clientCpf ,(err, result2) => {
        if (err){
            console.log(err);
        } else{
            let treatedResult
            let defaultReponse = {
                status: null,
                message: '',
                errors: []
            }
            //Se o usuario for existente no banco de dados, adiciona somente o pedido
            try {
                treatedResult = JSON.parse(JSON.stringify(result2[0].cpf))
                console.log("Usuário já existe! CPF é: ", treatedResult)
                db.query('SELECT idcliente from clientes WHERE cpf = ?',treatedResult, (err, resultidcliente) => {
                    if (err){
                        console.log(err);
                    } else{
                       treatedclientid= (JSON.parse(JSON.stringify(resultidcliente[0].idcliente)))
                        // Adiciona pedidos
                    var pedido  = {cliente: treatedclientid, valor: cartTotal, produtos: purchaseItems};
                    db.query('INSERT INTO pedidos SET ?', pedido, function (error, results) {
                    if (error) throw error;
                        console.log("pedido: ", results.insertId)
                        res.send(results)
                    });
                    }
                });
            //Se o usuario não existir no banco de dados. adiciona um cliente e o pedido
            } catch(e) {
                console.log("Usuarios não existe!")
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
                
                // continuar fazendo cadastro
            }
            
        }
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
//Seleciona os pedidos filtrados que são solicitados por parametro na rota
app.post('/verPedido', (req, res) => {
    const idclient = req.body.clientidpedido;
    console.log(idclient)
    db.query("SELECT * FROM pedidos WHERE cliente = ? ",idclient, (err, result) => {
        if (err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

//Seleciona dados dos produtos no banco de dados e envia para o front
app.get('/verpedidos', (req, res) => {
    const body = req.body.clientidpedido;
    console.log(body)
    console.log("Pedidos atualizados")
    db.query("SELECT * FROM pedidos", (err, result) => {
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

