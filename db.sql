-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-12-2023 a las 20:10:04
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

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
  `estado` int(11) DEFAULT NULL,
  `medida` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idcat`, `nombre`, `estado`, `medida`) VALUES
(1, 'Tubería', 1, 'm2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `idCli` int(11) NOT NULL,
  `nombre` varchar(70) DEFAULT NULL,
  `apellidos` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `tipoDoc` varchar(50) DEFAULT NULL,
  `cedula` varchar(10) NOT NULL,
  `fecha_nac` date DEFAULT NULL,
  `estado` int(11) DEFAULT NULL,
  `contrasena` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`idCli`, `nombre`, `apellidos`, `email`, `direccion`, `telefono`, `tipoDoc`, `cedula`, `fecha_nac`, `estado`, `contrasena`) VALUES
(1, 'Ronald', 'Ortiz Arango', 'ortizroanld623@gmail.com', 'calle 55 ee', '3158119393', 'Cedula de ciudadania', '1025646465', '2006-01-16', 0, '1025646465Ronald.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `idCom` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `total_compra` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `compras`
--

INSERT INTO `compras` (`idCom`, `fecha`, `imagen`, `total_compra`) VALUES
(1, '2023-12-07', 'trin', 2000),
(16, '2006-01-16', NULL, NULL),
(17, '2006-01-16', NULL, NULL),
(18, '2006-01-16', NULL, NULL),
(19, '2006-01-16', NULL, NULL),
(20, '2006-01-16', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras_detalle`
--

CREATE TABLE `compras_detalle` (
  `id` int(11) NOT NULL,
  `idCompra` int(11) DEFAULT NULL,
  `idCat` int(11) NOT NULL,
  `idMat` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `Precio` int(11) DEFAULT NULL,
  `subtotal` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `compras_detalle`
--

INSERT INTO `compras_detalle` (`id`, `idCompra`, `idCat`, `idMat`, `cantidad`, `Precio`, `subtotal`) VALUES
(5, 1, 1, 1, 12, 4000, 48000),
(6, 16, 1, 1, 12, 4000, 48000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `idEmp` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) NOT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `cedula` varchar(10) DEFAULT NULL,
  `tipoDoc` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`idEmp`, `nombre`, `apellido`, `direccion`, `estado`, `email`, `telefono`, `cedula`, `tipoDoc`) VALUES
(1, 'Ronald Ortiz', 'Ortiz\n', 'calle 55 ee', 0, NULL, '3158119393', '1025646465', 'CC');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado_especialidad`
--

CREATE TABLE `empleado_especialidad` (
  `id` int(11) NOT NULL,
  `idEmp` int(11) DEFAULT NULL,
  `idEsp` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `empleado_especialidad`
--

INSERT INTO `empleado_especialidad` (`id`, `idEmp`, `idEsp`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado_obra`
--

