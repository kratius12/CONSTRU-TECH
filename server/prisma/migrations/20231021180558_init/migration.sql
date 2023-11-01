-- CreateTable
CREATE TABLE `Empleado` (
    `idEmp` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `tipoDoc` VARCHAR(10) NOT NULL,
    `cedula` VARCHAR(10) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `telefono` VARCHAR(10) NOT NULL,
    `direccion` VARCHAR(50) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`idEmp`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Especialidad` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `especialidad` VARCHAR(30) NOT NULL,
    `estado` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empleado_Especialidad` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idEmp` INTEGER NOT NULL,
    `idEsp` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Empleado_Especialidad` ADD CONSTRAINT `Empleado_Especialidad_idEmp_fkey` FOREIGN KEY (`idEmp`) REFERENCES `Empleado`(`idEmp`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Empleado_Especialidad` ADD CONSTRAINT `Empleado_Especialidad_idEsp_fkey` FOREIGN KEY (`idEsp`) REFERENCES `Especialidad`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
