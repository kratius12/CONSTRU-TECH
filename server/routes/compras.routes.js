import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();
const prisma = new PrismaClient()

router.get("/compras", async (req, res) => {
    try {
        const compras = await prisma.compras.findMany({
        })
        return res.send(compras)
    } catch (error) {
        console.error(error)
    }
})

router.get('/compra/:id', async (req, res) => {
    try {
        const compra = await prisma.compras.findFirst({
            where: {
                idCom: parseInt(req.params.id)
            }
        })
        const detalles = await prisma.compras_detalle.findMany({
            where:{
                idCompra: parseInt(req.params.id)
            }
        })
        const body ={
            compra: compra,
            detalles: detalles,
        }
        return res.status(200).send(body)
    } catch (error) {
        console.error(error);
    }
});

const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-construtech-' + file.originalname)
    }
})

const fileUpload = multer({
    storage: diskstorage
}).single('imagen')  // Usar 'imagen' como el nombre del campo en el formulario

router.post("/compra", fileUpload, async (req, res) => {
    try {
        const { detalles, totalCompra, fecha } = req.body;

        // Crear el registro en la tabla de compras
        const nuevaCompra = await prisma.compras.create({
            data: {
                totalCompra: totalCompra,
                imagen: req.file ? req.file.path : null,  // Guarda la URL de la imagen o null si no hay imagen
                fecha: fecha,
            }
        });
        await prisma.compras_detalle.createMany({
            data: {
                idCompra: nuevaCompra.idCom,
                // idCat: parseInt(detalles.idCat),
                idMat: parseInt(detalles.idMat),
                cantidad: parseInt(detalles.cantidad),
                Precio: parseInt(detalles.precio),
                subtotal: parseInt(detalles.subtotal),
            }
        });
        console.log()
        return res.status(201).send({ message: "Compra creada exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
});


export default router

