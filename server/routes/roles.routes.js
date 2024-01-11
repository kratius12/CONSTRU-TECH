import { Router } from "express";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const router = Router()

router.get("/roles", async(req,res)=>{
    try {
        const roles = await prisma.rol.findMany({})
        return res.send(roles)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

router.get("/rol/:id",async(req,res)=>{
    try {
        const rol = await prisma.rol.findUnique({
            where:{
                idRol:parseInt(req.params.id)
            }, include:{
                rolpermisoempleado:{
                    select:{
                        permiso:{
                            select:{
                                permiso:true
                            }
                        }
                    }
                }
            }
        })
        return res.send(rol)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

router.post("/rol",async(req,res)=>{
    try {
        const {nombre,permisos} = req.body
        const rol = await prisma.rol.create({
            data:{
                nombre:nombre,
                estado:1
            }
        })
        for(var i = 0; i< permisos.length; i++){
            var elemento = permisos[i]
            
            await prisma.rolpermisoempleado.createMany({
                data:{
                    idPer:parseInt(elemento),
                    idRol:parseInt(rol.idRol),
                    idEmp:null
                }
            })
         
        }
        return res.status(201).send({ message: "Rol creado exitosamente" });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

export default router