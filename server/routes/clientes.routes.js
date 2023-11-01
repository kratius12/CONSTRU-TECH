import {Router} from "express";
import {pool} from "../db.js";
import {
    getClientes,
    getCliente,
    createCliente,
    updateCliente,
    deleteCliente
} from "../controllers/clientes.controller.js"

const router = Router()

router.get("/clientes", getClientes)

router.get("/cliente/:id", getCliente)

router.post("/clientes", createCliente)

router.put("/cliente/:id", updateCliente)

router.delete("/cliente/:id", deleteCliente)

router.get('/clientNew', (req,res) => {
    res.render('addCliente');
});

router.get('/clientEdit/:id', async (req,res) => {
    try {
        const [result] = await pool.query("SELECT * FROM cliente WHERE idCli = ?", [req.params.id])
        if (result.length === 0) {
            console.log("Error")
            const [clientes] = await pool.query('SELECT *FROM cliente ORDER BY idCli DESC')
            res.render('clientes', {message:{type:0,content:`No se encontro cliente con id: ${req.params.id}`}, result: clientes})
        } else {
            console.log(result)
            res.render('editCliente', {result});
        }
        // console.log(result)
        // res.render('editCliente', {result});        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

});

router.get("/clientsList", async (req,res) =>{
    try {
        const [result] = await pool.query('SELECT *FROM cliente ORDER BY idCli DESC')
        // console.log(result)
        res.render("clientes", {result: result,message:{type:2}})        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }   
})

router.post("/clientsList", async (req,res) =>{
    try {
        const {nombre, estado, fecha_nac_desde, fecha_nac_hasta} = req.body
        const [result] = await pool.query("SELECT * FROM cliente WHERE nombre LIKE ? AND estado = ? OR fecha_nac BETWEEN ? AND ?", ["%"+nombre+"%", estado, fecha_nac_desde, fecha_nac_hasta])
        //console.log(result)
        res.render("clientes", {result: result,message:{type:2}})                
    } catch (error) {
        console.log(error)
    }
})

router.post("/clientNew", async (req,res) =>{
    try {
        const {nombre, email, direccion, telefono, cedula, fecha_nac, estado} = req.body
        const [result] = await pool.query('INSERT INTO cliente SET nombre = ?, email = ?, direccion = ?, telefono = ?, cedula = ?, fecha_nac = ?, estado = ?',[nombre, email, direccion, telefono, cedula, fecha_nac, estado])
        const [clientes] = await pool.query('SELECT *FROM cliente ORDER BY idCli DESC')        
        if (result.insertId) {
            res.render("clientes", {result:clientes,message:{type:1,content:`Cliente agregado con exito!`}});
            console.log(
                {
                    id:"Id insertado:"+result.insertId,
                    nombre, 
                    email, 
                    direccion, 
                    telefono, 
                    cedula, 
                    fecha_nac, 
                    estado
                }
            )            
        } else {
            res.render("clientes", {message:`Error al intentar agregar cliente!`});
        }
    } catch (error) {
        return res.status(500).json({message: error.message})        
    }
})

router.post("/clientEdit", async (req,res) =>{
    try {
        const {idCli, nombre, email, direccion, telefono, cedula, fecha_nac, estado} = req.body
        const [result] = await pool.query('UPDATE cliente SET nombre = ?, email = ?, direccion = ?, telefono = ?, cedula = ?, fecha_nac = ?, estado = ? WHERE idCli = ?',[nombre, email, direccion, telefono, cedula, fecha_nac, estado, idCli])
        // console.log(result.affectedRows > 0)
        if (result.affectedRows > 0) {
            const [clientes] = await pool.query('SELECT *FROM cliente ORDER BY idCli DESC')                    
            res.render("clientes", {result:clientes,message:{type:1,content:`Cliente editado con exito! id afectado: ${result.insertId}`}});          
        } else {
            res.render("clientes", {result:clientes,message:{type:1,content:`Error al intentar editar cliente: ${result.insertId}`}});
        }
    } catch (error) {
        return res.status(500).json({message: error.message})        
    }
})

router.post('/clientStatus', async (req,res) =>{
    try {
        let message = '';
        const {idCli,estado} = req.body
        const [result] = await pool.query('UPDATE cliente SET estado = ? WHERE idCli = ?',[estado, idCli])     
        if (result.affectedRows > 0) { 
            return message = "Success"
        }else{
            return message = "Error"
        }
    } catch (error) {
        return res.status(500).json({message: error.message})        
    }
})

router.post('/formtest', (req,res) =>{
    console.log(req.body)
})

 export default router