CREATE TABLE `empleado_obra` (
  `id` int(11) NOT NULL,
  `idEmp` int(11) DEFAULT NULL,
  `idObra` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidad`
--

CREATE TABLE `especialidad` (
  `id` int(11) NOT NULL,
  `especialidad` varchar(30) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `especialidad`
--

INSERT INTO `especialidad` (`id`, `especialidad`, `estado`) VALUES
(1, 'Trabajador', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materiales`
--

CREATE TABLE `materiales` (
  `idMat` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `idProveedor` int(11) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `idCategoria` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `materiales`
--

INSERT INTO `materiales` (`idMat`, `nombre`, `idProveedor`, `estado`, `cantidad`, `idCategoria`) VALUES
(1, 'Tubo pvc', 1, 0, NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materiales_obras`
--

CREATE TABLE `materiales_obras` (
  `id` int(11) NOT NULL,
  `idMaterial` int(11) DEFAULT NULL,
  `idObra` int(11) DEFAULT NULL,
  `consumo` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obras`
--

CREATE TABLE `obras` (
  `idObra` int(11) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `fechaini` varchar(50) DEFAULT NULL,
  `fechafin` varchar(50) DEFAULT NULL,
  `area` varchar(50) DEFAULT NULL,
  `idCliente` int(11) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `obras`
--

INSERT INTO `obras` (`idObra`, `descripcion`, `fechaini`, `fechafin`, `area`, `idCliente`, `estado`) VALUES
(1, 'enchape de baño', '2023-12-21', '2023-12-31', "54M", 1, '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permiso`
--

CREATE TABLE `permiso` (
  `idPer` int(11) NOT NULL,
  `permiso` varchar(30) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  `estado` int(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `nombreContacto` varchar(50) DEFAULT NULL,
  `telefonoContacto` varchar(10) DEFAULT NULL,
  `emailContacto` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`idProv`, `nombre`, `direccion`, `nit`, `tipo`, `estado`, `email`, `telefono`, `nombreContacto`, `telefonoContacto`, `emailContacto`) VALUES
(1, 'Ronald Ortiz', 'calle 55 ee', '12321312555', 'Natural', 0, 'cesardomos@hotmail.com', '3158119393', '', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `idRol` int(11) NOT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`idRol`, `nombre`, `estado`) VALUES
(1, 'Super admin', 1),
(2, 'Admin', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_permiso`
--

CREATE TABLE `rol_permiso` (
  `id` int(11) NOT NULL,
  `idRol` int(11) DEFAULT NULL,
  `idPer` int(11) DEFAULT NULL,
  `tipo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsu` int(11) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `estado` int(11) NOT NULL,
  `contrasena` varchar(20) DEFAULT NULL,
  `idRol` int(11) DEFAULT NULL,
  `idEmp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsu`, `correo`, `estado`, `contrasena`, `idRol`, `idEmp`) VALUES
(1, 'ortizronald623@gmail.com', 1, '1025646465Ronald.', 1, 1),
(2, 'cesardomosgmail.com', 1, 'Ronaldbb', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('8cdc59b2-42d8-490f-ba28-40283e4864ae', '57c96378586917b749bf537eab447b7da0de85627b2d13ed2856100698da83e3', '2023-12-07 03:54:15.289', '20231207035414_first_migrationbrou', NULL, NULL, '2023-12-07 03:54:14.402', 1);

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
  ADD KEY `idMat` (`idMat`),
  ADD KEY `idCat` (`idCat`);

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
  ADD KEY `idCategoria` (`idCategoria`),
  ADD KEY `idProveedor` (`idProveedor`);

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
  ADD KEY `idPer` (`idPer`),
  ADD KEY `idRol` (`idRol`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsu`),
  ADD KEY `idEmp` (`idEmp`),
  ADD KEY `idRol` (`idRol`);

--
-- Indices de la tabla `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idcat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `idCli` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `idCom` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `compras_detalle`
--
ALTER TABLE `compras_detalle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
  MODIFY `idEmp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `empleado_especialidad`
--
ALTER TABLE `empleado_especialidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `empleado_obra`
--
ALTER TABLE `empleado_obra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `materiales`
--
ALTER TABLE `materiales`
  MODIFY `idMat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `materiales_obras`
--
ALTER TABLE `materiales_obras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `obras`
--
ALTER TABLE `obras`
  MODIFY `idObra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `permiso`
--
ALTER TABLE `permiso`
  MODIFY `idPer` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `idProv` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `rol_permiso`
--
ALTER TABLE `rol_permiso`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- CreatedAt de la tabla `obras`
--
ALTER TABLE `obras` ADD `createdAt` DATE NOT NULL DEFAULT CURRENT_DATE;


--
-- CreatedAt de la tabla `cliente`
--
ALTER TABLE `cliente` ADD `createdAt` DATE NOT NULL DEFAULT CURRENT_DATE;

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
  ADD CONSTRAINT `empleado_especialidad_ibfk_2` FOREIGN KEY (`idEsp`) REFERENCES `especialidad` (`id`);

--
-- Filtros para la tabla `empleado_obra`
--
ALTER TABLE `empleado_obra`
  ADD CONSTRAINT `empleado_obra_ibfk_1` FOREIGN KEY (`idEmp`) REFERENCES `empleado` (`idEmp`),
  ADD CONSTRAINT `empleado_obra_ibfk_2` FOREIGN KEY (`idObra`) REFERENCES `obras` (`idObra`);

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

ALTER TABLE `compras` ADD `codigoFactura` VARCHAR(20) NOT NULL AFTER `total_compra`;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;