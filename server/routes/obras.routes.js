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
        const result = await prisma.obras.findMany({
            include:{
                cliente:true,
                detalle_obra:true
            }
        })
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
                detalle_obra:{
                    include:{
                        empleado:true,
                        materiales:true
                    }
                },
                cliente:{
                    select:{
                        idCli:true,
                        nombre:true,
                        apellidos:true
                    }
                }
            }
        })
        if (result) {
            result.actividades = result.detalle_obra;
            delete result.detalle_obra;
        }
        res.status(200).json(result)
    } catch (error) {
        console.log(json({message: error.message}))
        return res.status(500).json({message: error.message})
    }
})

router.post("/obras", async (req, res) =>{
    try {
        const {descripcion, fechaini, cliente, empleados} = req.body
        const result = await prisma.obras.create({
            data:{
                descripcion:descripcion,
                fechaini:fechaini,
                estado:"Pendiente",
                idCliente:parseInt(cliente.value)
            }
        })
        await prisma.detalle_obra.create({
            data:{
                // idEmp:parseInt(empleados.value),
                // idObra:parseInt(result.idObra),
                estado:"En curso",
                fechaini:fechaini,
                fechafin:fechaini,
                actividad:"Asesoria",
                obras:{
                    connect:{
                        idObra: parseInt(result.idObra)
                    }
                },
                empleado:{
                    connect:{
                        idEmp: empleados.value
                    }
                },
                materiales:{
                    connect:{
                        idMat:0
                    }
                }
            }
        })
        console.log(result)
        res.status(200).json(result)
    } catch (error) {
        console.log('message:'+error.message)
        return res.status(500).json({message: error.message})
    }
})

router.put("/obra/:id", async (req, res) =>{
    try {
        const {descripcion, area, cliente, actividades, estado, fechafin, fechaini, precio} = req.body
        const clienteValue = cliente.length > 0 ? cliente[0].value : null;
        const result = await prisma.obras.update({
            where:{
                idObra:parseInt(req.params.id)
            },
            data:{
                descripcion:descripcion,
                area:area,
                estado:estado,
                fechaini:fechaini,
                fechafin:fechafin,
                idCliente:clienteValue,
                precio:parseInt(precio)
            }
        })
        if (result) {

            await prisma.detalle_obra.deleteMany({
                where: {
                  idObra: parseInt(req.params.id),
                },
            });

            await Promise.all(actividades.map(async (actividad) => {
                const { empleados, materiales, ...rest } = actividad;
                
                
                await prisma.detalle_obra.create({
                    data: {
                      actividad: actividad.actividad,
                      fechaini: actividad.fechaini,
                      fechafin: actividad.fechafin,
                      estado: actividad.estado,
                      idObra: parseInt(req.params.id),
                      idEmp: actividad.idEmp,
                      idMat: actividad.idMat,
                    },
                  });
                
            }));
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