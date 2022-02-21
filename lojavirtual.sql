-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 21-Fev-2022 às 20:46
-- Versão do servidor: 10.4.22-MariaDB
-- versão do PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `lojavirtual`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `clientes`
--

CREATE TABLE `clientes` (
  `idcliente` int(11) NOT NULL,
  `nome` varchar(110) NOT NULL,
  `email` varchar(150) NOT NULL,
  `cpf` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `clientes`
--

INSERT INTO `clientes` (`idcliente`, `nome`, `email`, `cpf`) VALUES
(80, 'maria luiza', 'maria@hotmail.com', '05823919191'),
(81, 'Vinicius', 'Vinicius@hotmail.com', '05823917171'),
(82, 'Luiz Guilherme', 'Luiz@hotmail.com', '015081996'),
(83, 'Ane Carla', 'AneC@hotmail.com', '60212512097'),
(84, 'Carlos Sergio', 'CarlosS@hotmail.com', '04215981419');

-- --------------------------------------------------------

--
-- Estrutura da tabela `pedidos`
--

CREATE TABLE `pedidos` (
  `idpedido` int(11) NOT NULL,
  `cliente` int(5) NOT NULL,
  `valor` decimal(15,0) NOT NULL,
  `produtos` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `pedidos`
--

INSERT INTO `pedidos` (`idpedido`, `cliente`, `valor`, `produtos`) VALUES
(64, 80, '2800', '[{\"idproduto\":2,\"nome\":\"Samsung m32\",\"descricao\":\"Samsung m32 128gb 8 de ram\",\"estoque\":70,\"valor\":1300},{\"idproduto\":3,\"nome\":\"Samsung m52\",\"descricao\":\"Samsung M52 64gb 4ram\",\"estoque\":73,\"valor\":1500}]'),
(65, 81, '8800', '[{\"idproduto\":2,\"nome\":\"Samsung m32\",\"descricao\":\"Samsung m32 128gb 8 de ram\",\"estoque\":70,\"valor\":1300},{\"idproduto\":1,\"nome\":\"Iphone 13\",\"descricao\":\"Iphone 13 128gb\",\"estoque\":50,\"valor\":7500}]'),
(66, 82, '10300', '[{\"idproduto\":1,\"nome\":\"Iphone 13\",\"descricao\":\"Iphone 13 128gb\",\"estoque\":50,\"valor\":7500},{\"idproduto\":2,\"nome\":\"Samsung m32\",\"descricao\":\"Samsung m32 128gb 8 de ram\",\"estoque\":70,\"valor\":1300},{\"idproduto\":3,\"nome\":\"Samsung m52\",\"descricao\":\"Samsung M52 64gb 4ram\",\"estoque\":73,\"valor\":1500}]'),
(67, 83, '1500', '[{\"idproduto\":3,\"nome\":\"Samsung m52\",\"descricao\":\"Samsung M52 64gb 4ram\",\"estoque\":73,\"valor\":1500}]'),
(68, 84, '1300', '[{\"idproduto\":2,\"nome\":\"Samsung m32\",\"descricao\":\"Samsung m32 128gb 8 de ram\",\"estoque\":70,\"valor\":1300}]'),
(69, 81, '7500', '[{\"idproduto\":1,\"nome\":\"Iphone 13\",\"descricao\":\"Iphone 13 128gb\",\"estoque\":50,\"valor\":7500}]'),
(70, 81, '7500', '[{\"idproduto\":1,\"nome\":\"Iphone 13\",\"descricao\":\"Iphone 13 128gb\",\"estoque\":50,\"valor\":7500}]'),
(71, 82, '10300', '[{\"idproduto\":1,\"nome\":\"Iphone 13\",\"descricao\":\"Iphone 13 128gb\",\"estoque\":50,\"valor\":7500},{\"idproduto\":2,\"nome\":\"Samsung m32\",\"descricao\":\"Samsung m32 128gb 8 de ram\",\"estoque\":70,\"valor\":1300},{\"idproduto\":3,\"nome\":\"Samsung m52\",\"descricao\":\"Samsung M52 64gb 4ram\",\"estoque\":73,\"valor\":1500}]');

-- --------------------------------------------------------

--
-- Estrutura da tabela `produtos`
--

CREATE TABLE `produtos` (
  `idproduto` int(5) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `estoque` int(5) NOT NULL,
  `valor` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `produtos`
--

INSERT INTO `produtos` (`idproduto`, `nome`, `descricao`, `estoque`, `valor`) VALUES
(1, 'Iphone 13', 'Iphone 13 128gb', 50, '7500'),
(2, 'Samsung m32', 'Samsung m32 128gb 8 de ram', 70, '1300'),
(3, 'Samsung m52', 'Samsung M52 64gb 4ram', 73, '1500');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`idcliente`);

--
-- Índices para tabela `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`idpedido`),
  ADD KEY `clientid` (`cliente`);

--
-- Índices para tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`idproduto`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `idcliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT de tabela `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `idpedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT de tabela `produtos`
--
ALTER TABLE `produtos`
  MODIFY `idproduto` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
