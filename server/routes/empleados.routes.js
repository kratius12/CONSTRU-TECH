import { Router, json } from "express";
import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const router = Router()

router.get("/empleados", async (req, res) => {
    try {
        const result = await prisma.empleado.findMany({
            include: {
                rolpermisoempleado: {
                    distinct: ["idRol"],
                    select: {
                        rol: {
                            select: {
                                idRol: true,
                                nombre: true
                            }
                        }
                    },
                }
            }
        })
        res.status(200).json(result)

    } catch (error) {
        console.log(json({ message: error.message }));
        return res.status(500).json({ message: error.message })
    }
})

router.get("/empleado/:id", async (req, res) => {
    try {
        const result = await prisma.empleado.findFirst({
            where: {
                idEmp: parseInt(req.params.id)
            },
            include: {
                empleado_especialidad: {
                    select: {
                        id: true,
                        especialidad: true
                    }
                },
                rolpermisoempleado: {
                    distinct: ["idRol"],
                    select: {
                        rol: {
                            select: {
                                idRol: true,
                                nombre: true
                            }
                        }
                    },
                }

            }
        })
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
})

const generarHash = async (password, saltRounds = 10) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return { hash, salt };
};

router.post("/empleados", async (req, res) => {
    try {
        const { nombre, apellidos, direccion, estado, telefono, tipoDoc, cedula, especialidad, email, contrasena, rol } = req.body;
        const { hash, salt } = await generarHash(contrasena);
        const result = await prisma.empleado.create({
            data: {
                nombre: nombre,

                apellidos: apellidos,
                direccion: direccion,
                telefono: telefono,
                tipoDoc: tipoDoc,
                cedula: cedula,
                estado: parseInt(estado),
                email: email,
                contrasena: hash, // Almacenar el hash en lugar de la contraseña original
                salt: salt
            },
        });

        // Almacenar las especialidades

        await Promise.all(especialidad.map(async (idEsp) => {
            await prisma.empleado_especialidad.create({
                data: {
                    idEmp: parseInt(result.idEmp),
                    idEsp: parseInt(idEsp.value)
                }
            });
        }));
        const role = await prisma.rolpermisoempleado.findMany({
            where: {
                idRol: parseInt(rol.value),
                idEmp: null
            }
        })
        for (const rols of role) {
            const nuevo = await prisma.rolpermisoempleado.create({
                data: {
                    idEmp: result.idEmp,
                    idPer: rols.idPer,
                    idRol: rols.idRol
                }
            })
        }
        res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.put("/empleado/:id", async (req, res) => {
    try {
        const { nombre, apellidos, direccion, estado, telefono, tipoDoc, cedula, especialidad, email, contrasena, rol } = req.body
        const { hash, salt } = await generarHash(contrasena);
        const result = await prisma.empleado.update({
            where: {
                idEmp: parseInt(req.params.id)
            },
            data: {
                nombre: nombre,

                apellidos: apellidos,
                direccion: direccion,
                telefono: telefono,
                tipoDoc: tipoDoc,
                cedula: cedula,
                estado: parseInt(estado),
                email: email,
                contrasena: hash,
                salt: salt

            }
        })
        if (especialidad.length>0) {
            const result2 = await prisma.empleado_especialidad.deleteMany({
                where: {
                    idEmp: parseInt(req.params.id)
                }
            })
            await Promise.all(especialidad.map(async (idEsp) => {
                await prisma.empleado_especialidad.create({
                    data: {
                        idEmp: parseInt(req.params.id),
                        idEsp: parseInt(idEsp.value)
                    }
                })
            }))
        } else {
            console.log("Ha ocurrido un error...");
        }
        const upRol = await prisma.rolpermisoempleado.updateMany({
            where:{
                idEmp:parseInt(req.params.id)
            },data:{
                idRol:rol.value
            }
        })
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
})
router.delete("/empleado/:id", async (req, res) => {
    try {
        const result = await prisma.empleado.delete({
            where: {
                idEmp: parseInt(req.params.id)
            }
        })
        res.status(200).json(result)
        console.log(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
})

router.get("/empleadosEsp", async (req, res) => {
    try {
        const result = await prisma.empleado.findMany({

            select: {
                idEmp: true,
                nombre: true,
                telefono: true,
                cedula: true,
                estado: true,
                empleado_especialidad: {
                    select: {
                        especialidad: true
                    }
                }
            }
        })
        return res.status(200).json(result)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

router.put("/empleadoStatus/:id", async (req, res) => {
    try {
        const { status } = req.body

        const searchRol = await prisma.rolpermisoempleado.findFirst({
            where:{
                idEmp: parseInt(req.params.id)
            },select:{
                rol:{
                    select:{
                        idRol:true
                    }
                }
            }
        })
        if(status===1){
            const validarRol = await prisma.rol.findUnique({
                where:{
                    idRol:searchRol.rol.idRol
                }
            })
            if(validarRol.estado==1){
                const actualizarEstado = await prisma.empleado.update({
                    where:{
                        idEmp:parseInt(req.params.id)
                    },data:{
                        estado:parseInt(status)
                    }
                })
                return res.status(200).json({message:"Cambio de estado exitoso!!"})
            }else if(validarRol.estado==0){
                return res.status(404).json({message:"No se puede cambiar el estado del empleado puesto que el rol asociado está inactivo"})
            }
        }else if(status===0){
            const actualizarEstado = await prisma.empleado.update({
                where:{
                    idEmp:parseInt(req.params.id)
                },data:{
                    estado:parseInt(status)
                }
            })
            return res.status(200).json({message:"Cambio de estado exitoso!!"})
        }

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

router.put("/empleados/searchDoc", async (req, res) => {
    try {
        const { cedula, tipoDoc } = req.body
        const result = await prisma.empleado.findMany({
            where: {
                AND: [
                    {
                        cedula: cedula
                    }, {
                        tipoDoc: tipoDoc
                    }
                ]
            }
        })
        if (result.length > 0) {
            return res.status(200).json(true)
        } else {
            return res.status(200).json(false)
        }
    } catch (error) {
        console.log(json({ message: error.message }));
        return res.status(500).json({ message: error.message })
    }
})

router.get("/rolesEmpleado/:id", async (req, res) => {
    try {
        const rol = await prisma.rolpermisoempleado.findFirst({
            where: {
                idEmp: parseInt(req.params.id)
            },
            select: {
                rol: {
                    select: {
                        nombre: true
                    }
                }
            }
        })
        return res.status(200).json(rol)
    } catch (error) {

    }
})

export default router