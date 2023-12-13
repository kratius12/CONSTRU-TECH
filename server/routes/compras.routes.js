import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();
const prisma = new PrismaClient();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Utiliza una ruta absoluta en lugar de una ruta relativa
        const absolutePath = path.join(__dirname, '..', 'images');
        cb(null, absolutePath);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});


router.get("/compras", async (req, res) => {
    try {
        const compras = await prisma.compras.findMany({});
        return res.send(compras);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error interno del servidor' });
    }
});

router.get('/compra/:id', async (req, res) => {
    try {
        const compra = await prisma.compras.findUnique({
            where: {
                idCom: parseInt(req.params.id)
            },
            include: {
                compras_detalle: {
                    include: {
                        materiales: true,
                        categoria: true
                    }
                }
            }
        });

        if (!compra) {
            return res.status(404).send({ message: 'Compra no encontrada' });
        }

        return res.status(200).send(compra);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error interno del servidor' });
    }
});

const upload = multer({ storage: storage });


router.post("/compra", upload.single("imagen"), async (req, res) => {
    try {
        if(!req.file){
            return res.json({message:"Error al cargar la imagen"})
        }
        const { detalles,total_compra, fecha, codigoFactura } = req.body;
        const nuevaCompra = await prisma.compras.create({
            data: {
                total_compra: parseInt(total_compra),
                imagen: req.file.filename,
                fecha: fecha,
                codigoFactura: codigoFactura
            }
        });

        for (const detalle of detalles) {
            const { idCat, idMat, cantidad, precio } = detalle;

            await prisma.compras_detalle.createMany({
                data: {
                    cantidad: parseInt(cantidad),
                    idCompra: nuevaCompra.idCom,
                    idMat: parseInt(idMat),
                    idCat: parseInt(idCat),
                    precio: parseInt(precio),
                    subtotal: parseInt(precio * cantidad)
                }
            });
        }// Después de crear la compra, calcula el total_compra sumando los subtotales


        return res.status(201).send({ message: "Compra creada exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(201).send({ message: 'Error interno del servidor' });
    }
});

export default router;
