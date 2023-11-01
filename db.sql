-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-10-2023 a las 05:45:07
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `constru-tech`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idcat` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `estado` int(1) DEFAULT NULL,
  `medida` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idcat`, `nombre`, `estado`, `medida`) VALUES
(6000, 'Ceramica', 1, NULL),
(6001, 'Tuberia', 1, NULL),
(6002, 'Pintura', 1, NULL),
(6003, 'ceramica', 1, NULL),
(6004, 'vidriedia', 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `idCli` int(11) NOT NULL,
  `nombre` varchar(70) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `cedula` varchar(10) NOT NULL,
  `fecha_nac` date DEFAULT NULL,
  `estado` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`idCli`, `nombre`, `email`, `direccion`, `telefono`, `cedula`, `fecha_nac`, `estado`) VALUES
(22000, 'José Hernandez', 'hernanjo324@gmail.com', 'cra 5 b #2 a', '3225771077', '1924612312', '1998-05-12', 1),
(22001, 'Santiago Sanchez', 'Santisanchez225@gmail.com', 'cll 6 c #25 b', '3297928732', '1235174219', '2000-02-19', 1),
(22002, 'Kevin Fernandez', 'Kafz56@hotmail.com', 'cll2 aa #33 a', '3139821231', '1518231231', '1999-04-30', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `idCom` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `total_compra` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `compras`
--

INSERT INTO `compras` (`idCom`, `fecha`, `imagen`, `total_compra`) VALUES
(3000, '2023-05-17', '   ', 249900),
(3001, '2023-05-02', '     ', 190400),
(3002, '2023-05-01', '     ', 29750),
(3003, '2023-05-02', '       ', 476000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras_detalle`
--

CREATE TABLE `compras_detalle` (
  `id` int(11) NOT NULL,
  `idCompra` int(11) DEFAULT NULL,
  `idMat` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `subtotal` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `compras_detalle`
--

INSERT INTO `compras_detalle` (`id`, `idCompra`, `idMat`, `cantidad`, `subtotal`) VALUES
(30000, 3000, 500, 24, 249900),
(30001, 3001, 501, 202, 190400),
(30002, 3002, 502, 405, 29750),
(30003, 3003, 503, 202, 476000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `idEmp` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `tipoDoc` varchar(10) DEFAULT NULL,
  `cedula` varchar(10) DEFAULT NULL,
  `estado` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`idEmp`, `nombre`, `direccion`, `estado`, `email`, `telefono`, `cedula`) VALUES
(2000, 'Mario Ortiz', 'cr5 #7b sur 205', 1, 'ortizmario623@gmail.com', '3225478898', '9823122'),
(2001, 'Fausto Flores', 'cr9 #8aa norte 101', 1, 'Flfaust88@gmail.com', '3058447152', '9852412'),
(2002, 'Belarmino Zea', 'cr10 # 7b sur 405', 1, 'Zeabelar414@gmail.com', '3201547854', '9823123'),
(2003, 'Marcos David', 'cll 58b # 7aa 201', 1, 'DavMarc223@gmail.com', '3256985251', '9862412'),
(2004, 'Marcela henao', 'cll 44 ff # 3b 402', 1, 'Henmarce445@gmail.com', '3105475210', '3246584');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado_especialidad`
--

CREATE TABLE `empleado_especialidad` (
  `id` int(11) NOT NULL,
  `idEmp` int(11) DEFAULT NULL,
  `idEsp` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleado_especialidad`
--

INSERT INTO `empleado_especialidad` (`id`, `idEmp`, `idEsp`) VALUES
(1800, 2001, 1500),
(1801, 2001, 1501),
(1802, 2001, 1502),
(1803, 2002, 1501),
(1804, 2002, 1502),
(1805, 2001, 1503),
(1806, 2001, 1500),
(1807, 2003, 1500),
(1808, 2003, 1501),
(1809, 2003, 1502);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado_obra`
--

CREATE TABLE `empleado_obra` (
  `id` int(11) NOT NULL,
  `idEmp` int(11) DEFAULT NULL,
  `idObra` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleado_obra`
--

INSERT INTO `empleado_obra` (`id`, `idEmp`, `idObra`) VALUES
(900, 2001, 4000),
(901, 2002, 4001),
(902, 2003, 4002);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidad`
--

CREATE TABLE `especialidad` (
  `id` int(11) NOT NULL,
  `especialidad` varchar(30) DEFAULT NULL,
  `estado` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `especialidad`
--

INSERT INTO `especialidad` (`id`, `especialidad`, `estado`) VALUES
(1500, 'Pintor', 1),
(1501, 'Plomero', 1),
(1502, 'Drywall', 1),
(1503, 'Electricista', 1),
(1504, 'Instalador de redes', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materiales`
--

CREATE TABLE `materiales` (
  `idMat` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `idProveedor` int(11) DEFAULT NULL,
  `estado` int(1) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `idCategoria` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materiales`
--

INSERT INTO `materiales` (`idMat`, `nombre`, `idProveedor`, `estado`, `precio`, `cantidad`, `idCategoria`) VALUES
(500, 'Baldosas', 700, 1, 7000, 30, 6000),
(501, 'Arena', 700, 1, 16000, 10, 6000),
(502, 'Tuvo pvc', 701, 1, 150000, 5, 6001),
(503, 'Galón de pintura', 703, 1, 80000, 10, 6002);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materiales_obras`
--

CREATE TABLE `materiales_obras` (
  `id` int(11) NOT NULL,
  `idMaterial` int(11) DEFAULT NULL,
  `idObra` int(11) DEFAULT NULL,
  `consumo` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materiales_obras`
--

INSERT INTO `materiales_obras` (`id`, `idMaterial`, `idObra`, `consumo`) VALUES
(7000, 500, 4000, 'metros'),
(7001, 501, 4001, 'metros'),
(7002, 502, 4002, 'metros');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obras`
--

CREATE TABLE `obras` (
  `idObra` int(11) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `fechaini` date DEFAULT NULL,
  `fechafin` date DEFAULT NULL,
  `area` int(11) DEFAULT NULL,
  `idCliente` int(11) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `obras`
--

INSERT INTO `obras` (`idObra`, `descripcion`, `fechaini`, `fechafin`, `area`, `idCliente`, `estado`) VALUES
(4000, 'Enchape de baño ', '2023-05-01', '2023-06-07', 25, 22000, NULL),
(4001, 'Revoque de habitación', '2023-02-12', '2023-04-10', 8, 22002, NULL),
(4002, 'Instalación de red electrica', '2023-04-10', '2023-10-22', 3, 22001, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permiso`
--

CREATE TABLE `permiso` (
  `idPer` int(11) NOT NULL,
  `permiso` varchar(30) DEFAULT NULL,
  `estado` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `permiso`
--

INSERT INTO `permiso` (`idPer`, `permiso`, `estado`) VALUES
(100, 'Usuarios', 1),
(101, 'roles', 1),
(102, 'empleados', 1),
(103, 'proveedores', 1),
(104, 'materiales', 1),
(105, 'compras', 1),
(106, 'obras y tiempos', 1),
(107, 'clientes', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `idProv` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `nit` varchar(14) DEFAULT NULL,
  `tipo` varchar(10) DEFAULT NULL,
  `estado` int(1) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `nombreContacto` varchar(50) DEFAULT NULL,
  `telefonoContacto` varchar(10) DEFAULT NULL,
  `emailContacto` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`idProv`, `nombre`, `direccion`, `nit`, `tipo`, `estado`, `email`, `telefono`, `nombreContacto`, `telefonoContacto`, `emailContacto`) VALUES
(700, 'Corona', 'Calle 53 #50-76', '860.500.480-8', 'Acabados', 1, 'contactenoscorona@corona.com.co', '018000512030', 'Richy Fernandez', '3128030461', 'richyelmandamas200@gmail.com'),
(701, 'Homecenter', 'Av 68 No. 80-77', '800.242.106-2', 'Arenas y g', 1, 'servicioalcliente@homecenter.co', '018000127373', 'Manuel Hernandez', '3228341212', 'herzm@gmail.com'),
(702, 'Corona', 'Carrera 50 #53-20', '860.500.480-8', 'Sanitarios', 1, 'contactenoscorona@corona.com.co', '018000512030', 'Jhon Gallego', '3003723113', 'onjh@gmail.com'),
(703, 'Pintuco', ' Calle 19a #43B-41', '890.900.148-2', 'Pintura', 1, 'tiendapintucoocana@hotmail.com', '3115128355', 'Carlos Ramires', '3013331212', 'carlitos@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `idRol` int(11) NOT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `estado` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`idRol`, `nombre`, `estado`) VALUES
(201, 'Administrador', 1),
(202, 'Empleado', 1),
(203, 'Secretaria', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_permiso`
--

CREATE TABLE `rol_permiso` (
  `id` int(11) NOT NULL,
  `idRol` int(11) DEFAULT NULL,
  `idPer` int(11) DEFAULT NULL,
  `tipo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol_permiso`
--

INSERT INTO `rol_permiso` (`id`, `idRol`, `idPer`, `tipo`) VALUES
(300, 201, 100, '{\"consultar\",\"agregar\",\"editar\",\"eliminar\"}'),
(319, 201, 101, '{\"consultar\",\"agregar\",\"editar\",\"eliminar\"}'),
(320, 201, 102, '{\"consultar\",\"agregar\",\"editar\",\"eliminar\"}'),
(321, 201, 103, '{\"consultar\",\"agregar\",\"editar\",\"eliminar\"}'),
(322, 201, 104, '{\"consultar\",\"agregar\",\"editar\",\"eliminar\"}'),
(323, 201, 105, '{\"consultar\",\"agregar\",\"editar\",\"eliminar\"}'),
(324, 201, 106, '{\"consultar\",\"agregar\",\"editar\",\"eliminar\"}'),
(325, 201, 107, '{\"consultar\",\"agregar\",\"editar\",\"eliminar\"}'),
(326, 202, 103, '{\"consultar\",\"agregar\"}'),
(327, 202, 104, '{\"consultar\",\"agregar\",\"eliminar\"}'),
(328, 202, 105, '{\"consultar\",\"agregar\",\"eliminar\"}'),
(329, 202, 106, '{\"consultar\",\"agregar\",\"editar\"}'),
(330, 202, 107, '{\"agregar\",\"editar\"}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsu` int(11) NOT NULL,
  `estado` int(2) NOT NULL,
  `contrasena` varchar(20) DEFAULT NULL,
  `idRol` int(11) DEFAULT NULL,
  `idEmp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsu`, `estado`, `contrasena`, `idRol`, `idEmp`) VALUES
(500, 1, 'mario123', 201, 2000),
(501, 0, 'flores56', 202, 2001),
(502, 1, 'belarzea32', 202, 2002),
(503, 0, 'DavidMar45', 202, 2003),
(504, 1, 'marce434', 203, 2004);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idcat`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`idCli`);

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`idCom`);

--
-- Indices de la tabla `compras_detalle`
--
ALTER TABLE `compras_detalle`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCompra` (`idCompra`),
  ADD KEY `idMat` (`idMat`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`idEmp`);

--
-- Indices de la tabla `empleado_especialidad`
--
ALTER TABLE `empleado_especialidad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idEmp` (`idEmp`),
  ADD KEY `idEsp` (`idEsp`);

--
-- Indices de la tabla `empleado_obra`
--
ALTER TABLE `empleado_obra`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idEmp` (`idEmp`),
  ADD KEY `idObra` (`idObra`);

--
-- Indices de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `materiales`
--
ALTER TABLE `materiales`
  ADD PRIMARY KEY (`idMat`),
  ADD KEY `idProveedor` (`idProveedor`),
  ADD KEY `idCategoria` (`idCategoria`);

--
-- Indices de la tabla `materiales_obras`
--
ALTER TABLE `materiales_obras`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idMaterial` (`idMaterial`),
  ADD KEY `idObra` (`idObra`);

--
-- Indices de la tabla `obras`
--
ALTER TABLE `obras`
  ADD PRIMARY KEY (`idObra`),
  ADD KEY `idCliente` (`idCliente`);

--
-- Indices de la tabla `permiso`
--
ALTER TABLE `permiso`
  ADD PRIMARY KEY (`idPer`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`idProv`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`idRol`);

--
-- Indices de la tabla `rol_permiso`
--
ALTER TABLE `rol_permiso`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idRol` (`idRol`),
  ADD KEY `idPer` (`idPer`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsu`),
  ADD KEY `idRol` (`idRol`),
  ADD KEY `idEmp` (`idEmp`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idcat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6005;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `idCli` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22003;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `idCom` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3004;

--
-- AUTO_INCREMENT de la tabla `compras_detalle`
--
ALTER TABLE `compras_detalle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30004;

--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
  MODIFY `idEmp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2005;

--
-- AUTO_INCREMENT de la tabla `empleado_especialidad`
--
ALTER TABLE `empleado_especialidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1810;

--
-- AUTO_INCREMENT de la tabla `empleado_obra`
--
ALTER TABLE `empleado_obra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=903;

--
-- AUTO_INCREMENT de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1505;

--
-- AUTO_INCREMENT de la tabla `materiales`
--
ALTER TABLE `materiales`
  MODIFY `idMat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=504;

--
-- AUTO_INCREMENT de la tabla `materiales_obras`
--
ALTER TABLE `materiales_obras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7003;

--
-- AUTO_INCREMENT de la tabla `obras`
--
ALTER TABLE `obras`
  MODIFY `idObra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4003;

--
-- AUTO_INCREMENT de la tabla `permiso`
--
ALTER TABLE `permiso`
  MODIFY `idPer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `idProv` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=704;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=204;

--
-- AUTO_INCREMENT de la tabla `rol_permiso`
--
ALTER TABLE `rol_permiso`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=337;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=505;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compras_detalle`
--
ALTER TABLE `compras_detalle`
  ADD CONSTRAINT `compras_detalle_ibfk_1` FOREIGN KEY (`idCompra`) REFERENCES `compras` (`idCom`),
  ADD CONSTRAINT `compras_detalle_ibfk_2` FOREIGN KEY (`idMat`) REFERENCES `materiales` (`idMat`);

--
-- Filtros para la tabla `empleado_especialidad`
--
ALTER TABLE `empleado_especialidad`
  ADD CONSTRAINT `empleado_especialidad_ibfk_1` FOREIGN KEY (`idEmp`) REFERENCES `empleado` (`idEmp`),
  ADD CONSTRAINT `empleado_especialidad_ibfk_2` FOREIGN KEY (`idEsp`) REFERENCES `especialidad` (`id`),
  ADD CONSTRAINT `empleado_especialidad_ibfk_3` FOREIGN KEY (`idEmp`) REFERENCES `empleado` (`idEmp`),
  ADD CONSTRAINT `empleado_especialidad_ibfk_4` FOREIGN KEY (`idEsp`) REFERENCES `especialidad` (`id`);

--
-- Filtros para la tabla `empleado_obra`
--
ALTER TABLE `empleado_obra`
  ADD CONSTRAINT `empleado_obra_ibfk_1` FOREIGN KEY (`idEmp`) REFERENCES `empleado` (`idEmp`),
  ADD CONSTRAINT `empleado_obra_ibfk_2` FOREIGN KEY (`idObra`) REFERENCES `obras` (`idObra`),
  ADD CONSTRAINT `empleado_obra_ibfk_3` FOREIGN KEY (`idEmp`) REFERENCES `empleado` (`idEmp`),
  ADD CONSTRAINT `empleado_obra_ibfk_4` FOREIGN KEY (`idObra`) REFERENCES `obras` (`idObra`);

--
-- Filtros para la tabla `materiales`
--
ALTER TABLE `materiales`
  ADD CONSTRAINT `materiales_ibfk_1` FOREIGN KEY (`idProveedor`) REFERENCES `proveedor` (`idProv`),
  ADD CONSTRAINT `materiales_ibfk_2` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idcat`);

--
-- Filtros para la tabla `materiales_obras`
--
ALTER TABLE `materiales_obras`
  ADD CONSTRAINT `materiales_obras_ibfk_3` FOREIGN KEY (`idMaterial`) REFERENCES `materiales` (`idMat`),
  ADD CONSTRAINT `materiales_obras_ibfk_4` FOREIGN KEY (`idObra`) REFERENCES `obras` (`idObra`);

--
-- Filtros para la tabla `obras`
--
ALTER TABLE `obras`
  ADD CONSTRAINT `obras_ibfk_3` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCli`);

--
-- Filtros para la tabla `rol_permiso`
--
ALTER TABLE `rol_permiso`
  ADD CONSTRAINT `rol_permiso_ibfk_1` FOREIGN KEY (`idRol`) REFERENCES `rol` (`idRol`),
  ADD CONSTRAINT `rol_permiso_ibfk_2` FOREIGN KEY (`idPer`) REFERENCES `permiso` (`idPer`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`idRol`) REFERENCES `rol` (`idRol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;