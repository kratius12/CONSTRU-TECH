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
        descripcion: descripcion,
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
        descripcion: descripcion,
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
      by: ["actividad", "fechaini", "fechafin", "estado", "idObra"],
      where: {
        idObra: parseInt(req.params.id),
      },
    });

    const empleadosUnicos = await prisma.detalle_obra
      .findMany({
        where: {
          idObra: parseInt(req.params.id),
          NOT: {
            idEmp: null,
          },
        },
        distinct: ["idEmp"],
        include: {
          empleado: {
            select: {
              nombre: true
            }
          }
        }
      });

    const materialesUnicos = await prisma.detalle_obra
      .findMany({
        where: {
          idObra: parseInt(req.params.id),
          NOT: {
            idMat: null,
          },
        },
        distinct: ["idMat"],
        include: {
          materiales: {
            select: {
              nombre: true
            }
          }
        }
      });

    const actividadesConEmpleadosMaterialesUnicos = actividades.map((act) => {
      const empleadosAsociados = empleadosUnicos
        .filter((emp) => emp.idObra === act.idObra)
        .map((emp) => emp.empleado);

      const materialesAsociados = materialesUnicos
        .filter((mat) => mat.idObra === act.idObra)
        .map((mat) => mat.materiales);

      return {
        ...act,
        empleados: empleadosAsociados,
        materiales: materialesAsociados,
      };
    });

    return res.json(actividadesConEmpleadosMaterialesUnicos);
  } catch (error) {
    console.error("Error fetching actividades:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});



router.post("/guardarActividad/:id", async (req, res) => {
  try {
    // console.log(req.body)

    const { actividad, fechaini, fechafin, estado, actividades, antiguo } = req.body;
    if (antiguo) {
      const deleteAct = await prisma.detalle_obra.deleteMany({
        where: {
          AND: [
            {
              actividad: req.body.antiguo
            }, {
              idObra: parseInt(req.params.id)
            }
          ]
        }
      })
    }
    const result = await prisma.detalle_obra.create({
      data: {
        actividad: actividad,
        fechaini: fechaini,
        fechafin: fechafin,
        idEmp: null,
        idMat: null,
        estado: estado,
        idObra: parseInt(req.params.id)
      }
    })
    const { materiales, empleados } = actividades
    for (const empleado of empleados) {
      for (const material of materiales) {
        const materialesa = await prisma.detalle_obra.createMany({
          data: {
            actividad: actividad,
            fechaini: fechaini,
            fechafin: fechafin,
            idEmp: parseInt(empleado.value),
            idMat: parseInt(material.value),
            estado: estado,
            idObra: parseInt(req.params.id)
          }
        })
      }
    }
    res.status(200).json(materiales);
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

router.put("/searchActividad/:id", async (req,res)=>{
  try {
    const {actividad} = req.body
    const buscar = await prisma.detalle_obra.findMany({
      where:{
        actividad: req.body.actividad,
        NOT:{
          idObra: parseInt(req.params.id)
        }
      }
    })
    if(buscar.length>0){
      return res.status(200).json(true)
    }else{
      return res.status(200).json(false)
    }

  } catch (error) {
    
  }
})


export default router
