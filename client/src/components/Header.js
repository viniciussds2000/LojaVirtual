import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Header = ({pageToRedirect,buttonName}) => {
  //Tudo que é mostrado na tela inicial
  return (
    <div>
      <h1>Lojinha</h1>
      <h2>Tudo que você precisa</h2>
      <Link className="buttonLink" to={pageToRedirect}>
          {buttonName}
      </Link>
    </div>
  );
};

export default Header;