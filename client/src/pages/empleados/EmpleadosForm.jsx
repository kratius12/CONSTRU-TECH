import { useEffect, useState } from "react";
import Select from "react-select";
// import makeAnimated from 'react-select/animated';
import { Form, Formik, Field } from "formik";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEmpleados } from "../../context/empleados/EmpleadosProvider";
import EmpleadoSchema from "../../components/ValidatorEmpleado";


export default function EmpleadosForm() {

  const { createEmpleado, getEmpleado, updateEmpleado, especialidades, Especialidades, searchDoc } = useEmpleados()
  const params = useParams()
  const navigate = useNavigate()
  const [key, setKey] = useState(0)
  const [options, setOptions] = useState([]);
  const [defaultOptions, setDefaultOptions] = useState([]);
  const [selectedEsp, setSelectedEsp] = useState(defaultOptions)
  const initialState = {
    nombre: "",
    apellido: "",
    direccion: "",
    estado: 1,
    telefono: "",
    tipoDoc: "",
    cedula: "",
    especialidad: []
  }
  const [empleado, setEmpleado] = useState(initialState)
  const estadoOptions = [
    {
      value: 1, label: "Activo",
    }, {
      value: 0, label: "Inactivo"
    }
  ]
  useEffect(() => {
    const loadEmpleados = async () => {
      if (params.id) {
        const empleado = await getEmpleado(params.id)
        if (empleado) {
          setEmpleado({
            nombre: empleado.nombre,
            apellido: empleado.apellido,
            direccion: empleado.direccion,
            estado: empleado.estado === "0" ? "0" : "1",
            email: empleado.email,
            telefono: empleado.telefono,
            tipoDoc: empleado.tipoDoc,
            cedula: empleado.cedula,
            especialidad: empleado.empleado_especialidad
          })
          const defaultOpts = empleado.empleado_especialidad.map(item => ({ value: item.especialidad.id, label: item.especialidad.especialidad }))
          setDefaultOptions(defaultOpts)
          setKey(prevKey => prevKey + 1)
        }
      }else{
        setEmpleado(initialState)
      }
    }
    const fetchData = async () => {
      const especialidadesData = await Especialidades()
      const opciones = especialidadesData.map(item => ({ value: item.id, label: item.especialidad }))
      setOptions(opciones)
    }
    fetchData()
    loadEmpleados()
  }, [])

  const alertConfirm = (type) => {
    var message = ""
    if (type == "update") {
      message = "Actualizado"
    } else {
      message = "Agregado"
    }
    $.confirm({
      title: `Empleado ` + message + ` con exito!`,
      content: "Redirecionando a listado de empleados...",
      icon: 'fa fa-check',
      theme: 'modern',
      closeIcon: true,
      animation: 'zoom',
      closeAnimation: 'scale',
      animationSpeed: 500,
      type: 'green',
      columnClass: 'col-md-6 col-md-offset-3',
      autoClose: 'okay|4000',
      buttons: {
        okay: function () {
        },
      }
    })
  }


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Formik initialValues={empleado}
            enableReinitialize={true}
            validationSchema={EmpleadoSchema}
            validateOnChange={true}
            onSubmit={async (values) => {
              console.log(values);
              const empleadoObject = {
                ...values,
                especialidad: selectedEsp
              }
              const validateDoc = await searchDoc(empleadoObject)
              if (validateDoc === true) {
                $.confirm({
                  title: `Error`,
                  content: `El tipo documento: `+values.tipoDoc+` y numero documento: `+values.cedula+` ya existe, por favor ingrese uno diferente`,
                  icon: 'fa fa-circle-xmark',
                  theme: 'modern',
                  closeIcon: true,
                  animation: 'zoom',
                  closeAnimation: 'scale',
                  animationSpeed: 500,
                  type: 'red',
                  columnClass: 'col-md-6 col-md-offset-3',
                  buttons: {
                    Cerrar: function () {
                    },
                  }
                })                
              }else{
                if (params.id) {
                  await updateEmpleado(params.id, empleadoObject)
                  alertConfirm('update')
                  setTimeout(
                    navigate("/empleados"),
                    5000
                  )
                } else {
                  await createEmpleado(empleadoObject)
                  alertConfirm()
                  setTimeout(
                    navigate("/empleados"),
                    5000
                  )
                }
              }
              // setEmpleado({
              //   nombre: "",
              //   apellido: "",
              //   direccion: "",
              //   estado: "",
              //   email: "",
              //   telefono: "",
              //   tipoDoc: "",
              //   cedula: "",
              //   especialidad: []
              // })
            }}
          >
            {({ handleChange, handleSubmit, values, isSubmitting, errors, touched }) => (
              <Form onSubmit={handleSubmit} className="user">
                <div className="card text-center w-100">
                  <br />
                  <h1 className="h4 text-gray-900 mb-4">{params.id ? "Editar" : "Agregar"} empleado</h1>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 mt-3">
                      <Field type="text" className="form-control form-control-user" id="nombre" name="nombre" placeholder="Nombres*" />
                      {errors.nombre && touched.nombre ? (
                        <div className="alert alert-danger" role="alert">{errors.nombre}</div>
                      ) : null}
                      </div>
                      <div className="col-md-6 mt-3">
                        <input type="text" className="form-control form-control-user" id="apellido" onChange={handleChange} value={values.apellido} placeholder="Apellidos*" />
                        {errors.apellido && touched.apellido ? (
                          <div className="alert alert-danger" role="alert">{errors.apellido}</div>
                        ) : null}
                      </div>
                      <div className="col-md-6 mt-3">
                        <select id="tipoDoc" className="form-select form-control-user" onChange={handleChange} value={values.tipoDoc}>
                          <option value="">Seleccione tipo documento*</option>
                          <option value="CC">Cedula de ciudadania</option>
                          <option value="CE">Cedula de extranjeria</option>
                          <option value="PS">Pasaporte</option>
                        </select>
                        {errors.tipoDoc && touched.tipoDoc ? (
                          <div className="alert alert-danger" role="alert">{errors.tipoDoc}</div>
                        ) : null}
                      </div>
                      <div className="col-md-6 mt-3">
                        <input type="text" className="form-control form-control-user" id="cedula" onChange={handleChange} value={values.cedula} placeholder="Número de documento*" />
                        {errors.cedula && touched.cedula ? (
                          <div className="alert alert-danger" role="alert">{errors.cedula}</div>
                        ) : null}
                      </div>
                      <div className="col-md-6 mt-3">
                        <input type="text" className="form-control form-control-user" id="telefono" onChange={handleChange} value={values.telefono} placeholder="Número telefónico*" />
                        {errors.telefono && touched.telefono ? (
                          <div className="alert alert-danger" role="alert">{errors.telefono}</div>
                        ) : null}
                      </div>
                      <div className="col-md-6 mt-3">
                        <input type="text" className="form-control form-control-user" id="direccion" onChange={handleChange} value={values.direccion} placeholder="Dirección*" />
                        {errors.direccion && touched.direccion ? (
                          <div className="alert alert-danger" role="alert">{errors.direccion}</div>
                        ) : null}
                      </div>
                      <div className="col-md-6 mt-3">
                        {params.id ? 
                        (
                          <select id="estado" className="form-select form-control-user" onChange={handleChange} value={values.estado} >
                            <option value="">Seleccione estado</option>
                            <option value="1">Activo</option>
                            <option value="0">Inactivo</option>
                          </select>                          
                        ): (
                          <select id="estado" className="form-select form-control-user" onChange={handleChange} value={values.estado} disabled>
                            <option value="1">Activo</option>
                          </select>
                        )
                        }
                        {/* <select
                          placeholder={<div>Selecciona estado</div>}
                          value={values.estado}
                          name="estado"
                          options={estadoOptions}
                          className="basic-multi-select"
                          classNamePrefix="select"
                        /> */}
                        {errors.estado && touched.estado ? (
                          <div className="alert alert-danger" role="alert">{errors.estado}</div>
                        ) : null}
                      </div>
                      <div className="col-md-6 mt-3">
                        <label>Selecciona especialidades:</label>
                        <Select
                          key={key}
                          defaultValue={defaultOptions}
                          isMulti
                          name="especialidad"
                          options={options}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={(selectedEsp) => setSelectedEsp(selectedEsp)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-footer text-center">
                    <div className="row">
                      <div className="col-md-6">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-icon-split w-50">
                          <span className="text-white-50">
                            <i className="fas fa-plus"></i>
                          </span>
                          <span className="text">{params.id ? "Editar" : "Agregar"}</span>
                        </button>
                      </div>
                      <div className="col-md-6">
                        <a type="button" href="" className="btn btn-danger btn-icon-split w-50" onClick={() => navigate(`/empleados`)}>
                          <span className="text-white-50">
                            <i className="fa-solid fa-x"></i>
                          </span>
                          <span className="text">Cancelar</span>
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
  )
}