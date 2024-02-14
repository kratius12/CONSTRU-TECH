-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-01-2024 a las 15:59:07
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

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
  `cedula` varchar(10) DEFAULT NULL,
  `fecha_nac` varchar(50) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL,
  `constrasena` varchar(200) DEFAULT NULL,
  `salt` varchar(200) NOT NULL,
  `createdAt` date NOT NULL DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `codigos`
--

CREATE TABLE `codigos` (
  `Id` int(11) NOT NULL,
  `codigo` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL,
  `fecha` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `idCom` int(11) NOT NULL,
  `fecha` varchar(50) DEFAULT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `total_compra` int(11) DEFAULT NULL,
  `codigoFactura` varchar(20) DEFAULT NULL,
  `idProv` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras_detalle`
--

CREATE TABLE `compras_detalle` (
  `id` int(11) NOT NULL,
  `idCompra` int(11) NOT NULL,
  `idMat` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `subtotal` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_obra`
--

CREATE TABLE `detalle_obra` (
  `id` int(11) NOT NULL,
  `actividad` varchar(60) DEFAULT NULL,
  `fechaini` varchar(50) DEFAULT NULL,
  `fechafin` varchar(50) DEFAULT NULL,
  `idEmp` int(11) NOT NULL,
  `idMat` int(11) NOT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `idObra` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `idEmp` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `cedula` varchar(10) DEFAULT NULL,
  `tipoDoc` varchar(10) DEFAULT NULL,
  `apellidos` varchar(50) DEFAULT NULL,
  `contrasena` varchar(250) DEFAULT NULL,
  `createdAt` date NOT NULL DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado_especialidad`
--

CREATE TABLE `empleado_especialidad` (
  `id` int(11) NOT NULL,
  `idEmp` int(11) NOT NULL,
  `idEsp` int(11) NOT NULL
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materiales`
--

CREATE TABLE `materiales` (
  `idMat` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL,
  `idCategoria` int(11) DEFAULT NULL
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
  `estado` varchar(50) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `createdAt` date NOT NULL DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permiso`
--


CREATE TABLE `permiso` (
  `idPer` int(11) NOT NULL,
  `permiso` varchar(30) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `permiso`(`permiso`,`estado`) VALUES
('Roles',1),
('Empleados',1),
('Especialidades',1),
('Proveedores',1),
('Materiales',1),
('Obras',1),
('Clientes',1),
('Categorias',1),
('Compras',1),
('Permisos',1);

INSERT INTO `rolpermisoempleado` (`idRol`, `idPer`, `idEmp`) VALUES
( 1, 1, 1),
( 1, 2, 1),
( 1, 3, 1),
( 1, 4, 1),
( 1, 5, 1),
( 1, 6, 1),
( 1, 7, 1),
( 1, 8, 1),
( 1, 9, 1),
( 1, 10, 1);

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `idRol` int(11) NOT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rolpermisoempleado`
--

CREATE TABLE `rolpermisoempleado` (
  `id` int(11) NOT NULL,
  `idRol` int(11) NOT NULL,
  `idPer` int(11) NOT NULL,
  `idEmp` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
('5e5bca49-7710-480f-bc5c-af61b1c91614', 'a2e39ee5317b244a980169d20172a3a7ffc2403e8d0f8cc3a10bb7169eeb89c1', '2024-01-22 14:58:11.593', '20240122145707_migracion', NULL, NULL, '2024-01-22 14:58:11.533', 1),
('dc7b9de6-0b50-4e74-b40a-f3e7cc4a9f2f', '2482081e9d756286788f23ea00fd1a93ab5b995b76e2e361f9f4d88a56a176d3', '2024-01-22 14:58:11.532', '20240121161531_migracion', NULL, NULL, '2024-01-22 14:58:10.775', 1),
('f73a4bd7-e6ec-4854-ac31-936437be8bf8', 'cb01df05c83e63a71d6efb340a527daf62c41e34a577bccb9dff68fbfb79ac55', '2024-01-22 14:58:10.773', '20231213144537_add_created_at_column_obras_clientes', NULL, NULL, '2024-01-22 14:58:09.962', 1);

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
-- Indices de la tabla `codigos`
--
ALTER TABLE `codigos`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `codigos_codigo_key` (`codigo`);

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`idCom`),
  ADD KEY `idProv` (`idProv`);

--
-- Indices de la tabla `compras_detalle`
--
ALTER TABLE `compras_detalle`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCompra` (`idCompra`),
  ADD KEY `idMat` (`idMat`);

--
-- Indices de la tabla `detalle_obra`
--
ALTER TABLE `detalle_obra`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idEmp` (`idEmp`),
  ADD KEY `idMat` (`idMat`),
  ADD KEY `idObra` (`idObra`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`idEmp`),
  ADD UNIQUE KEY `empleado_email_key` (`email`);

--
-- Indices de la tabla `empleado_especialidad`
--
ALTER TABLE `empleado_especialidad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idEmp` (`idEmp`),
  ADD KEY `idEsp` (`idEsp`);

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
  ADD KEY `idCategoria` (`idCategoria`);

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
-- Indices de la tabla `rolpermisoempleado`
--
ALTER TABLE `rolpermisoempleado`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idEmp` (`idEmp`),
  ADD KEY `idPer` (`idPer`),
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
  MODIFY `idcat` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `idCli` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `codigos`
--
ALTER TABLE `codigos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `idCom` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `compras_detalle`
--
ALTER TABLE `compras_detalle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_obra`
--
ALTER TABLE `detalle_obra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
  MODIFY `idEmp` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empleado_especialidad`
--
ALTER TABLE `empleado_especialidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `materiales`
--
ALTER TABLE `materiales`
  MODIFY `idMat` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `obras`
--
ALTER TABLE `obras`
  MODIFY `idObra` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `permiso`
--
ALTER TABLE `permiso`
  MODIFY `idPer` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `idProv` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rolpermisoempleado`
--
ALTER TABLE `rolpermisoempleado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compras`
--
ALTER TABLE `compras`
  ADD CONSTRAINT `compras_ibfk_1` FOREIGN KEY (`idProv`) REFERENCES `proveedor` (`idProv`);

--
-- Filtros para la tabla `compras_detalle`
--
ALTER TABLE `compras_detalle`
  ADD CONSTRAINT `compras_detalle_ibfk_1` FOREIGN KEY (`idCompra`) REFERENCES `compras` (`idCom`),
  ADD CONSTRAINT `compras_detalle_ibfk_2` FOREIGN KEY (`idMat`) REFERENCES `materiales` (`idMat`);

--
-- Filtros para la tabla `detalle_obra`
--
ALTER TABLE `detalle_obra`
  ADD CONSTRAINT `detalle_obra_ibfk_1` FOREIGN KEY (`idObra`) REFERENCES `obras` (`idObra`),
  ADD CONSTRAINT `detalle_obra_ibfk_2` FOREIGN KEY (`idEmp`) REFERENCES `empleado` (`idEmp`),
  ADD CONSTRAINT `detalle_obra_ibfk_3` FOREIGN KEY (`idMat`) REFERENCES `materiales` (`idMat`);

--
-- Filtros para la tabla `empleado_especialidad`
--
ALTER TABLE `empleado_especialidad`
  ADD CONSTRAINT `empleado_especialidad_ibfk_1` FOREIGN KEY (`idEmp`) REFERENCES `empleado` (`idEmp`),
  ADD CONSTRAINT `empleado_especialidad_ibfk_2` FOREIGN KEY (`idEsp`) REFERENCES `especialidad` (`id`);

--
-- Filtros para la tabla `materiales`
--
ALTER TABLE `materiales`
  ADD CONSTRAINT `materiales_ibfk_2` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idcat`);

--
-- Filtros para la tabla `obras`
--
ALTER TABLE `obras`
  ADD CONSTRAINT `obras_ibfk_3` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCli`);

--
-- Filtros para la tabla `rolpermisoempleado`
--
ALTER TABLE `rolpermisoempleado`
  ADD CONSTRAINT `rolpermisoempleado_ibfk_1` FOREIGN KEY (`idEmp`) REFERENCES `empleado` (`idEmp`),
  ADD CONSTRAINT `rolpermisoempleado_ibfk_2` FOREIGN KEY (`idPer`) REFERENCES `permiso` (`idPer`),
  ADD CONSTRAINT `rolpermisoempleado_ibfk_3` FOREIGN KEY (`idRol`) REFERENCES `rol` (`idRol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
