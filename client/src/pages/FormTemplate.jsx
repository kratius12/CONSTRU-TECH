import { useEffect, useState } from "react";

import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useObras } from "../context/ObrasProvider";

export default function FormTemplate() {
//   const [agreed, setAgreed] = useState(false)

    const {createObra, getObra, updateObra} = useObras()
    const params = useParams()
    const navigate = useNavigate()
    const [obra, setObra] = useState({
        descripcion:"",
        cantidad:"",
        estado:"",
        fechaini:"",
        fechafin:"",
        idCliente:"",
        idEmpl:""
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
                    idCliente:obra.idCliente,
                    idEmpl:obra.idEmpl
                })                
            }
        }
        loadObras()
    })

  return (
    <div className="isolate bg-white px-6 py-12 ">

        <Formik initialValues={obra}
            enableReinitialize={true}
            onSubmit={ async (values) =>{
                if (params.id) {
                   await updateObra(params.id, values)
                   navigate("/obras")
                }else{
                   await createObra(values)
                   navigate("/obras")
                }
                setObra({
                    descripcion:"",
                    cantidad:"",
                    estado:"",
                    fechaini:"",
                    fechafin:"",
                    idCliente:"",
                    idEmpl:""
                })
            }}>
            {({handleChange, handleSubmit, values, isSubmitting}) => (
        <Form onSubmit={handleSubmit} className="mx-auto mt-2 max-w-xl">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-3">
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
              Descripcion
            </label>
            <div className="mt-2.5">
              <textarea
                name="descripcion"
                id="descripcion"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange} value={values.descripcion}
              />
            </div>
          </div>
          <div className="sm:col-span-1">
            <label htmlFor="fechaini" className="block text-sm font-semibold leading-6 text-gray-900">
              Fecha inicio
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="fechaini"
                id="fechaini"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                onChange={handleChange} value={values.fechaini}
              />
            </div>
          </div>
          <div className="sm:col-span-1">
            <label htmlFor="fechafin" className="block text-sm font-semibold leading-6 text-gray-900">
              Fecha fin
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="fechafin"
                id="fechafin"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                onChange={handleChange} value={values.fechaini}
              />
            </div>
          </div>          
          <div className="sm:col-span-1">
            <label htmlFor="cantidad" className="block text-sm font-semibold leading-6 text-gray-900">
              Cantidad
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="cantidad"
                id="cantidad"
                autoComplete="organization"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange} value={values.cantidad}
              />
            </div>
          </div>
            <div className="col-span-2">
              <label htmlFor="idCliente" className="block text-sm font-medium leading-6 text-gray-900">
                Cliente
              </label>
              <div className="mt-2">
                <select
                  id="idCliente"
                  name="idCliente"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={handleChange} value={values.idCliente}
                >
                  <option value={22000}>José Hernandez</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>
            <div className="col-span-2">
              <label htmlFor="idEmpl" className="block text-sm font-medium leading-6 text-gray-900">
                Empleado
              </label>
              <div className="mt-2">
                <select
                  id="idEmpl"
                  name="idEmpl"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={handleChange} value={values.idEmpl}
                >
                  <option value={2000}>Mario Ortiz</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>            
        </div>
        <div className="mt-10">
          <button disabled={isSubmitting}
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {params.id ? "Actualizar": "Guardar"}
          </button>
        </div>
        </Form>
        )}
    </Formik>
    </div>
  )
}
