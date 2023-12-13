import {Router} from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.post('/login', async (req, res) =>{
    try{
        const result = await prisma.usuario.findFirst({
                where:{
                        correo:correo,
                        contrasena:contrasena
                }
        })
        console.log(result);
        res.status(200).json(result);
}catch (error){
        console.log(error);
        return res.status(500).json(error);
}
});