import { Router, json } from "express";


import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
const router = Router()

router.get("/obras", async (req, res) => {
  try {
    const result = await prisma.obras.findMany({
      include: {
        cliente: true,
        detalle_obra: true
      }
    })
    res.status(200).json(result)
  } catch (error) {
    console.log(json({ message: error.message }))
    return res.status(500).json({ message: error.message })
  }
})

router.get("/obra/:id", async (req, res) => {
  try {
    const result = await prisma.obras.findFirst({
      where: {
        idObra: parseInt(req.params.id)
      },
      include: {
        detalle_obra: {
          include: {
            empleado: {
              select: {
                nombre: true,
                idEmp: true,
                apellidos: true
              }
            },
            materiales: {
              select: {
                idMat: true,
                nombre: true
              }
            }
          }
        },
        cliente: {
          select: {
            idCli: true,
            nombre: true,
            apellidos: true
          }
        }
      }
    })
    if (result) {
      result.actividades = result.detalle_obra;
      delete result.detalle_obra;
    }
    res.status(200).json(result)
  } catch (error) {
    console.log(json({ message: error.message }))
    return res.status(500).json({ message: error.message })
  }
})

router.post("/obras", async (req, res) => {
  try {
    const { descripcion, fechaini, cliente, area, precio, actividad, empleado, fechafin } = req.body;
    const obra = await prisma.obras.create({
      data: {
        descripcion: descripcion,
        fechaini: fechaini,
        estado: "Pendiente",
        idCliente: parseInt(cliente),
        fechafin: fechafin,
        area: area,
        precio: parseInt(precio),
        idEmp: parseInt(empleado)
      },
    });


    console.log(obra);
    res.status(200).json(obra);
  } catch (error) {
    console.log("message:" + error.message);
    return res.status(500).json({ message: error.message });
  }
});


router.put("/obra/:id", async (req, res) => {
  try {
    const { descripcion, area, cliente, actividades, estado, fechafin, fechaini, precio } = req.body;
    // const clienteValue = cliente.length > 0 ? cliente[0].value : null;

    // Update obra
    const result = await prisma.obras.update({
      where: {
        idObra: parseInt(req.params.id)
      },
      data: {
        descripcion: descripcion,
        area: area,
        estado: estado,
        fechaini: fechaini,
        fechafin: fechafin,
        idCliente: parseInt(cliente),
        precio: parseInt(precio),

      }
    });
    const borrar = await prisma.detalle_obra.deleteMany({
      where:{
        idObra:parseInt(req.params.id)
      }
    })
    for (const actividad of actividades) {
      const { descripcion, fechaini, fechafin, materiales, empleados, estadoAct } = actividad
      console.log(materiales)

      const result = await prisma.detalle_obra.createMany({
        data: {
          actividad: descripcion,
          fechaini: fechaini,
          fechafin: fechafin,
          idEmp: null,
          idMat: null,
          estado: estadoAct,
          idObra: parseInt(req.params.id)
        }
      })
      for (const empleado of empleados) {
        for(const material of materiales){
          const materialesa = await prisma.detalle_obra.createMany({
            data: {
              actividad: descripcion,
              fechaini: fechaini,
              fechafin: fechafin,
              idEmp: parseInt(empleado),
              idMat: parseInt(material),
              estado: estadoAct,
              idObra: parseInt(req.params.id)
            }
          })
        }
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});



router.put("/obraStatus/:id", async (req, res) => {
  try {
    const { status } = req.body
    const result = await prisma.obras.update({
      where: {
        idObra: parseInt(req.params.id)
      },
      data: {
        estado: parseInt(status)
      }
    })
    console.log(status)
    return res.status(200).json(result)

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

export default router