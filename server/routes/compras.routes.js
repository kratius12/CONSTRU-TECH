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

router.get('/compra', async (req, res) => {
    try {
        const compra = await prisma.compras.findFirst({
            where: {
                idCom: req.params.id
            }
        })
        return res.send(compra)
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

router.post('/compra', fileUpload, async (req, res) => {
    try {
        // Utilizar req.file para obtener la información de la imagen
        const imagen = req.file.filename;
        const { fecha, cantidad, precio, total, materiales, subtotal } = req.body
        const date = new Date()
        const response = await prisma.compras.create({
            data: {
                fecha: date,
                imagen: imagen,
                total_compra: total,
            },
        })

        await Promise.all(materiales.map(async (idMat) => {
            console.log(response, materiales);
            await prisma.compras_detalle.create({
                data: {
                    idCompra: response.idCom,
                    idMat: parseInt(idMat),
                    cantidad: cantidad,
                    precio: precio,
                    subtotal: subtotal
                }
            })
        }))
        console.log(response)

        res.json({ success: true, message: 'Compra creada con éxito' });

    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
})








export default router