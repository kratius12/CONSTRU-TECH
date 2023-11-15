import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import path from "path";

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

// const diskstorage = multer.diskStorage({
//     destination: path.join(__dirname, '../images'),
//     filename: (req,file,cb)=>{
//         cb(null,Date.now()+'-construtech-'+file.originalname)
//     }
// })

// const fileUpload = multer({
//     storage: diskstorage
// }).single('imagen')


router.post('/compra', async (req, res) => {
    try {
        const { fecha, imagen, total_compra, idMat, cantidad, Precio } = req.body
        const date = new Date(fecha)
        const response = await prisma.compras.create({
            data: {
                fecha: date,
                imagen: imagen,
                total_compra: parseInt(cantidad * Precio),
            },
        })
        await prisma.compras_detalle.createMany({
            data: {
                idCompra: response.idCom,
                idMat: parseInt(idMat),
                cantidad: parseInt(cantidad),
                Precio: parseInt(Precio),
                subtotal: parseInt(Precio * cantidad)
            }
        })

    } catch (error) {
        console.error(error)
    }
})

router.put('/compra', async (req, res) => {
    try {
        const { fecha, imagen, total_compra } = req.body
        const result = await prisma.compras.update({
            where: {
                idCom: req.params.id
            }, data: {
                fecha: fecha,
                imagen: imagen,
                total_compra: total_compra
            }
        })
    } catch (error) {
        console.error(error)
    }
})

router.delete('/compra', async (req, res) => {
    try {
        const response = await prisma.compras.delete({
            where: {
                idCom: req.params.id
            }
        })
    } catch (error) {
        console.error(error)
    }
})

router.post('/detalle', async (req, res) => {
    try {
        const { cantidad, precio } = req.body
        const subtotal = cantidad * precio
        const response = await prisma.compras_detalle.createMany({
            data: {
                compras: {
                    connect: {
                        idCom: req.body.idCom
                    }
                },
                materiales: {
                    connect: {
                        idMat: req.body.idMat
                    }
                },
                cantidad: cantidad,
                subtotal: subtotal,
                precio: precio
            }
        })
        console.log(response)
    } catch (error) {
        console.error(error)
    }
})

router.get('/detalle', async (req, res) => {
    try {
        const response = await prisma.compras_detalle.findFirst({
            where: {
                idCompra: req.params.id
            }
        })
    } catch (error) {
        console.error(error)
    }
})

export default router