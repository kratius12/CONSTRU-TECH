import { useEffect, useState } from "react";
import  Select  from "react-select";
import makeAnimated from 'react-select/animated';
import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useEmpleados } from "../context/EmpleadosProvider";
import * as Yup from 'yup';

const EmpleadoSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(3, 'El nombre debe contener al menos 3 caracteres')
    .max(50, 'El nombre no puede contener mas de 50 caracteres')
    .required('El nombre es requerido'),
  tipoDoc: Yup.string()
    .required('Tipo de documento es requerido'),
  email: Yup.string().email('Formato de correo electronico invalido').required('Correo electronico requerido'),
  cedula: Yup.string()
  .min(8, 'La cedula debe contener al menos 8 caracteres')
  .max(20, 'La cedula no puede contener mas de 20 caracteres')
  .required('La cedula es requerida'),
  telefono: Yup.string()
  .min(7, 'El telefono debe contener al menos 7 caracteres')
  .max(12, 'El telefono no puede contener mas de 12 caracteres')
  .required('El telefono es requerido'),
  direccion: Yup.string()
  .min(5, 'La direccion debe contener al menos 5 caracteres')
  .max(50, 'La direccion no puede contener mas de 50 caracteres')
  .required('La direccion es requerida'),
  estado: Yup.string()
  .required('El estado es requerido')
});

const animatedComponents = makeAnimated();


