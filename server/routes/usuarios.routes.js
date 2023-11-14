import {Router} from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.get('/usuarios', async (req, res) =>{
        try {
            const result = await prisma.usuario.findMany()
            return res.status(200).json(result)
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    });

router.get('/usuarios/:id', async (req, res) =>{
        try{
                const result = await prisma.usuario.findFirst({
                        where:{
                                idUsu:parseInt(req.params.id)
                        }
                })
                console.log(result);
                return res.status(200).json(result);
        }catch (error){
                console.log(error);
                return res.status(500).json(error);
        }
});

router.post('/usuarios', async (req, res) => {
        try{
                const {estado, contrasena, idRol, idEmp} = req.body
                const result = await prisma.usuario.create({
                        data:{
                                contrasena: contrasena,
                                idRol: idRol,
                                idEmp: idEmp,
                                estado: parseInt(estado)
                        }
                })
                console.log(result);
                return res.status(200).json(result);
        }catch (error) {
                return res.status(500).json(error);
        }
});

router.put('/usuarios/:id', async (req, res) => {
        try {
                const {contrasena, idRol, idEmp,estado} = req.body
                const result = await prisma.usuario.update({
                        where:{
                                idUsu: parseInt(req.params.id)
                        },data:{
                                contrasena: contrasena,
                                idRol: idRol,
                                idEmp: idEmp,
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

router.delete('/usuarios/:id', async (req, res) => {
        try {
            const result = await prisma.usuario.delete({
                where:{
                    idUsu:parseInt(req.params.id)
                }
            })
            console.log(result);
            return res.status(200).json(result)
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    })

router.get("/usuariosRol", async (req, res) => {
try {
        const result= await prisma.usuario.findMany({
        select:{
                idUsu:true,
                contrasena:true,
                idRol:true,
                idEmp:true,
                estado:true,
                rol:{
                select:{
                        nombre:true
                }
                },
                empleado:{
                select:{
                        nombre:true
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
