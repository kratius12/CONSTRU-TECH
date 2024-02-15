import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { ucfirst } from "../plugins";
const prisma = new PrismaClient()

const router = Router()

router.get("/materiales", async (req, res) => {
    try {
        const materiales = await prisma.materiales.findMany({
            select: {
                idMat: true,
                estado: true,
                nombre: true,
                categoria: {
                    select: {
                        nombre: true
                    }
                }

            }

        })
        return res.send(materiales)
    } catch (error) {
        console.error(error)
    }
})
router.get("/materialesAc", async (req, res) => {
    try {
        const materiales = await prisma.materiales.findMany({
            where:{
                estado:1
            }

        })
        return res.send(materiales)
    } catch (error) {
        console.error(error)
    }
})
router.get("/material/:id", async (req, res) => {
    try {
        const material = await prisma.materiales.findFirst({
            where: {
                idMat: parseInt(req.params.id)
            }
        })
        return res.send(material)
    } catch (error) {
        console.error(error)
    }
})

router.post("/materiales", async (req, res) => {
    try {
        const { nombre, idCategoria } = req.body
        const result = await prisma.materiales.create({
            data: {
                nombre: ucfirst(nombre),
                estado: 1,
                idCategoria:parseInt(idCategoria),
            },
            
        })
    } catch (error) {
        console.error(error)
    }
})

router.put("/material/:id", async (req, res) => {
    try {
        const idMat = req.params.id
        const { nombre, cantidad,  idCategoria, estado } = req.body
        const response = await prisma.materiales.update({
            where: {
                idMat: parseInt(idMat)
            },
            data: {
                nombre: ucfirst(nombre),
                cantidad: cantidad,
                estado: estado,
                idCategoria: idCategoria
            }
        })
    } catch (error) {
        console.error(error)
    }
})

router.delete("/material/:id", async (req, res) => {
    try {
        const response = await prisma.materiales.delete({
            where: {
                idMat: req.params.id
            }
        })
    } catch (error) {
        console.error(error)
    }
})

router.put("/materialEstado/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
  
    const material = await prisma.materiales.findUnique({
        where: {
          idMat: Number(id),
        },
        include: {
          categoria: true,
        },
      });
      if (estado === 1) {
        if (material.categoria.estado == 1) {
          await prisma.materiales.update({
            where: {
              idMat: Number(id),
            },
            data: {
              estado,
            },
          });
      
          return res.status(200).json({
            message: "Estado del material actualizado con éxito",
            type: "green",
          });
        } else if(material.categoria.estado==0){
          return res.status(204).json({
            message: "No se puede editar el estado del material si el estado de la categoría es 0",
            type: "red",
          });
        }
      }else if(estado===0){
        const newEstado = await prisma.materiales.update({
            where:{
                idMat:parseInt(req.params.id)
            },data:{
                estado: parseInt(estado)
            }
        })
      }
  });

export default router