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
        const compra = await prisma.compras.findUnique({
            where: {
                idCom: parseInt(req.params.id)
            },include:{
                compras_detalle:{
                    include:{
                        materiales:true,
                         categoria:true
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

const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-construtech-' + file.originalname)
    }
})

const fileUpload = multer({
    storage: diskstorage
}).single('imagen');  // Use 'imagen' as the name of the field in the form

router.post("/compra", fileUpload, async (req, res) => {

        const { detalles, total_compra,imagen, fecha,codigoFactura } = req.body;
        const nuevaCompra = await prisma.compras.create({
            data: {
                total_compra: parseInt(total_compra).toLocaleString(),
                imagen: imagen,
                fecha: fecha,
                codigoFactura: codigoFactura
            }
        });
        for (const detalle of detalles) {
            const {idCat, idMat, cantidad, precio,} = detalle;

            await prisma.compras_detalle.createMany({
                data: {
                    cantidad: parseInt(cantidad),
                    idCompra: nuevaCompra.idCom,
                    idMat: parseInt(idMat),
                    idCat: parseInt(idCat),
                    precio: parseInt(precio),
                    subtotal: parseInt(precio*cantidad)
                }
            });
        }

        return res.status(201).send({ message: "Compra creada exitosamente" });

});


export default router

