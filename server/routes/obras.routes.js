import { Router, json } from "express";


import { PrismaClient } from "@prisma/client";
import { ucfirst } from "../plugins.js";

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
        empleado: {
          select: {
            idEmp: true,
            nombre: true,
            apellidos: true
          }
        }
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
        materiales: {
          select: {
            idMat: true,
            nombre: true
          }
        }
      },
    });
    const empleadosUnicos = [...new Set(emps.map((emp) => emp.idEmp))];
    const materialesUnicos = [...new Set(mats.map((mat) => mat.idMat))];
    const actividadesConEmpleadosMaterialesUnicos = actividad.map((act) => ({
      ...act,
      empleados: empleadosUnicos.map((idEmp) => emps.find((emp) => emp.idEmp === idEmp).empleado),
      materiales: materialesUnicos.map((idMat) => mats.find((mat) => mat.idMat === idMat).materiales),
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
        descripcion: ucfirst(descripcion),
        fechaini: fechaini,
        estado: "Pendiente",
        idCliente: parseInt(idCliente),
        idEmp: parseInt(idEmp)
      },
    });
    res.status(200).json(obra);
  } catch (error) {
    console.log("message:" + error.message);
    return res.status(500).json({ message: error.message });
  }
});


router.put("/obra/:id", async (req, res) => {
  try {
    const { descripcion, area, idCliente, estado, fechafin, fechaini, precio } = req.body;
    const result = await prisma.obras.update({
      where: {
        idObra: parseInt(req.params.id)
      },
      data: {
        descripcion: ucfirst(descripcion),
        area: area,
        estado: estado,
        fechaini: fechaini,
        fechafin: fechafin,
        idCliente: parseInt(idCliente),
        precio: parseInt(precio),

      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/actividades/:id", async (req, res) => {
  try {
    const actividades = await prisma.detalle_obra.groupBy({
      by: ["actividad"],
      where: {
        idObra: parseInt(req.params.id),
      },
      _count: {
        actividad: true,
      },
    });

    const actividadesAgrupadas = await Promise.all(
      actividades.map(async (actividad) => {
        const detalleObras = await prisma.detalle_obra.findMany({
          where: {
            idObra: parseInt(req.params.id),
            actividad: actividad.actividad,
          },
          select: {
            actividad: true,
            empleado: {
              select: {
                idEmp: true,
                nombre: true,
              },
            },
            estado: true,
            fechafin: true,
            fechaini: true,
            materiales: {
              select: {
                idMat: true,
                nombre: true,
              },
            },
            idObra: true,
          },
        });

        const empleadosSet = new Set();
        const materialesSet = new Set();

        detalleObras.forEach((detalleObra) => {
          if (detalleObra.empleado) {
            empleadosSet.add(JSON.stringify(detalleObra.empleado));
          }

          if (detalleObra.materiales) {
            materialesSet.add(JSON.stringify(detalleObra.materiales));
          }
        });

        const empleadosAsociados = Array.from(empleadosSet).map((str) => JSON.parse(str));
        const materialesAsociados = Array.from(materialesSet).map((str) => JSON.parse(str));

        const actividadConAsociados = {
          actividad: detalleObras[0]?.actividad,
          fechafin: detalleObras[0]?.fechafin,
          fechaini: detalleObras[0]?.fechaini,
          estado: detalleObras[0]?.estado,
          fechafin: detalleObras[0]?.fechafin,
          empleados: empleadosAsociados,
          materiales: materialesAsociados,
        };

        return actividadConAsociados;
      })
    );

    return res.json(actividadesAgrupadas);
  } catch (error) {

    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/guardarActividad/:id", async (req, res) => {
  try {
    const { actividad, fechaini, fechafin, estado, actividades, antiguo } = req.body;
    const { materiales, empleados } = actividades;

    if (antiguo) {
      // Delete the old activity
      await prisma.detalle_obra.deleteMany({
        where: {
          AND: [
            {
              actividad: req.body.antiguo
            }, {
              idObra: parseInt(req.params.id)
            }
          ]
        }
      });
    }

    // Create the new activity
    const result = await prisma.detalle_obra.create({
      data: {
        actividad: ucfirst(actividad),
        fechaini: fechaini,
        fechafin: fechafin,
        idEmp: null,
        idMat: null,
        estado: estado,
        idObra: parseInt(req.params.id)
      }
    });

    // Create new activity records for the selected materials and employees
    for (const empleado of empleados) {
      for (const material of materiales) {
        await prisma.detalle_obra.create({
          data: {
            actividad: ucfirst(actividad),
            fechaini: fechaini,
            fechafin: fechafin,
            idEmp: parseInt(empleado.value),
            idMat: parseInt(material.value),
            estado: estado,
            idObra: parseInt(req.params.id)
          }
        });
      }
    }

    res.status(200).json(result);
  } catch (error) {
    console.log("message:" + error.message);
  }
});

router.get("/actividadA/:id", async (req, res) => {
  try {
    const { actividad } = req.body
    const agrup = await prisma.detalle_obra.findMany({
      where: {
        AND: [{
          idObra: parseInt(req.params.id)
        }, {
          actividad: { startsWith: actividad }
        }
        ]
      },
    })
    console.log(agrup)



    return res.status(200).json(agrup)
  } catch (error) {
    console.log(error)
  }
})

router.get("/searchActividad/:id", async (req, res) => {
  try {
    const { actividad } = req.body
    const buscar = await prisma.detalle_obra.findMany({
      where: {
        AND:[{
        actividad:{
          contains: actividad
        },
      }, {
        idObra:parseInt(req.params.id)
      }
      
      ]
      }, 
    })
    if (buscar.length > 0) {
      return res.status(200).json(true)
    } else {
      return res.status(200).json(false)
    }
    // return res.json(buscar)

  } catch (error) {

  }
})


export default router
