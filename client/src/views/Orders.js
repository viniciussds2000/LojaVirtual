import React, { useState, useEffect, useRef, useMemo,  } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";


const Orders = () => {
    const [orders, setOrders] = useState([])
    const { id } = useParams()
    //Traz os dados de produtos do banco de dados para o front
  useEffect(() => {
    fetch('http://localhost:3001/pedidos/'+ {id})
    .then(response => response.json())
    .then(data => setOrders(data))
}, []);

const convertProductsToObject = (unparsed) => {
    let parsed = JSON.parse(unparsed);
    let productDescription = new Array()

    parsed.map((eachElement) => (
        productDescription.push(eachElement.descricao)
    ))
    return productDescription
}

//Lista os produtos com os dados que chegam do banco de dados
const listItems = orders.map((el) => (
    <div>
        <h3>Id do Pedido: #{el.idpedido}</h3>
        <h4>Cliente: {el.cliente}</h4>
        <p>Valor: {el.valor}</p>
        <div>
            {
                el.produtos ?
                    convertProductsToObject(el.produtos).map((description =>
                        <p>{description}</p>
                    ))
                : <p>Sem produtos</p>
            }
        </div>
    </div>
  ));


  //Tudo que é mostrado na tela inicial
  return (
    <div className="orders">
      <Header
      pageToRedirect={"/"}
      buttonName={"Voltar para a loja"}
      />
      <h3>Ver pedidos do: {id}</h3>
      <div className="Listproducts">{listItems}</div>
    </div>
  );
};

export default Orders;