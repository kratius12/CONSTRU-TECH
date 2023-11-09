import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient()

router.get("/compras",async(req,res)=>{
    try{
        const compras = await prisma.compras.findMany({})
        return res.send(compras)
    }catch(error){
        console.error(error)
    }
})

router.get('/compra',async(req,res)=>{
    try{
        const compra = await prisma.compras.findFirst({
            where:{
                idCom: req.params.id
            }
        })
        return res.send(compra)
    }catch(error){
        console.error(error);
    }
});

router.post('/compra',async(req,res)=>{
    try{
        const {fecha,imagen,total_compra} = req.body
        const respone = await prisma.compras.create({
            data:{
                fecha:fecha,
                imagen:imagen,
                total_compra:total_compra
            }
        })
    }catch(error){
        console.error(error)
    }
})

router.put('/compra',async(req,res)=>{
    try{
        const {fecha,imagen,total_compra} = req.body
        const result = await prisma.compras.update({
            where:{
                idCom:req.params.id
            },data:{
                fecha:fecha,
                imagen:imagen,
                total_compra:total_compra
            }
        })
    }catch(error){
        console.error(error)
    }
})

router.delete('/compra',async(req,res)=>{
    try{
        const response = await prisma.compras.delete({
            where:{
                idCom:req.params.id
            }
        })
    }catch(error){
        console.error(error)
    }
})

export default router