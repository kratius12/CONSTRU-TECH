import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useObras } from "../context/ObrasProvider";
function ObrasForm() {

    const {createObra, getObra, updateObra} = useObras()
    const params = useParams()
    const navigate = useNavigate()
    const [obra, setObra] = useState({
        descripcion:"",
        cantidad:"",
        estado:"",
        fechaini:"",
        fechafin:"",
        cliente:"",
        empleado:""
    })
    
    const inputFechafinDisabled = {
        display: "none"
    }
    const inputFechafinEnabled ={
        color:"red"
    }
    useEffect(() =>{
        const loadObras = async () => {
            if (params.id) {
                const obra = await getObra(params.id)
                setObra({
                    descripcion:obra.descripcion,
                    cantidad:obra.cantidad,
                    estado:obra.estado,
                    fechaini:obra.fechaini,
                    fechafin:obra.fechafin,
                    cliente:obra.idCliente,
                    empleado:obra.idEmpl
                })                
            }
        }
        loadObras()
    }, [params.id])

    return(
        <div className="">
            <Formik initialValues={obra}
            enableReinitialize={true}
            onSubmit={ async (values) =>{
                console.log(values)
                if (params.id) {
                   await updateObra(params.id, values)
                   navigate("/")
                }else{
                   await createObra(values)
                   navigate("/")
                }
                setObra({
                    descripcion:"",
                    cantidad:"",
                    estado:"",
                    fechaini:"",
                    fechafin:"",
                    cliente:"",
                    empleado:""
                })
            }}>
                {({handleChange, handleSubmit, values, isSubmitting}) => (
                <Form onSubmit={handleSubmit} className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-5">
                    <h1 className="text-xl font-bold uppercase text-center m-5">{params.id ? "Actualizar obra" :"Agregar obra"}</h1>                    
                    <label className="block">Obra Descripcion</label>
                    <input className="px-2 py-1 rounded-sm w-full"  name="descripcion" id="descripcion" type="text" placeholder="Descripcion de la obra" onChange={handleChange} value={values.descripcion} />

                    <label className="block">Cliente</label>
                    <input className="px-2 py-1 rounded-sm w-full" name="cliente" id="cliente" type="text" placeholder="Cliente" onChange={handleChange} value={values.cliente} />

                    <label className="block">Empleado</label>
                    <input className="px-2 py-1 rounded-sm w-full" name="empleado" id="empleado" type="text" placeholder="Empleado" onChange={handleChange} value={values.empleado} />                    

                    <label className="block">Cantidad consumo material</label>
                    <input className="px-2 py-1 rounded-sm w-full" name="cantidad" id="cantidad" type="text" placeholder="Cantidad consumo de materiales" onChange={handleChange} value={values.cantidad} />

                    <label className="block">Estado de la obra</label>
                    <input className="px-2 py-1 rounded-sm w-full" name="estado" id="estado" type="text" placeholder="Estado de obra" onChange={handleChange} value={values.estado} />       

                    <label className="block">Fecha de inicio</label>
                    <input className="px-2 py-1 rounded-sm w-full" name="fechaini" id="fechaini" type="text" placeholder="Fecha de inicio de obra" onChange={handleChange} value={values.fechaini} />
                    

                        <label className="block" style={params.id ? inputFechafinDisabled:inputFechafinEnabled}>Fecha fin</label>
                        <input className="px-2 py-1 rounded-sm w-full" style={params.id ? inputFechafinDisabled:inputFechafinEnabled} name="fechafin" id="fechafin" type="text" placeholder="Fecha de finalizacion de obra" onChange={handleChange} value={values.fechafin} />

                    <button type="submit" disabled={isSubmitting} className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md mt-3">
                        {params.id ? "Actualizar": "Guardar"}
                    </button>               
                </Form>
                )}
            </Formik>
        </div>
    )
}

export default ObrasForm