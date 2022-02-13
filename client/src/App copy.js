import React, { useState, useEffect } from "react";
import './App.css';
import  Axios  from 'axios';

function App() {
  const [listaProdutos, setlistaProdutos] = useState ([]);
  const [setCarrinho,carrinho] = useState ([]);

  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  
  useEffect(() => {
    total();
  }, [cart]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    setCartTotal(totalVal);
  };

  const addToCart = (el) => {
    setCart([...cart, el]);
  };

  const addProduto = (event) =>{
    console.log(event.target)
  }

  const getprodutos = () => {
    Axios.get("http://localhost:3001/produtos").then((response)=>{
      setlistaProdutos(response.data);
    });
  };

  return (
    <div className="App">
      <h1>Lojinha</h1>
      <h2>Tudo que você precisa</h2>
    <div className="HeaderRight">
      Itens no carrinho: 0 <br/>
      Valor Total: R$0,00
    </div>
    <div className="Headerbuttons">
      <button>Ir para o carrinho</button>
      <button>Ver meu pedido</button>
    </div>
    <button onClick={getprodutos}>lista de produtos</button>
    {listaProdutos.map((val) => {
      <div key={val.idproduto}>
        <table border="2" align="center">
          <tr>
            <th>{val.nome}</th>
            <th>{val.estoque}</th>
            <th>{val.descricao}</th>
            <th>{val.preco}</th>
            <th><input type="submit" value="Adicionar ao carrinho" onClick={() => addToCart(val)}/></th>
          </tr>
        </table>
      </div>
    })};
    </div>
  );
}

export default App;
