import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const router = Router()

router.get("/materiales", async (req, res) => {
    try {
        const materiales = await prisma.materiales.findMany({
            include: {
                categoria: true,
                proveedor: true
            }
        })
        return res.send(materiales)
    } catch (error) {
        console.error(error)
    }
})
router.get("/material/:id", async (req, res) => {
    try {
        const material = await prisma.materiales.findFirst({
            where: {
                idMat: parseInt(req.params.id)
            }
        })
    } catch (error) {
        console.error(error)
    }
})

router.post("/materiales", async (req, res) => {
    try {
        const { nombre, precio, cantidad, idProveedor, idCategoria, estado } = req.body
        const result = await prisma.materiales.create({
            data: {
                nombre: nombre,
                precio: precio,
                cantidad: cantidad,
                estado: estado,
                idProveedor: idProveedor,
                idCategoria: idCategoria
            }
        })
    } catch (error) {
        console.error(error)
    }
})

router.put("/material/:id", async (req, res) => {
    try {
        const idMat = req.params.id
        const { nombre, precio, cantidad, idProveedor, idCategoria, estado } = req.body
        const response = await prisma.materiales.update({
            where: {
                idMat: idMat
            },
            data: {
                nombre: nombre,
                precio: precio,
                cantidad: cantidad,
                estado: estado,
                idProveedor: idProveedor,
                idCategoria: idCategoria
            }
        })
        console.log(response)
    } catch (error) {
        console.error(error)
    }
})

router.delete("/material/:id", async (req, res) => {
    try {
        const response = await prisma.materiales.delete({
            where: {
                idMat: req.params.id
            }
        })
    }catch(error){
        console.error(error)
    }
})

export default router