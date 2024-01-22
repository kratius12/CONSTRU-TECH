import { Router } from "express";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const router = Router()

router.get("/roles", async (req, res) => {
    try {
        const roles = await prisma.rol.findMany({
        })
        return res.send(roles)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})
router.get("/rolesAct", async (req, res) => {
    try {
        const roles = await prisma.rol.findMany({
            where: {
                estado: 1
            }
        })
        return res.send(roles)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

router.get("/rol/:id", async (req, res) => {
    try {
        const rol = await prisma.rol.findUnique({
            where: {
                idRol: parseInt(req.params.id)
            }, include: {
                rolpermisoempleado: {
                    select: {
                        permiso: {
                            select: {
                                permiso: true
                            }
                        }
                    }
                }
            }
        })
        return res.send(rol)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

router.post("/rol", async (req, res) => {
    try {
        const { nombre, permisos } = req.body;
        const rol = await prisma.rol.create({
            data: {
                nombre: nombre,
                estado: 1
            },
        });

        for (var i = 0; i < permisos.length; i++) {
            var elemento = permisos[i];
            if (elemento.hasOwnProperty('value')) {
                var value = elemento.value;
                await prisma.rolpermisoempleado.createMany({
                    data: {
                        idPer: parseInt(value),
                        idRol: parseInt(rol.idRol),
                        idEmp: null
                    }
                });
            } else {
                console.error('El objeto en permisos no tiene la propiedad "value"');
            }
        }
        return res.status(201).send({ message: "Rol creado exitosamente" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.put("/rol/:id", async (req, res) => {
    try {
        const { nombre, estado, permisos } = req.body

        const rol = await prisma.rol.update({
            data: {
                nombre: nombre,
                estado: parseInt(estado)
            },
            where: {
                idRol: parseInt(req.params.id)
            }
        });
        
        const buscar = await prisma.rolpermisoempleado.findMany({
            where: {
                idRol: parseInt(req.params.id)
            }
        })
        const delet = await prisma.rolpermisoempleado.deleteMany({
            where: {
                idRol: parseInt(req.params.id)
            }
        })
            for (var i = 0; i < permisos.length; i++) {
                var elemento = permisos[i];
                if (elemento.hasOwnProperty('value')) {
                    var value = elemento.value;
                    await prisma.rolpermisoempleado.createMany({
                        data: {
                            idPer: parseInt(value),
                            idRol: parseInt(rol.idRol),
                            idEmp: null
                        }
                    });
                } else {
                    console.error('El objeto en permisos no tiene la propiedad "value"');
                }
            }
        return res.status(201).send({ message: "Rol actualizado exitosamente" })
    } catch (error) {

    }
})


router.put("/estadoRol/:id", async (req, res) => {
    try {
        const { estado } = req.body
        const result = await prisma.rol.update({
            where: {
                idRol: parseInt(req.params.id)
            }, data: {
                estado: parseInt(estado)
            }
        })
        if (estado === 0) {
            const empIn = await prisma.rolpermisoempleado.findMany({
                where: {
                    idRol: parseInt(req.params.id),
                    idEmp: { not: null }
                },
                select: {
                    idEmp: true,
                    idRol: true
                }
            })
            const inactivarEmpleado = await prisma.empleado.updateMany({
                where: {
                    idEmp: empIn.idEmp
                }, data: {
                    estado: 0
                }
            })
        }
    } catch (error) {
        console.error(error)
    }
})

export default router