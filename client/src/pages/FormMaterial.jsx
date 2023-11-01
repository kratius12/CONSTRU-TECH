import { useEffect, useState } from "react";

import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useMateriales } from "../context/MaterialesProvider";

export default function FormTemplate() {
//   const [agreed, setAgreed] = useState(false)

    const {createMaterial, getMaterial, updateMaterial} = useMateriales()
    const params = useParams()
    const navigate = useNavigate()
    const [material, setMaterial] = useState({
        nombre:"",
        idProveedor:"",
        estado:"",
        precio:"",
        cantidad:"",
        idCategoria:""
    })
    
    const inputFechafinDisabled = {
        display: "none"
    }
    const inputFechafinEnabled ={
        color:"red"
    }
    useEffect(() =>{
        const loadMateriales = async () => {
            if (params.id) {
                const material = await getMaterial(params.id)
                setMaterial({
                    nombre:material.nombre,
                    idProveedor:material.idProveedor,
                    estado:material.estado,
                    precio:material.precio,
                    cantidad:material.cantidad,
                    idCategoria:material.idCategoria
                })                
            }
        }
        loadMateriales()
    })

  return (
    <div className="isolate bg-white px-6 py-12 ">

        <Formik initialValues={material}
            enableReinitialize={true}
            onSubmit={ async (values) =>{
                if (params.id) {
                   await updateMaterial(params.id, values)
                   navigate("/materiales")
                }else{
                   await createMaterial(values)
                   navigate("/materiales")
                }
                setMaterial({
                  nombre:"",
                  idProveedor:"",
                  estado:"",
                  precio:"",
                  cantidad:"",
                  idCategoria:""
                })
            }}>
            {({handleChange, handleSubmit, values, isSubmitting}) => (
        <Form onSubmit={handleSubmit} className="mx-auto mt-2 max-w-xl">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-3">
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
              Nombre
            </label>
            <div className="mt-2.5">
              <textarea
                name="nombre"
                id="nombre"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange} value={values.nombre}
              />
            </div>
          </div>
          <div className="sm:col-span-1">
            <label htmlFor="precio" className="block text-sm font-semibold leading-6 text-gray-900">
              Precio
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="precio"
                id="precio"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                onChange={handleChange} value={values.precio}
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
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                onChange={handleChange} value={values.cantidad}
              />
            </div>
          </div>          
            <div className="col-span-2">
              <label htmlFor="idCategoria" className="block text-sm font-medium leading-6 text-gray-900">
                Categoria
              </label>
              <div className="mt-2">
                <select
                  id="idCategoria"
                  name="idCategoria"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={handleChange} value={values.idCategoria}
                >
                  <option value={6000}>Ceramica</option>
                </select>
              </div>
            </div>
            <div className="col-span-2">
              <label htmlFor="estado" className="block text-sm font-medium leading-6 text-gray-900">
                Estado
              </label>
              <div className="mt-2">
                <select
                  id="estado"
                  name="estado"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={handleChange} value={values.estado}
                >
                  <option value={1}>Activo</option>
                  <option value={0}>Inactivo</option>
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
