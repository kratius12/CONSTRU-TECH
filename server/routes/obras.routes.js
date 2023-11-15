import {Router, json} from "express";
import {
    getObras,
    getObra,
    createObra,
    updateObra,
    deleteObra
} from "../controllers/obras.controller.js"

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
const router = Router()

router.get("/obras", async (req, res) =>{
    try {
        const result = await prisma.obras.findMany()
        res.status(200).json(result)
    } catch (error) {
        console.log(json({message: error.message}))
        return res.status(500).json({message: error.message})
    }
})

router.get("/obra/:id", async (req, res) =>{
    try {
        const result = await prisma.obras.findFirst({
            where:{
                idObra:parseInt(req.params.id)
            }
        })
        console.log(result);
        res.status(200).json(result)
    } catch (error) {
        console.log(json({message: error.message}))
        return res.status(500).json({message: error.message})
    }
})

router.post("/obras", async (req, res) =>{
    try {
        const {descripcion, estado, fechaini, fechafin, cliente, empleados, materiales} = req.body
        const result = await prisma.obras.create({
            data:{
                descripcion:descripcion,
                fechaini:fechaini,
                estado:"1",
                idCliente:parseInt(cliente)
            }
        })
        await prisma.empleado_obra.create({
            data:{
                idEmp:parseInt(empleados),
                idObra:parseInt(result.idObra)
            }
        })
        console.log(result)
        res.status(200).json(result)
    } catch (error) {
        console.log(json({message: error.message}))
        return res.status(500).json({message: error.message})
    }
})

router.put("/obra/:id", updateObra)

router.delete("/obra/:id", deleteObra)

 export default router