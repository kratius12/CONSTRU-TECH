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
            },
            include:{
                empleado_obra:{
                    select:{
                        empleado:true
                    }
                },
                materiales_obras:{
                    select:{
                        materiales:true
                    }
                },
                cliente:true
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

router.put("/obra/:id", async (req, res) =>{
    try {
        const {descripcion, area, cliente, empleados, material, estado, fechafin, fechaini} = req.body
        const result = await prisma.obras.update({
            where:{
                idObra:parseInt(req.params.id)
            },
            data:{
                descripcion:descripcion,
                area:area,
                estado:String(estado.value),
                fechaini:fechaini,
                fechafin:fechafin,
                idCliente:cliente.value
            }
        })
        if (result) {
            const result2 = await prisma.empleado_obra.deleteMany({
                where:{
                    idObra:parseInt(req.params.id)
                }
            })
            const result3 = await prisma.materiales_obras.deleteMany({
                where:{
                    idObra:parseInt(req.params.id)
                }
            })
            await Promise.all(empleados.map(async (empleado) =>{
                await prisma.empleado_obra.create({
                    data:{
                        idEmp:parseInt(empleado.value),
                        idObra:parseInt(req.params.id)
                    }
                })
            }))
            await Promise.all(material.map(async (mat) =>{
                await prisma.materiales_obras.create({
                    data:{
                        idMaterial:parseInt(mat.value),
                        idObra:parseInt(req.params.id)
                    }
                })
            }))
            res.status(200).json(result)
        }else{
            console.log("Ha ocurrido un error...");            
        }
    } catch (error) {
        console.log(json({message:error.message}))
        return res.status(500).json({message: error.message})
    }
})

router.delete("/obra/:id", deleteObra)

router.put("/obraStatus/:id", async (req, res) => {
    try {
        const {status} = req.body
        const result = await prisma.obras.update({
            where:{
                idObra:parseInt(req.params.id)
            },
            data:{
                estado:parseInt(status)
            }
        })        
        console.log(status)
        return res.status(200).json(result)

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

 export default router