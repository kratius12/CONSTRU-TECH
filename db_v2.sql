-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-02-2024 a las 20:39:43
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.1.12

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
-- Estructura de tabla para la tabla `actividades_empleados`
--

CREATE TABLE `actividades_empleados` (
  `id` int(11) NOT NULL,
  `actividad` varchar(22) NOT NULL,
  `idEmp` int(11) NOT NULL,
  `idObra` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `actividades_empleados`
--

INSERT INTO `actividades_empleados` (`id`, `actividad`, `idEmp`, `idObra`) VALUES
(40, 'Actividad 4', 1, 1),
(44, 'Actividad 3', 1, 1),
(46, 'Pruena', 3, 1),
(47, 'Actividad 1', 1, 1),
(50, 'Actividad 9', 3, 1),
(51, 'Actividad 5', 1, 1),
(55, 'Actividad 2', 1, 2),
(57, 'Actividad 1', 1, 2),
(58, 'Actividad 1', 2, 4),
(60, 'Actividad 2', 2, 4),
(61, 'Actividad 2', 1, 1),
(62, 'Actividad 6', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividades_materiales`
--

CREATE TABLE `actividades_materiales` (
  `id` int(11) NOT NULL,
  `actividad` varchar(22) NOT NULL,
  `idMat` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `idObra` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `actividades_materiales`
--

INSERT INTO `actividades_materiales` (`id`, `actividad`, `idMat`, `cantidad`, `idObra`) VALUES
(40, 'Actividad 4', 1, 2, 1),
(41, 'Actividad 4', 2, 1, 1),
(48, 'Actividad 3', 1, 4, 1),
(49, 'Actividad 3', 2, 2, 1),
(52, 'Pruena', 1, 2, 1),
(53, 'Pruena', 2, 3, 1),
(54, 'Actividad 1', 1, 2, 1),
(55, 'Actividad 1', 2, 1, 1),
(60, 'Actividad 9', 1, 5, 1),
(61, 'Actividad 9', 2, 3, 1),
(62, 'Actividad 5', 1, 2, 1),
(67, 'Actividad 2', 1, 3, 2),
(68, 'Actividad 2', 2, 2, 2),
(71, 'Actividad 1', 1, 2, 2),
(72, 'Actividad 1', 2, 3, 2),
(73, 'Actividad 1', 1, 2, 4),
(75, 'Actividad 2', 1, 2, 4),
(76, 'Actividad 2', 1, 2, 1),
(77, 'Actividad 2', 2, 3, 1),
(78, 'Actividad 6', 1, 2, 1),
(79, 'Actividad 6', 2, 3, 1);

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
(1, 'Pintura', 1, 'und'),
(2, 'Pintura', 1, 'm');

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

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`idCli`, `nombre`, `apellidos`, `email`, `direccion`, `telefono`, `tipoDoc`, `cedula`, `fecha_nac`, `estado`, `constrasena`, `salt`, `createdAt`) VALUES
(1, 'Ronald', 'Ortiz', 'ortizronald623@gmail.com', 'Calle 55 ee #6a 57', '3158119393', 'Cedula de ciudadania', '1025646465', '2006-01-16', 1, '$2a$10$v4BFk6K1Xla.7DthEiJSaeoKFEqF2fDjGsbOe/klVEEw6z8xScASe', '$2b$10$h6lNDpIbPy7YSGKg6pEFo.', '2024-02-21'),
(2, 'Ronald', 'Ortiz', 'ortizronald6223@gmail.com', 'Calle 55 ee', '3245771077', 'CC', '1025646461', '2000-02-21', 0, '$2b$10$Z1/DXxXYtWEXap4kAHxIkeYdGnnsVykeeB61tKMu1R/UBvdVU9ujG', '$2b$10$Z1/DXxXYtWEXap4kAHxIke', '2024-02-21');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `codigos`
--

CREATE TABLE `codigos` (
  `Id` int(11) NOT NULL,
  `codigo` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL,
  `fecha` varchar(100) DEFAULT NULL
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

--
-- Volcado de datos para la tabla `compras`
--

INSERT INTO `compras` (`idCom`, `fecha`, `imagen`, `total_compra`, `codigoFactura`, `idProv`) VALUES
(1, '2024-02-21', 'TX5pBainE.pdf', 57000, 'A1', 1),
(2, '2024-02-21', 'VTW8vIhyS.pdf', 77000, 'A987', 1),
(3, '2024-02-21', '3Y1dpPnjS.pdf', 480000, 'C4321', 1);

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

--
-- Volcado de datos para la tabla `compras_detalle`
--

INSERT INTO `compras_detalle` (`id`, `idCompra`, `idMat`, `cantidad`, `precio`, `subtotal`) VALUES
(1, 1, 1, 12, 4750, 57000),
(2, 2, 1, 22, 3500, 77000),
(3, 3, 2, 32, 15000, 480000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_obra`
--

CREATE TABLE `detalle_obra` (
  `id` int(11) NOT NULL,
  `actividad` varchar(60) DEFAULT NULL,
  `fechaini` varchar(50) DEFAULT NULL,
  `fechafin` int(50) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `idObra` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `detalle_obra`
--

INSERT INTO `detalle_obra` (`id`, `actividad`, `fechaini`, `fechafin`, `estado`, `idObra`) VALUES
(42, 'Actividad 4', '2024-02-26', 2, 'En curso', 1),
(46, 'Actividad 3', '2024-02-26', 4, 'En curso', 1),
(48, 'Pruena', '2024-02-25', 4, 'En curso', 1),
(49, 'Actividad 1', '2024-03-26', 4, 'En curso', 1),
(52, 'Actividad 9', '2024-02-25', 29, 'En curso', 1),
(53, 'Actividad 5', '2024-02-26', 2, 'En curso', 1),
(57, 'Actividad 2', '2024-02-27', 50, 'En curso', 2),
(59, 'Actividad 1', '2024-02-27', 3, 'En curso', 2),
(60, 'Actividad 1', '2024-03-01', 3, 'En curso', 4),
(62, 'Actividad 2', '2024-03-29', 4, 'En curso', 4),
(63, 'Actividad 2', '2024-02-26', 3, 'En curso', 1),
(64, 'Actividad 6', '2024-02-26', 3, 'En curso', 1);

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
  `tipoDoc` varchar(22) DEFAULT NULL,
  `apellidos` varchar(50) DEFAULT NULL,
  `contrasena` varchar(250) DEFAULT NULL,
  `createdAt` date NOT NULL DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`idEmp`, `nombre`, `direccion`, `estado`, `email`, `telefono`, `cedula`, `tipoDoc`, `apellidos`, `contrasena`, `createdAt`) VALUES
(1, 'Ronald', 'calle 55', 1, 'ortizronald623@gmail.com', '3158119393', '1025646465', 'CC', 'Ortiz', '$2a$12$PGF9WItcJqWEXNV129XUEOzDGsfI9VkvhFF5OB.mw4qjg683lZHSe', '2024-02-15'),
(2, 'Herlyn', 'Cra 42 c #102', 1, 'herlyn@gmail.com', '3146949508', '123456789', 'CC', 'David', '$2b$10$NBlzhpJfL302C4kqy4aZJuajBs1cXhmbCYpTw2oQ/3NQEfbVm.xsO', '2024-02-19'),
(3, 'Ronald', 'Calle 37 b', 1, 'ronald_ortiz@soy.sena.edu.co', '3245771077', '10245312', 'CC', 'Ortiz arango', '$2b$10$Wcgj7Ls8zcm5rgn7LmNlQ.BWmx30rpbAE06xCwzHzyekPQVJxzCam', '2024-02-20'),
(4, 'Ronald', 'Calle 55 ee', 1, 'ronald987@gmail.com', '3245123', '10243123', 'Pasaporte', 'Ortiz', '$2b$10$PaEGmQdiR5fk.3HGUamn8OaJz/WL8mUw/pcB77OhVwsmTzAhr794e', '2024-02-20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado_especialidad`
--

CREATE TABLE `empleado_especialidad` (
  `id` int(11) NOT NULL,
  `idEmp` int(11) NOT NULL,
  `idEsp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `empleado_especialidad`
--

INSERT INTO `empleado_especialidad` (`id`, `idEmp`, `idEsp`) VALUES
(1, 2, 1),
(2, 2, 2),
(3, 3, 3),
(4, 3, 1),
(6, 4, 2),
(7, 4, 1);

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
(1, 'Pintor', 1),
(2, 'Mampostero', 1),
(3, 'Pintor', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materiales`
--

CREATE TABLE `materiales` (
  `idMat` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL,
  `idCategoria` int(11) DEFAULT NULL,
  `cantidad` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `materiales`
--

INSERT INTO `materiales` (`idMat`, `nombre`, `estado`, `idCategoria`, `cantidad`) VALUES
(1, 'Pintura negra', 1, 1, -40),
(2, 'Pintura gris', 1, 1, -27);

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
  `createdAt` date NOT NULL DEFAULT curdate(),
  `idEmp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `obras`
--

INSERT INTO `obras` (`idObra`, `descripcion`, `fechaini`, `fechafin`, `area`, `idCliente`, `estado`, `precio`, `createdAt`, `idEmp`) VALUES
(1, 'Enchape de baño y pintura de habitación en bello', '2024-02-21', '29/02/2024', '32 metros', 1, 'En construcción', 50000, '2024-02-21', 2),
(2, 'Enchape de baño', '2024-02-26', '16/04/2024', '32 metros', 1, 'Pendiente', 50000, '2024-02-26', 2),
(3, 'Obra de prueba', '2024-02-27', NULL, NULL, 1, 'Pendiente', NULL, '2024-02-27', 1),
(4, 'Enchape de baño', '2024-02-29', NULL, NULL, 1, 'Pendiente', NULL, '2024-02-28', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permiso`
--

CREATE TABLE `permiso` (
  `idPer` int(11) NOT NULL,
  `permiso` varchar(30) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `permiso`
--

INSERT INTO `permiso` (`idPer`, `permiso`, `estado`) VALUES
(1, 'Roles', 1),
(2, 'Empleados', 1),
(3, 'Especialidades', 1),
(4, 'Proveedores', 1),
(5, 'Materiales', 1),
(6, 'Obras', 1),
(7, 'Clientes', 1),
(8, 'Categorias', 1),
(9, 'Compras', 1),
(10, 'Permisos', 1);

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
(1, 'Ronald ortiz', 'calle 55 ee # 6a', '1025646465', 'Natural', 1, 'ortizronald623@gmail.com', '3158119393', NULL, NULL, NULL);

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
(1, 'Administrador', 1),
(2, 'Empleado', 1),
(3, 'Secretaria', 1);

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

--
-- Volcado de datos para la tabla `rolpermisoempleado`
--

INSERT INTO `rolpermisoempleado` (`id`, `idRol`, `idPer`, `idEmp`) VALUES
(129, 1, 1, NULL),
(130, 1, 2, NULL),
(131, 1, 3, NULL),
(132, 1, 4, NULL),
(133, 1, 5, NULL),
(134, 1, 6, NULL),
(135, 1, 7, NULL),
(136, 1, 8, NULL),
(137, 1, 9, NULL),
(138, 1, 10, NULL),
(139, 1, 1, 1),
(140, 1, 2, 1),
(141, 1, 3, 1),
(142, 1, 4, 1),
(143, 1, 5, 1),
(144, 1, 6, 1),
(145, 1, 7, 1),
(146, 1, 8, 1),
(147, 1, 9, 1),
(148, 1, 10, 1),
(219, 1, 6, 3),
(220, 1, 3, 3),
(221, 1, 4, 3),
(222, 1, 2, 3),
(223, 1, 1, 3),
(224, 1, 5, 3),
(225, 1, 7, 3),
(226, 1, 8, 3),
(227, 1, 10, 3),
(228, 1, 9, 3),
(249, 2, 2, NULL),
(250, 2, 3, NULL),
(251, 2, 1, NULL),
(252, 2, 4, NULL),
(253, 2, 8, NULL),
(254, 2, 5, NULL),
(255, 2, 9, NULL),
(256, 2, 6, NULL),
(257, 2, 7, NULL),
(258, 2, 10, NULL),
(259, 3, 7, NULL),
(260, 3, 3, NULL),
(261, 3, 5, NULL),
(262, 3, 1, NULL),
(263, 3, 2, NULL),
(264, 3, 6, NULL),
(265, 3, 8, NULL),
(266, 3, 4, NULL),
(267, 3, 9, NULL),
(268, 3, 10, NULL),
(279, 2, 5, 2),
(280, 2, 1, 2),
(281, 2, 3, 2),
(282, 2, 9, 2),
(283, 2, 2, 2),
(284, 2, 8, 2),
(285, 2, 4, 2),
(286, 2, 6, 2),
(287, 2, 7, 2),
(288, 2, 10, 2),
(299, 1, 4, 4),
(300, 1, 2, 4),
(301, 1, 8, 4),
(302, 1, 7, 4),
(303, 1, 3, 4),
(304, 1, 1, 4),
(305, 1, 6, 4),
(306, 1, 10, 4),
(307, 1, 5, 4),
(308, 1, 9, 4);

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
('162aa593-2c49-436f-8f60-02547c343fed', 'cb01df05c83e63a71d6efb340a527daf62c41e34a577bccb9dff68fbfb79ac55', '2024-02-21 17:41:51.541', '20231213144537_add_created_at_column_obras_clientes', NULL, NULL, '2024-02-21 17:41:50.659', 1),
('373c8cbd-b714-4618-ae0a-6ba247b4b4e6', 'd638406e63448934e0d0d333a1ffe4326de0d2a2407ace42b227b49fa6983c94', '2024-02-21 17:41:52.270', '20240121161531_migracion', NULL, NULL, '2024-02-21 17:41:51.543', 1),
('94827f9d-668e-47e2-8304-bb8164564c36', '4bcdda0344cc2bd9daa97a9bade521ea931c19cdde7feea0ad30ced810e1112d', '2024-02-21 17:42:06.114', '20240221174205_nueva_migracion', NULL, NULL, '2024-02-21 17:42:05.553', 1),
('9bff7483-6ee3-4bf4-9818-5d0a5ac7f7e5', '4818e9af0b28d232c8568148c4f435dc9c1a06086682d9cad9c85ac70500e74b', '2024-02-21 17:41:52.367', '20240122145707_migracion', NULL, NULL, '2024-02-21 17:41:52.271', 1),
('cd012a60-d248-4c2f-888c-c7378fb958d0', '0a2e126ab505e20991258daf58b1e62c11ae116eec81e9dae9d35fb283c63de6', '2024-02-21 17:41:52.467', '20240201182233_migracion', NULL, NULL, '2024-02-21 17:41:52.368', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividades_empleados`
--
ALTER TABLE `actividades_empleados`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idEmp` (`idEmp`),
  ADD KEY `idObra` (`idObra`);

--
-- Indices de la tabla `actividades_materiales`
--
ALTER TABLE `actividades_materiales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idMat` (`idMat`),
  ADD KEY `idObra` (`idObra`);

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
  ADD KEY `idCliente` (`idCliente`),
  ADD KEY `FK_idEmp` (`idEmp`);

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
-- AUTO_INCREMENT de la tabla `actividades_empleados`
--
ALTER TABLE `actividades_empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT de la tabla `actividades_materiales`
--
ALTER TABLE `actividades_materiales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idcat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `idCli` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `codigos`
--
ALTER TABLE `codigos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `idCom` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `compras_detalle`
--
ALTER TABLE `compras_detalle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `detalle_obra`
--
ALTER TABLE `detalle_obra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
  MODIFY `idEmp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `empleado_especialidad`
--
ALTER TABLE `empleado_especialidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `materiales`
--
ALTER TABLE `materiales`
  MODIFY `idMat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `obras`
--
ALTER TABLE `obras`
  MODIFY `idObra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `permiso`
--
ALTER TABLE `permiso`
  MODIFY `idPer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `idProv` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `rolpermisoempleado`
--
ALTER TABLE `rolpermisoempleado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=309;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actividades_empleados`
--
ALTER TABLE `actividades_empleados`
  ADD CONSTRAINT `actividades_empleados_ibfk_1` FOREIGN KEY (`idEmp`) REFERENCES `empleado` (`idEmp`),
  ADD CONSTRAINT `actividades_empleados_ibfk_2` FOREIGN KEY (`idObra`) REFERENCES `obras` (`idObra`);

--
-- Filtros para la tabla `actividades_materiales`
--
ALTER TABLE `actividades_materiales`
  ADD CONSTRAINT `actividades_materiales_ibfk_1` FOREIGN KEY (`idMat`) REFERENCES `materiales` (`idMat`),
  ADD CONSTRAINT `actividades_materiales_ibfk_2` FOREIGN KEY (`idObra`) REFERENCES `obras` (`idObra`);

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
  ADD CONSTRAINT `detalle_obra_ibfk_1` FOREIGN KEY (`idObra`) REFERENCES `obras` (`idObra`);

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
  ADD CONSTRAINT `FK_idEmp` FOREIGN KEY (`idEmp`) REFERENCES `empleado` (`idEmp`),
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
