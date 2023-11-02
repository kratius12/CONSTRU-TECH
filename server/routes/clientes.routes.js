import {Router} from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.get('/clientes', async (req, res) =>{
        try {
            const result = await prisma.cliente.findMany()
            res.status(200).json(result)
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    });

router.get('/cliente/:id', async (req, res) =>{
        try{
                const result = await prisma.cliente.findFirst({
                        where:{
                                idCli:parseInt(req.params.id)
                        }
                })
                console.log(result);
                res.status(200).json(result);
        }catch (error){
                console.log(error);
                return res.status(500).json(error);
        }
});

router.post('/cliente', async (req, res) => {
        try{
                const {nombre, email, direccion, telefono, cedula, fecha_nac, estado} = req.body
                let date = new Date(fecha_nac)
                const result = await prisma.cliente.create({
                        data:{
                                nombre: nombre,
                                email: email,
                                direccion: direccion,
                                telefono: telefono,
                                cedula: cedula,
                                fecha_nac: date,
                                estado: parseInt(estado)
                        }
                })
                console.log(result);
                res.status(200).json(result);
        }catch (error) {
                return res.status(500).json(error);
        }
});

router.put('/cliente/:id', async (req, res) => {
        try {
                const {nombre, email, direccion, telefono, cedula, fecha_nac, estado} = req.body
                let date = new Date(fecha_nac)
                const result = await prisma.cliente.update({
                        where:{
                                idCli: parseInt(req.params.id)
                        },data:{
                                nombre: nombre,
                                email: email,
                                direccion: direccion,
                                telefono: telefono,
                                cedula: cedula,
                                fecha_nac: date,
                                estado: parseInt(estado)
                        }
                })
                console.log(result);
                res.status(200).json(result)
        } catch (error) {
                console.log(error);
                return res.status(500).json(error)
        }
});

router.delete('/cliente/:id', async (req, res) => {
        try {
            const result = await prisma.cliente.delete({
                where:{
                    idCli:parseInt(req.params.id)
                }
            })
            res.status(200).json(result)
            console.log(result);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    })

export default router
