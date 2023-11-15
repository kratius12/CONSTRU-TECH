import { Router, json } from "express";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const router = Router()

router.get("/especialidades", async (req, res) =>{
    try {
        const result = await prisma.especialidad.findMany()
        res.status(200).json(result)

    } catch (error) {
        console.log(json({message: error.message}));
        return res.status(500).json({message: error.message})
    }
})

router.get("/especialidad/:id", async (req, res) =>{
    try {
        const result = await prisma.especialidad.findFirst({
            where: {
                id:parseInt(req.params.id)
            }
        })
        console.log(result);
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error.message})
    }
})

router.post("/especialidades", async (req, res) => {
    try {
        const {especialidad, estado} = req.body
        const result = await prisma.especialidad.create({
            data:{
                especialidad: especialidad,
                estado:parseInt(estado)
            }
        })
        console.log(result);
        res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

router.put("/especialidad/:id", async (req, res) => {
    try {
        const {especialidad, estado} = req.body
        const result = await prisma.especialidad.update({
            where:{
                id:parseInt(req.params.id)
            },
            data:{
                especialidad: especialidad,
                estado:parseInt(estado)
            }
        })

        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message})
    }
})

router.delete("/especialidad/:id", async (req, res) => {
    try {
        const result = await prisma.especialidad.delete({
            where:{
                id:parseInt(req.params.id)
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