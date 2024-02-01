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
        cliente: {
          select: {
            idCli: true,
            nombre: true,
            apellidos: true
          }
        }
      }
    })
    const actividad = await prisma.detalle_obra.groupBy({
      by: ["actividad", "fechafin", "fechafin", "estado", "idObra"],
    });
    const emps = await prisma.detalle_obra.findMany({
      where: {
        AND: [
          {
            idObra: parseInt(req.params.id),
          }, {
            NOT: {
              idEmp: null
            }
          }
        ],
      },
      select: {
        idEmp: true,
      },
    });
    const mats = await prisma.detalle_obra.findMany({
      where: {
        AND: [
          {
            idObra: parseInt(req.params.id),
          }, {
            NOT: {
              idMat: null
            }
          }
        ],
      },
      select: {
        idMat: true,
      },
    });
    const empleadosUnicos = [...new Set(emps.map((emp) => emp.idEmp))];
    const materialesUnicos = [...new Set(mats.map((mat) => mat.idMat))];
    const actividadesConEmpleadosMaterialesUnicos = actividad.map((act) => ({
      ...act,
      empleados: empleadosUnicos,
      materiales: materialesUnicos,
    }));

    const response = {
      ...result,
      actividadesConEmpleadosMaterialesUnicos
    }
    res.status(200).json(response)
  } catch (error) {
    console.log(json({ message: error.message }))
    return res.status(500).json({ message: error.message })
  }
})

router.post("/obras", async (req, res) => {
  try {
    const { descripcion, fechaini, idCliente, idEmp } = req.body;
    const obra = await prisma.obras.create({
      data: {
        descripcion: descripcion,
        fechaini: fechaini,
        estado: "Pendiente",
        idCliente: parseInt(idCliente),
        idEmp: parseInt(idEmp)
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
    const { descripcion, area, idCliente, actividades, estado, fechafin, fechaini, precio } = req.body;
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
        idCliente: parseInt(idCliente),
        precio: parseInt(precio),

      }
    });
    const borrar = await prisma.detalle_obra.deleteMany({
      where: {
        idObra: parseInt(req.params.id)
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
        for (const material of materiales) {
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
});

router.get("/actividades/:id", async (req, res) => {
  try {
    const actividad = await prisma.detalle_obra.groupBy({
      by: ["actividad", "fechafin", "fechafin", "estado", "idObra"],
    });
    const emps = await prisma.detalle_obra.findMany({
      where: {
        AND: [
          {
            idObra: parseInt(req.params.id),
          }, {
            NOT: {
              idEmp: null
            }
          }
        ],
      },
      select: {
        idEmp: true,
      },
    });
    const mats = await prisma.detalle_obra.findMany({
      where: {
        AND: [
          {
            idObra: parseInt(req.params.id),
          }, {
            NOT: {
              idMat: null
            }
          }
        ],
      },
      select: {
        idMat: true,
      },
    });
    const empleadosUnicos = [...new Set(emps.map((emp) => emp.idEmp))];
    const materialesUnicos = [...new Set(mats.map((mat) => mat.idMat))];
    const actividadesConEmpleadosMaterialesUnicos = actividad.map((act) => ({
      ...act,
      empleados: empleadosUnicos,
      materiales: materialesUnicos,
    }));
    return res.json(actividadesConEmpleadosMaterialesUnicos);
  } catch (error) {
    console.error("Error fetching actividades:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});


export default router
