import {Router, json} from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.post('/login', async (req, res) =>{
    try{
        const {username, password} = req.body
        const result = await prisma.empleado.findUnique({
                where:{
                        email:username,
                        contrasena:password
                }
        })
        console.log(result);
        if (result) {
            res.status(200).json(true);
        } else {
            console.log(json(false))
            res.status(404).json(false);    
        }
     }catch (error){
                console.log(error);
                return res.status(500).json(error);
     }
});

export default router