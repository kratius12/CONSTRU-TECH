import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const router = Router()

router.get("/materiales", async (req, res) => {
    try {
        const materiales = await prisma.materiales.findMany({
            select: {
                idMat: true,
                cantidad: true,
                estado: true,
                nombre: true,
                proveedor: {
                    select: {
                        nombre: true
                    }
                },
                categoria: {
                    select: {
                        nombre: true
                    }
                }

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
        console.log(material)
    } catch (error) {
        console.error(error)
    }
})

router.post("/materiales", async (req, res) => {
    try {
        const { nombre, cantidad, idProveedor, idCategoria, estado } = req.body
        const result = await prisma.materiales.create({
            data: {
                nombre: nombre,
                cantidad: parseInt(cantidad),
                estado:  parseInt(estado),
                idCategoria:parseInt(idCategoria),
                idProveedor:parseInt(idProveedor)
            },
            
        })
        console.log(result)
    } catch (error) {
        console.error(error)
    }
})

router.put("/material/:id", async (req, res) => {
    try {
        const idMat = req.params.id
        const { nombre, cantidad, idProveedor, idCategoria, estado } = req.body
        const response = await prisma.materiales.update({
            where: {
                idMat: idMat
            },
            data: {
                nombre: nombre,
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
    } catch (error) {
        console.error(error)
    }
})

export default router