import { Router, json } from "express";
import {
    getEmpleados,
    getEmpleado,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado,
    getEmpleadosEspecialidades
} from "../controllers/empleados.controller.js"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const router = Router()

router.get("/empleados", async (req, res) =>{
    try {
        const result = await prisma.empleado.findMany()
        res.status(200).json(result)

    } catch (error) {
        console.log(json({message: error.message}));
        return res.status(500).json({message: error.message})
    }
})

router.get("/empleado/:id", async (req, res) =>{
    try {
        const result = await prisma.empleado.findFirst({
            where: {
                idEmp:parseInt(req.params.id)
            },
            include:{
                empleado_especialidad:{
                    select:{
                        id:true,
                        especialidad:true
                    }
                }
            }
        })
        console.log(result);
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error.message})
    }
})

router.post("/empleados", async (req, res) => {
    try {
        const {nombre, apellido, direccion, estado,  telefono, tipoDoc, cedula, especialidad
        } = req.body
        const result = await prisma.empleado.create({
            data:{
                nombre: nombre,
                apellido:apellido,
                direccion:direccion,
                telefono:telefono,
                tipoDoc:tipoDoc,
                cedula:cedula,
                estado:parseInt(estado)
            }
        })
        await Promise.all(especialidad.map(async (idEsp) => {
            console.log(result,especialidad);
            await prisma.empleado_especialidad.create({
                data:{
                    idEmp:result.idEmp,
                    idEsp:parseInt(idEsp.value)
                }
            })
        }))
        res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

router.put("/empleado/:id", async (req, res) => {
    try {
        const {nombre, apellido, direccion, estado, telefono, tipoDoc, cedula, especialidad} = req.body
        const result = await prisma.empleado.update({
            where:{
                idEmp:parseInt(req.params.id)
            },
            data:{
                nombre: nombre,
                direccion:direccion,
                telefono:telefono,
                tipoDoc:tipoDoc,
                cedula:cedula,
                estado:parseInt(estado)
            }
        })
        if (result) {
            const result2 = await prisma.empleado_especialidad.deleteMany({
                where:{
                    idEmp:parseInt(req.params.id)
                }
            })
            await Promise.all(especialidad.map(async (idEsp) => {
                await prisma.empleado_especialidad.create({
                    data:{
                        idEmp:parseInt(req.params.id),
                        idEsp:parseInt(idEsp.value)
                    }
                })
            }))
            res.status(200).json(result)            
        }else{
            console.log("Ha ocurrido un error...");
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message})
    }
})

router.delete("/empleado/:id", async (req, res) => {
    try {
        const result = await prisma.empleado.delete({
            where:{
                idEmp:parseInt(req.params.id)
            }
        })
        res.status(200).json(result)
        console.log(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message})
    }
})

router.get("/empleadosEsp", async (req, res) => {
    try {
        const result= await prisma.empleado.findMany({
            select:{
                idEmp:true,
                nombre:true,
                telefono:true,
                cedula:true,
                estado:true,
                empleado_especialidad:{
                    select:{
                        especialidad:true
                    }
                }
            }
        })   
        res.json(result)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

router.put("/empleadoStatus/:id", async (req, res) => {
    try {
        const {status} = req.body
        const result = await prisma.empleado.update({
            where:{
                idEmp:parseInt(req.params.id)
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

router.put("/empleados/searchDoc", async (req, res) =>{
    try {
        const {cedula, tipoDoc} = req.body
        const result = await prisma.empleado.findMany({
            where:{
                AND:[
                    {
                      cedula: cedula
                    },{
                      tipoDoc: tipoDoc  
                    }
                ]
            }
        })
        if (result.length > 0) {
            return res.status(200).json(true)           
        } else {
            return res.status(200).json(false)
        }
        // res.status(200).json(result)

    } catch (error) {
        console.log(json({message: error.message}));
        return res.status(500).json({message: error.message})
    }
})

export default router