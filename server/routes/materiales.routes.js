import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const router = Router()

router.get("/materiales", async (req, res) => {
    try {
        const materiales = await prisma.materiales.findMany({
            select: {
                idMat: true,
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
router.get("/materialesAc", async (req, res) => {
    try {
        const materiales = await prisma.materiales.findMany({
            select: {
                idMat: true,
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

            }, where:{
                estado:1
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
        return res.send(material)
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
                estado: 1,
                idCategoria:parseInt(idCategoria),
                idProveedor:parseInt(idProveedor)
            },
            
        })
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
                idMat: parseInt(idMat)
            },
            data: {
                nombre: nombre,
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

router.put("/materialEstado/:id",async(req,res)=>{
    try{
        const {estado} = req.body
        const newEstado = await prisma.materiales.update({
            where:{
                idMat: parseInt(req.params.id)
            },data:{
                estado: parseInt(estado)
            }
        })
    }catch(error){
        console.error(error)
    }
})

export default router