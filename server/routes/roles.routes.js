import {Router} from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.get('/roles', async (req, res) =>{
        try {
            const result = await prisma.rol.findMany()
            return res.status(200).json(result)
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    });

router.get('/roles/:id', async (req, res) =>{
        try{
                const result = await prisma.rol.findFirst({
                        where:{
                                idRol:parseInt(req.params.id)
                        }
                })
                console.log(result);
                return res.status(200).json(result);
        }catch (error){
                console.log(error);
                return res.status(500).json(error);
        }
});

router.post('/roles', async (req, res) => {
        try{
                const {nombre, estado} = req.body
                const result = await prisma.rol.create({
                        data:{
                                nombre: nombre,
                                estado: parseInt(estado)
                        }
                })
                console.log(result);
                return res.status(200).json(result);
        }catch (error) {
                return res.status(500).json(error);
        }
});

router.put('/roles/:id', async (req, res) => {
        try {
                const {nombre, estado} = req.body
                const result = await prisma.rol.update({
                        where:{
                                idRol: parseInt(req.params.id)
                        },data:{
                                nombre: nombre,
                                estado: parseInt(estado)
                        }
                })
                console.log(result);
                return res.status(200).json(result)
        } catch (error) {
                console.log(error);
                return res.status(500).json(error)
        }
});

router.delete('/roles/:id', async (req, res) => {
        try {
            const result = await prisma.rol.delete({
                where:{
                    idRol:parseInt(req.params.id)
                }
            })
            console.log(result);
            return res.status(200).json(result)
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    })

router.get("/rolesPer", async (req, res) => {
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
        console.log(result);
        
        } catch (error) {
        return res.status(500).json({message: error.message})
        }
})

export default router
