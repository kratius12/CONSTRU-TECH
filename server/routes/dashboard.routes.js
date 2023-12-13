import { Router, json } from "express";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const router = Router()

router.get("/dashboard", async (req, res) =>{
    try {
        const result = await prisma.especialidad.findMany()
        res.status(200).json(result)

    } catch (error) {
        console.log(json({message: error.message}));
        return res.status(500).json({message: error.message})
    }
})

router.get("/dashboard/:id", async (req, res) =>{
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


export default router