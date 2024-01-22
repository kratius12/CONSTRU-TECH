import {Router} from 'express';
import bcrypt from "bcrypt"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();
const generarHash = async (password, saltRounds = 10) => {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return { hash, salt };
    };
    

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
                res.status(200).json(result);
        }catch (error){
                console.log(error);
                return res.status(500).json(error);
        }
});

router.post('/cliente', async (req, res) => {
        try{
                const {nombre, apellidos, email, direccion, telefono, tipoDoc, cedula, fecha_nac, estado, contrasena} = req.body
                let date = new Date(fecha_nac)
                const { hash, salt } = await generarHash(contrasena);
                const result = await prisma.cliente.create({
                        data:{
                                nombre: nombre,
                                apellidos:apellidos,
                                email: email,
                                direccion: direccion,
                                telefono: telefono,
                                tipoDoc: tipoDoc,
                                cedula: cedula,
                                fecha_nac: fecha_nac,
                                estado: parseInt(estado),
                                constrasena:hash,
                                salt:salt
                        }
                })
                
                res.status(200).json(result);
        }catch (error) {
                return res.status(500).json(error);
        }
});

router.put('/cliente/:id', async (req, res) => {
        try {
                const {nombre,apellidos, email, direccion, telefono, tipoDoc, cedula, fecha_nac, estado,contrasena} = req.body
                const { hash, salt } = await generarHash(contrasena);
                const result = await prisma.cliente.update({
                        where:{
                                idCli: parseInt(req.params.id)
                        },data:{
                                nombre: nombre,
                                apellidos:apellidos,
                                email: email,
                                direccion: direccion,
                                telefono: telefono,
                                tipoDoc: tipoDoc,
                                cedula: cedula,
                                fecha_nac: fecha_nac,
                                estado: parseInt(estado),
                                constrasena:hash,
                                salt:salt
                        }
                })
                
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
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    })
    router.post('/log_in', async (req, res) =>{

        const {correo, contrasena} = req.body
        try {
           const {correo, contrasena} = req.body
            const user = await prisma.usuario.findUnique({
                where:{
                        correo,
                        contrasena,
                },
                include: {
                        rol:true
                }
            })
            const empleado = await prisma.empleado.findFirst({
                where:{idEmp:user.idEmpl},
                select:{
                        cedula:true,
                        direccion:true,
                        nombre :true,
                        telefono:true,
                }
            })
            res.status(200).json(user)
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    });
    router.put("/clientStatus/:id", async (req, res) => {
        try {
            const {status} = req.body
            const result = await prisma.cliente.update({
                where:{
                    idCli:parseInt(req.params.id)
                },
                data:{
                    estado:parseInt(status)
                }
            })        
            return res.status(200).json(result)
    
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    })
    

export default router
