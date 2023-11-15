import { Router, json } from "express";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const router = Router()

router.get("/categorias", async (req, res) =>{
    try {
        const result = await prisma.categoria.findMany()
        res.status(200).json(result)

    } catch (error) {
        console.log(json({message: error.message}));
        return res.status(500).json({message: error.message})
    }
})

router.get("/categoria/:id", async (req, res) =>{
    try {
        const result = await prisma.categoria.findFirst({
            where: {
                idcat:parseInt(req.params.id)
            }
        })
        console.log(result);
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error.message})
    }
})

router.post("/categorias", async (req, res) => {
    try {
        const {nombre, estado, medida} = req.body
        const result = await prisma.categoria.create({
            data:{
                nombre: nombre,
                estado:parseInt(estado),
                medida:medida
            }
        })
        console.log(result);
        res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

router.put("/categoria/:id", async (req, res) => {
    try {
        const {nombre, estado, medida} = req.body
        const result = await prisma.categoria.update({
            where:{
                idcat:parseInt(req.params.id)
            },
            data:{
                nombre: nombre,
                estado:parseInt(estado),
                medida:medida
            }
        })

        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message})
    }
})

router.delete("/categoria/:id", async (req, res) => {
    try {
        const result = await prisma.categoria.delete({
            where:{
                idcat:parseInt(req.params.id)
            }
        })
        res.status(200).json(result)
        console.log(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message})
    }
})


export default router