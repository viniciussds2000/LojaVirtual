import { useState } from "react";
import './App.css';
import  Axios  from 'axios';

function App() {
  const [listaprodutos, setlistaprodutos] = useState ([]);
  const getprodutos = () => {
    Axios.get("http://localhost:3001/produtos").then((response)=>{
      setlistaprodutos(response.data);
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
    {listaprodutos.map((val, key) => {
      return <div>
        <table border="2" align="center">
          
          <tr>
            <th>{val.nome}</th>
            <th>{val.estoque}</th>
            <th>{val.descricao}</th>
            <th>{val.preco}</th>
            <th><button>Adicionar ao carrinho</button></th>
            
          </tr>
        </table>
      </div>
    })};
    </div>
  );
}

export default App;
