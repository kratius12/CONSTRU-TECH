import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


const router = Router()

router.get('/provs', async (req, res) => {
    try {
        const proveedores = await prisma.proveedor.findMany({})
        return res.send(proveedores)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})
router.get('/provsAc', async (req, res) => {
    try {
        const proveedores = await prisma.proveedor.findMany({
            where: {
                estado: 1
            }
        })
        return res.send(proveedores)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})
router.get('/prov/:idProv', async (req, res) => {
    try {
        const provFound = await prisma.proveedor.findFirst({
            where: {
                idProv: parseInt(req.params.idProv)
            }
        })
        return res.json(provFound)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
)
router.put('/prov/:idProv', async (req, res) => {
    try {
        const { nombre, direccion, nit, tipo, estado, email, telefono, nombreContacto, telefonoContacto, emailContacto } = req.body

        let updateData = {
            nombre: nombre,
            direccion: direccion,
            nit: nit,
            tipo: tipo,
            estado: parseInt(estado),
            email: email,
            telefono: telefono,
        };

        // Check if the tipo is 'Natural', and exclude contacto details
        if (tipo === 'Natural') {
            updateData = {
                ...updateData,
                nombreContacto: null,
                telefonoContacto: null,
                emailContacto: null,
            };
        } else {
            // If tipo is 'Juridico', include contacto details
            updateData = {
                ...updateData,
                nombreContacto: nombreContacto,
                telefonoContacto: telefonoContacto,
                emailContacto: emailContacto,
            };
        }

        const provFound = await prisma.proveedor.update({
            where: {
                idProv: parseInt(req.params.idProv)
            },
            data: updateData,
        });

        return res.json(provFound);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.delete('/prov/:idProv', async (req, res) => {
    try {
        const result = await prisma.proveedor.delete({
            where: {
                idProv: parseInt(req.params.idProv),
                estado: parseInt(estado)
            }
        })
        return res.json("proveedor eliminado con exito!!")
    } catch (error) {

    }
})


router.post('/newprov', async (req, res) => {
    try {
        const { nit, nombre, direccion, tipo, estado, email, telefono, nombreContacto, telefonoContacto, emailContacto } = req.body;

        const existingProveedor = await prisma.proveedor.findFirst({
            where: {
                nit: nit,
            },
        });

        if (existingProveedor) {
            return res.status(400).json({ message: 'Ya existe un proveedor con este NIT.' });
        }

        let contactoData = {};  // Inicializar el objeto para datos de contacto

        if (tipo === 'Juridico') {
            contactoData = {
                nombreContacto: nombreContacto,
                telefonoContacto: telefonoContacto,
                emailContacto: emailContacto,
            };
        } else if (tipo === 'Natural') {
            contactoData = {
                nombreContacto: null,
                telefonoContacto: null,
                emailContacto: null,
            };
        }

        const newProv = await prisma.proveedor.create({
            data: {
                nombre: nombre,
                direccion: direccion,
                nit: nit,
                tipo: tipo,
                estado: 1,
                email: email,
                telefono: telefono,
                ...contactoData, 
            },
        });

        return res.json(newProv);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


router.put("/proveedorEstado/:id", async (req, res) => {
    try {
        const { estado } = req.body
        const newEstado = await prisma.proveedor.update({
            where: {
                idProv: parseInt(req.params.id)
            }, data: {
                estado: parseInt(estado)
            }
        })
        return res.status(200).json(newEstado)
    } catch (error) {
        console.error(error)
    }
})
router.get('/api/checkNit/:nit', async (req, res) => {
    try {
        const existingProveedor = await prisma.proveedor.findFirst({
            where: {
                nit: req.params.nit,
            },
        });

        return res.json({ exists: !!existingProveedor });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


router.put("/documentoProv", async (req, res) => {
    try {
        const { nit } = req.body
        const prov = await prisma.proveedor.findMany({
            where: {
                nit: nit
            }
        })
        if (prov.length > 0) {
            return res.status(200).json(true)
        } else {
            return res.status(200).json(false)
        }
    } catch (error) {
        console.error(error)
    }
})


export default router
