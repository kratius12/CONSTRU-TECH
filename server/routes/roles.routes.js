import { Router, json } from "express";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const router = Router()

router.get("/roles", async (req, res) =>{
    try {
        const result = await prisma.rol.findMany()
        res.status(200).json(result)

    } catch (error) {
        console.log(json({message: error.message}));
        return res.status(500).json({message: error.message})
    }
})

router.get("/roles/:id", async (req, res) =>{
    try {
        const result = await prisma.rol.findFirst({
            where: {
                idRol:parseInt(req.params.id)
            },
            include:{
                rol_permiso:{
                    select:{
                        idPer:true,
                        permiso:true
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

router.post("/roles", async (req, res) => {
    try {
        const {nombre, estado,  permiso
        } = req.body
        const result = await prisma.rol.create({
            data:{
                nombre: nombre,
                estado:parseInt(estado)
            }
        })
        await Promise.all(permiso.map(async (idPer) => {
            console.log(result,permiso);
            await prisma.rol_permiso.create({
                data:{
                    idRol:result.idRol,
                    idPer:parseInt(idPer.value)
                }
            })
        }))
        res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

router.put("/roles/:id", async (req, res) => {
    try {
        const {nombre, estado, permiso} = req.body
        const result = await prisma.rol.update({
            where:{
                idRol:parseInt(req.params.id)
            },
            data:{
                nombre: nombre,
                estado:parseInt(estado)
            }
        })
        if (result) {
            const result2 = await prisma.rol_permiso.deleteMany({
                where:{
                    idRol:parseInt(req.params.id)
                }
            })
            await Promise.all(permiso.map(async (idPer) => {
                await prisma.rol_permiso.create({
                    data:{
                        idRol:parseInt(req.params.id),
                        idPer:parseInt(idPer.value)
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

router.delete("/roles/:id", async (req, res) => {
    try {
        const result = await prisma.rol.delete({
            where:{
                idRol:parseInt(req.params.id)
            }
        })
        res.status(200).json(result)
        console.log(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message})
    }
})

router.get("/rolPermiso", async (req, res) => {
    try {
        const result= await prisma.rol.findMany({
            select:{
                idRol:true,
                nombre:true,
                estado:true,
                rol_permiso:{
                    select:{
                        permiso:true
                    }
                }
            }
        })   
        res.json(result)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

router.put("/rolStatus/:id", async (req, res) => {
    try {
        const {status} = req.body
        const result = await prisma.rol.update({
            where:{
                idRol:parseInt(req.params.id)
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