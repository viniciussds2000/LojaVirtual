import  Axios from "axios";
import React, { useState, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

import './App.css';


const App = () => {
 
  const [cart, setCart] = useState([])
  const [cartTotal, setCartTotal] = useState(0)
  const [products, setProducts] = useState([])
  const isMounted = useRef(false)

  // Traz os valores do cache para o carrinho
  useEffect(()=>{
    const cartItems = localStorage.getItem('cartItems')
    if(cartItems){
      console.log("haviam itens no localstorage")
      console.log(cartItems)
      setCart(JSON.parse(cartItems))
    }
    },[])

  useEffect(() => {
      fetch('http://localhost:3001/produtos')
      .then(response => response.json())
      .then(data => setProducts(data))
  }, []);

  useEffect(() => {
    total();
  }, [cart]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].preco;
    }
    setCartTotal(totalVal);
  };


const [clientName, setClientName] = useState("");


 const finishCart = () => {
    Axios.post('http://localhost:3001/pedido',{
      client: clientName,
      totalValue: cartTotal,

    }).then(()=>{
      console.log("sucess");
    });
  };

  const addToCart = (el) => {
      setCart([...cart, el]);

      let localCart = [];
      localCart.push(el)
      localCart = localCart.concat(JSON.parse(localStorage.getItem('cartItems')||'[]'))

      console.log(localCart)
      localStorage.setItem('cartItems',JSON.stringify(localCart))
  };

  const removeFromCart = (el) => {
    let cartCopy = [...cart];
    cartCopy = cartCopy.filter((cartItem) => cartItem.idproduto !== el.idproduto);
    setCart(cartCopy);
    localStorage.setItem('cartItems',JSON.stringify(cartCopy))
  };

  const listItems = products.map((el) => (
    <div key={el.idproduto}>
      {`${el.nome}: $${el.preco}`}
      <input type="submit" className="Buttonproducts" value="Adicionar ao carrinho" onClick={() => addToCart(el)} />
    </div>
  ));

  const cartItems = cart.map((el) => (
    <div key={el.idproduto}>
      {`${el.nome}: $${el.preco}`}
      <input type="submit" className="Buttonproducts" value="Remover" onClick={() => removeFromCart(el)} />
    </div>
  ));

  return (
    
    <div className="App">
      <h1>Lojinha</h1>
      <h2>Tudo que você precisa</h2>
      <div className="Listproducts">{listItems}</div>
      <div><h3>Carrinho</h3></div>
      <div className="Listproducts">{cartItems}</div><br/>
      <div>Valor Total: ${cartTotal}</div><br/>
      <form>
        <label>Email:</label> <input type="text"/><br/>
        <label>Nome:</label> <input onChange={(event) =>{
          setClientName(event.target.value);
        }
        } type="text"/><br/>
        <label>Cpf:</label> <input name="clientCPF" type="text"/><br/><br/>
        <input onClick={finishCart} type="submit" value="Finalizar Pedido"/>
      </form>
      
    </div>
  );
};

export default App;