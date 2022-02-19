// App.js
import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Store from "./views/Store";
import Orders from "./views/Orders";
import './App.css'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/orders/:id" element={<Orders />} />
        
      </Routes>
    </div>
  );
}

export default App;