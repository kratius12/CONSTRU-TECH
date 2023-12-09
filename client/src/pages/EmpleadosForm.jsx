import { useEffect, useState } from "react";
// import  Select  from "react-select";
// import makeAnimated from 'react-select/animated';
import { Form, Formik, Field } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useEmpleados } from "../context/EmpleadosProvider";
import EmpleadoSchema from "../components/ValidatorEmpleado";


export default function EmpleadosForm() {
  //   const [agreed, setAgreed] = useState(false)
  const { createEmpleado, getEmpleado, updateEmpleado, especialidades, Especialidades } = useEmpleados()
  useEffect(() => {
    Especialidades()
  }, [])

  // const options = especialidades.map(item => ({value:item.id, label:item.especialidad}))
  // const [selectedOption, setSelectedOption] = useState("");

  // const handleClick = (selected) => {
  //   setSelectedOption(selected.value);
  //   console.log(selectedOption);
  // };
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
      animationSpeed: 1500,
      type: 'green',
      columnClass: 'col-md-6 col-md-offset-3',
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
    nombre: "",
    direccion: "",
    estado: "",
    telefono: "",
    tipoDoc: "",
    cedula: "",
    especialidad: []
  })

  useEffect(() => {
    const loadEmpleados = async () => {
      if (params.id) {
        const empleado = await getEmpleado(params.id)
        setEmpleado({
          nombre: empleado.nombre,
          direccion: empleado.direccion,
          estado: empleado.estado,
          email: empleado.email,
          telefono: empleado.telefono,
          tipoDoc: empleado.tipoDoc,
          cedula: empleado.cedula,
          especialidad: empleado.especialidad
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
            onSubmit={async (values) => {
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
                nombre: "",
                direccion: "",
                estado: "",
                email: "",
                telefono: "",
                tipoDoc: "",
                cedula: "",
                especialidad: []
              })
            }}
          >
            {({ handleChange, handleSubmit, values, isSubmitting, errors, touched }) => (
              <Form onSubmit={handleSubmit} className="user">
                <div className="card text-center w-100">
                  <br />
                  <h1 className="h4 text-gray-900 mb-4">{params.id ? "Editar": "Agregar"} empleado</h1>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6 mt-3">
                        <input type="text" className="form-control form-control-user" id="nombre" onChange={handleChange} value={values.nombre} placeholder="Nombres*" />
                        {errors.nombre && touched.nombre ? (
                          <div className="alert alert-danger" role="alert">{errors.nombre}</div>
                        ) : null}
                      </div>
                      <div className="col-6 mt-3">
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
                      <div className="col-6 mt-3">
                        <input type="text" className="form-control form-control-user" id="cedula" onChange={handleChange} value={values.cedula} placeholder="Número de documento*" />
                        {errors.cedula && touched.cedula ? (
                          <div className="alert alert-danger" role="alert">{errors.cedula}</div>
                        ) : null}
                      </div>
                      <div className="col-6 mt-3">
                        <input type="text" className="form-control form-control-user" id="telefono" onChange={handleChange} value={values.telefono} placeholder="Número telefonico*" />
                        {errors.telefono && touched.telefono ? (
                          <div className="alert alert-danger" role="alert">{errors.telefono}</div>
                        ) : null}
                      </div>
                      <div className="col-6 mt-3">
                        <input type="text" className="form-control form-control-user" id="direccion" onChange={handleChange} value={values.direccion} placeholder="Dirección*" />
                        {errors.direccion && touched.direccion ? (
                          <div className="alert alert-danger" role="alert">{errors.direccion}</div>
                        ) : null}
                      </div>
                      <div className="col-6 mt-3">
                        <label>Selecciona especialidades:</label>
                        <Field
                          name="especialidad"
                          as="select"
                          multiple
                          className="form-select "
                        >
                          {especialidades.map(item => (
                            <option key={item.id} value={item.id}>
                              {item.especialidad}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <div className="col-6 mt-3">
                        <select id="estado" className="form-select form-control-user" onChange={handleChange} value={values.estado} >
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
                      <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-icon-split w-50">
                          <span className="icon text-white-50">
                            <i className="fas fa-plus"></i>
                          </span>
                          <span className="text">{params.id ? "Editar" : "Agregar"}</span>
                        </button>
                      </div>
                      <div className="col-md-6">
                        <a type="button" href="" className="btn btn-danger btn-icon-split w-50" onClick={() => navigate(`/empleados`)}>
                          <span className="icon text-white-50">
                            <i className="fas fa-trash"></i>
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