export default function EmpleadosForm() {
//   const [agreed, setAgreed] = useState(false)
    const {createEmpleado, getEmpleado, updateEmpleado, especialidades, Especialidades} = useEmpleados()
    useEffect(() =>{
      Especialidades()  
      }, [])

    const options = especialidades.map(item => ({value:item.id, label:item.especialidad}))
    const [selectedOption, setSelectedOption] = useState("");

    const handleClick = (selected) => {
      setSelectedOption(selected.value);
      console.log(selectedOption);
    };
    const alertConfirm = (type) => {
      var message =""
      if (type == "update") {
        message = "Actualizado"
      }else{
        message = "Agregado"
      }
      $.confirm({
        title:`Empleado `+message+` con exito!`,
        content:"Redirecionando a listado de empleados...",
        icon: 'fa fa-check',
        theme: 'modern',
        closeIcon: true,
        animation: 'news',
        closeAnimation: 'news',
        type: 'green',
        columnClass:'col-md-6 col-md-offset-3',
        autoClose: 'okay|4000',
        buttons: {
            okay: function () {
            },
        }            
    })
    }
    const params = useParams()
    const navigate = useNavigate()
    const [empleado, setEmpleado] = useState({
        nombre:"",
        direccion:"",
        estado:"",
        email:"",
        telefono:"",
        tipoDoc:"",
        cedula:"",
        especialidad:""
    })
    
    useEffect(() =>{
        const loadEmpleados = async () => {
            if (params.id) {
                const empleado = await getEmpleado(params.id)
                setEmpleado({
                    nombre:empleado.nombre,
                    direccion:empleado.direccion,
                    estado:empleado.estado,
                    email:empleado.email,
                    telefono:empleado.telefono,
                    tipoDoc:empleado.tipoDoc,
                    cedula:empleado.cedula
                })                
            }
        }
        loadEmpleados()
    }, [getEmpleado, params.id])

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Formik initialValues={empleado}
          enableReinitialize={true}
          validationSchema={EmpleadoSchema}
          onSubmit={ async (values) => {
            console.log(values);
            if (params.id) {
              await updateEmpleado(params.id, values)
              alertConfirm()
              setTimeout(
                navigate("/empleados"),
                5000
              )
            } else {
              await createEmpleado(values)
              alertConfirm()
              setTimeout(
                navigate("/empleados"),
                5000
              )
            }
              setEmpleado({
                  nombre:"",
                  direccion:"",
                  estado:"",
                  email:"",
                  telefono:"",
                  tipoDoc:"",
                  cedula:""
              })
          }}
          >
            {({handleChange, handleSubmit, values, isSubmitting, errors, touched}) =>(
              <Form onSubmit={handleSubmit}>
                <div className="card text-center w-100">
                  <div className="card-header bg-primary text-white">
                    <h2>{params.id ? "Editar": "Agregar"} empleado</h2>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6 mt-3">
                        <label htmlFor="nombre" className="form-label">Nombres <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="nombre" onChange={handleChange} value={values.nombre} />
                          {errors.nombre && touched.nombre ? (
                          <div className="alert alert-danger" role="alert">{errors.nombre}</div>
                          ) : null}                        
                      </div>
                      <div className="col-6 mt-3">
                        <label htmlFor="tipoDoc" className="form-label">Tipo documento<span className="text-danger">*</span></label>
                        <select id="tipoDoc" className="form-select" onChange={handleChange} value={values.tipoDoc}>
                          <option value="">Seleccione tipo documento</option>
                          <option value="CC">Cedula de ciudadania</option>
                          <option value="CE">Cedula de extranjeria</option>
                          <option value="PS">Pasaporte</option>
                        </select>
                        {errors.tipoDoc && touched.tipoDoc ? (
                          <div className="alert alert-danger" role="alert">{errors.tipoDoc}</div>
                          ) : null}                         
                      </div>
                      <div className="col-6 mt-3">
                        <label htmlFor="cedula" className="form-label">Numero documento <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="cedula"  onChange={handleChange} value={values.cedula}/>
                        {errors.cedula && touched.cedula ? (
                          <div className="alert alert-danger" role="alert">{errors.cedula}</div>
                          ) : null} 
                      </div>
                      <div className="col-6 mt-3">
                        <label htmlFor="email" className="form-label">Correo electronico <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="email" onChange={handleChange} value={values.email} />
                        {errors.email && touched.email ? (
                          <div className="alert alert-danger" role="alert">{errors.email}</div>
                          ) : null} 
                      </div>
                      <div className="col-6 mt-3">
                        <label htmlFor="telefono" className="form-label">Telefono <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="telefono" onChange={handleChange} value={values.telefono} />
                        {errors.telefono && touched.telefono ? (
                          <div className="alert alert-danger" role="alert">{errors.telefono}</div>
                          ) : null} 
                      </div>
                      <div className="col-6 mt-3">
                        <label htmlFor="direccion" className="form-label">Direccion <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="direccion" onChange={handleChange} value={values.direccion} />
                        {errors.direccion && touched.direccion ? (
                          <div className="alert alert-danger" role="alert">{errors.direccion}</div>
                          ) : null} 
                      </div>
                      <div className="col-6 mt-3">
                        <label htmlFor="especialidad" className="form-label">Especialidad <span className="text-danger">*</span></label>
                        <Select
                        onChange={handleClick}

                        closeMenuOnSelect={false}
                        isMulti
                        components={animatedComponents} 
                        options={options} />
                      </div>
                      <div className="col-6 mt-3">
                        <label htmlFor="estado" className="form-label">Estado <span className="text-danger">*</span></label>
                        <select id="estado" className="form-select" onChange={handleChange} value={values.estado} >
                          <option value="">Seleccione estado</option>
                          <option value="1">Activo</option>
                          <option value="0">Inactivo</option>
                        </select>
                        {errors.estado && touched.estado ? (
                          <div className="alert alert-danger" role="alert">{errors.estado}</div>
                          ) : null}                         
                      </div>
                    </div>
                  </div>
                  <div className="card-footer text-center">
                    <div className="row">
                      <div className="col-md-6">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary w-50">
                          <h4>{params.id ? "Editar": "Agregar"}</h4>
                        </button>
                      </div>
                      <div className="col-md-6">
                      <a type="button" href="" className="btn btn-danger w-50" onClick={()=> navigate(`/empleados`)}>
                        <h4>Cancelar</h4>
                      </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )} 
          </Formik>
        </div>
      </div>
    </div>
    // <div className="isolate bg-white px-6 py-12 ">

    //     <Formik initialValues={empleado}
    //         enableReinitialize={true}
    //         onSubmit={ async (values) =>{
    //             if (params.id) {
    //                await updateEmpleado(params.id, values)
    //                navigate("/empleados")
    //             }else{

    //                await createEmpleado(values)
    //                navigate("/empleados")
    //             }
    //             setEmpleado({
    //               nombre:"",
    //               direccion:"",
    //               estado:"",
    //               email:"",
    //               telefono:"",
    //               tipoDoc:"",
    //               cedula:""
    //             })
    //         }}>
        //     {({handleChange, handleSubmit, values, isSubmitting}) => (
        // <Form onSubmit={handleSubmit} className="mx-auto mt-2 max-w-xl">
        // <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-1">
        //   <div className="col-span-1">
        //     <label htmlFor="nombre" className="block text-sm font-semibold leading-6 text-gray-900">
        //       Nombres
        //     </label>
        //     <div className="mt-2.5">
        //     <input
        //         type="text"
        //         name="nombre"
        //         id="nombre"
        //         autoComplete="family-name"
        //         className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
        //         onChange={handleChange} value={values.nombre}
        //       />
        //     </div>
        //   </div>
        //   <div className="col-span-1">
        //     <label htmlFor="direccion" className="block text-sm font-semibold leading-6 text-gray-900">
        //       Direccion
        //     </label>
        //     <div className="mt-2.5">
        //       <input
        //         type="text"
        //         name="direccion"
        //         id="direccion"
        //         autoComplete="family-name"
        //         className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
        //         onChange={handleChange} value={values.direccion}
        //       />
        //     </div>
        //   </div>
        //   <div className="col-span-1">
        //     <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
        //       Email
        //     </label>
        //     <div className="mt-2.5">
        //       <input
        //         type="text"
        //         name="email"
        //         id="email"
        //         autoComplete="family-name"
        //         className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
        //         onChange={handleChange} value={values.email}
        //       />
        //     </div>
        //   </div>          
        //   <div className="col-span-1">
        //     <label htmlFor="telefono" className="block text-sm font-semibold leading-6 text-gray-900">
        //       Telefono
        //     </label>
        //     <div className="mt-2.5">
        //       <input
        //         type="text"
        //         name="telefono"
        //         id="telefono"
        //         autoComplete="organization"
        //         className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        //         onChange={handleChange} value={values.telefono}
        //       />
        //     </div>
        //   </div>
        //   <div className="col-span-1">
        //     <label htmlFor="cedula" className="block text-sm font-semibold leading-6 text-gray-900">
        //       Cedula
        //     </label>
        //     <div className="mt-2.5">
        //       <input
        //         type="text"
        //         name="cedula"
        //         id="cedula"
        //         autoComplete="organization"
        //         className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        //         onChange={handleChange} value={values.cedula}
        //       />
        //     </div>
        //   </div>
        //   <div className="col-span-1">
        //       <label htmlFor="tipoDoc" className="block text-sm font-medium leading-6 text-gray-900">
        //         Tipo documento
        //       </label>
        //       <div className="mt-2">
        //         <select
        //           id="tipoDoc"
        //           name="tipoDoc"
        //           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        //           onChange={handleChange} value={values.tipoDoc}
        //         >
        //           <option value="">Seleccione tipo cedula</option>
        //           <option value="CC">Cedula ciudadania</option>
        //           <option value="CE">Cedula extranjeria</option>
        //         </select>
        //       </div>
        //     </div>            
        //     <div className="col-span-1">
        //       <label htmlFor="estado" className="block text-sm font-medium leading-6 text-gray-900">
        //         Estado
        //       </label>
        //       <div className="mt-2">
        //         <select
        //           id="estado"
        //           name="estado"
        //           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        //           onChange={handleChange} value={values.estado}
        //         >
        //           <option value="">Seleccione estado</option>
        //           <option value={1}>Activo</option>
        //           <option value={0}>Inactivo</option>
        //         </select>
        //       </div>
        //     </div>            
        // </div>
        // <div className="mt-10">
        //   <button disabled={isSubmitting}
        //     type="submit"
        //     className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        //   >
        //     {params.id ? "Actualizar": "Guardar"}
        //   </button>
        // </div>
        // </Form>
        // )}
    // </Formik>
    // </div>
  )
}
