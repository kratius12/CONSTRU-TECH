import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useClients } from "../../context/clientes/ClientesProvider";
import { ClientSchema, ClientSchemaEdit } from "../../components/clientes/ValidatorCliente";

export default function ClientsForm() {
  const { createClient, getClient, updateClient } = useClients()
  const [email, setEmail] = useState(true)
  const [doc, setDoc] = useState(true)
  const params = useParams()
  const navigate = useNavigate()
  const [cliente, setCliente] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    direccion: "",
    telefono: "",
    tipoDoc: "",
    cedula: "",
    fecha_nac: "",
    estado: 1,
    contrasena: ""
  })

  const alertConfirm = () => {
    var message = ""
    if (params.id) {
      message = "actualizado"
    } else {
      message = "agregado"
    }
    $.confirm({
      title: `Cliente ${message} con éxito!`,
      content: "",
      icon: 'fa fa-check',
      theme: 'modern',
      closeIcon: true,
      animation: 'news',
      closeAnimation: 'news',
      type: 'green',
      columnClass: 'col-md-6 col-md-offset-3',
      autoClose: 'okay|4000',
      buttons: {
        okay: function () {
          navigate("/clientes")
        },

      }
    })
  }
  var validate;
  if (params.id) {
    validate = ClientSchemaEdit
  } else {
    validate = ClientSchema
  }

  useEffect(() => {
    const loadClients = async () => {
      if (params.id) {
        const cliente = await getClient(params.id)
        setCliente({
          nombre: cliente.nombre,
          apellidos: cliente.apellidos,
          email: cliente.email,
          direccion: cliente.direccion,
          telefono: cliente.telefono,
          tipoDoc: cliente.tipoDoc,
          cedula: cliente.cedula,
          fecha_nac: cliente.fecha_nac,
          contrasena: ''
        })
        checkEmail(cliente.email)
        checkDoc(cliente.tipoDoc, cliente.cedula)
      }
    }
    loadClients()
  }, [getClient, params.id])

  const checkEmail = async (email) => {
    try {
      const response = await fetch(`https://apismovilconstru-production-be9a.up.railway.app/checkEmail/${email}/${params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (response.status === 203) {
        $.confirm({
          title: `El correo ingresado ya existe, por favor intente con uno diferente`,
          content: "",
          icon: 'fa fa-x-mark',
          theme: 'modern',
          closeIcon: true,
          animation: 'zoom',
          closeAnimation: 'scale',
          animationSpeed: 500,
          type: 'red',
          columnClass: 'col-md-6 col-md-offset-3',
          buttons: {
            cerrar: function () {
            },
          }
        })
        setEmail(true)
      } else {
        setEmail(false)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const checkDoc = async (tipoDoc, cedula) => {
    try {
      const response = await fetch(`https://apismovilconstru-production-be9a.up.railway.app/checkDoc/${cedula}/${tipoDoc}/${params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (response.status === 203) {
        $.confirm({
          title: `El numero y tipo de documento ingresado ya existe`,
          content: "",
          icon: 'fa fa-x-mark',
          theme: 'modern',
          closeIcon: true,
          animation: 'zoom',
          closeAnimation: 'scale',
          animationSpeed: 500,
          type: 'red',
          columnClass: 'col-md-6 col-md-offset-3',
          buttons: {
            cerrar: function () {
            },
          }
        })
        setDoc(true)
      } else {
        setDoc(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // console.clear()
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Formik initialValues={cliente}
            enableReinitialize={true}
            validationSchema={validate}
            onSubmit={async (values) => {
              checkEmail(values.email)
              checkDoc(values.tipoDoc, values.cedula)
              if (email === false && doc === false) {
                if (params.id) {
                  await updateClient(params.id, values)
                  navigate("/clientes")
                  alertConfirm("update")
                } else {
                  checkEmail(values.email)
                  checkDoc(values.tipoDoc, values.cedula)
                  if (email === false && doc === false) {
                    console.log(email, doc)
                    await createClient(values)
                    navigate("/clientes")
                    alertConfirm()
                  }

                }
              }
            }}
          >
            {({ handleChange, handleSubmit, values, isSubmitting, errors, touched }) => (
              <Form onSubmit={handleSubmit} className="user">
                <div className="card text-center w-100">
                  <br />
                  <h1>{params.id ? "Editar" : "Agregar"} cliente</h1>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 mt-3 mx-auto">
                        <select id="tipoDoc" className="form-select  form-control-user" onChange={handleChange} value={values.tipoDoc} >
                          <option value="">Seleccione tipo documento*</option>
                          <option value="Cedula de ciudadania">Cedula de ciudadanía</option>
                          <option value="Cedula de extranjeria">Cedula de extranjería</option>
                          <option value="Pasaporte">Pasaporte</option>
                        </select>
                        {errors.tipoDoc && touched.tipoDoc ? (
                          <div className="alert alert-danger" role="alert">{errors.tipoDoc}</div>
                        ) : null}
                      </div>
                      <div className="col-md-6 mt-3 mx-auto">
                        <input type="text" className="form-control  form-control-user" id="cedula" onChange={(e) => {
                          handleChange(e)
                          checkDoc(values.tipoDoc, e.target.value)
                        }} value={values.cedula} placeholder="Número de documento de identidad*" />
                        {errors.cedula && touched.cedula ? (
                          <div className="alert alert-danger" role="alert">{errors.cedula}</div>
                        ) : null}
                      </div>
                      <div className="col-md-4 mt-3 mx-auto">
                        <input type="text" className="form-control  form-control-user" id="nombre" onChange={handleChange} value={values.nombre} placeholder="Nombre*" />
                        {errors.nombre && touched.nombre ? (
                          <div className="alert alert-danger" role="alert">{errors.nombre}</div>
                        ) : null}
                      </div>
                      <div className="col-md-4 mt-3 mx-auto">
                        <input type="text" className="form-control  form-control-user" id="apellidos" onChange={handleChange} value={values.apellidos} placeholder="Apellido*" />
                        {errors.apellidos && touched.apellidos ? (
                          <div className="alert alert-danger" role="alert">{errors.apellidos}</div>
                        ) : null}
                      </div>
                      <div className="col-md-4 mt-3 mx-auto">
                        <input type="text"
                          className="form-control  form-control-user"
                          id="email"
                          onChange={(e) => {
                            handleChange(e)
                            params.id ? '' : checkEmail(e.target.value)
                          }}
                          value={values.email}
                          placeholder="Correo electronico*" />
                        {errors.email && touched.email ? (
                          <div className="alert alert-danger" role="alert">{errors.email}</div>
                        ) : null}
                      </div>
                      <div className="col-md-4 mt-3 mx-auto">
                        <input type="text" className="form-control  form-control-user" id="direccion" onChange={handleChange} value={values.direccion} placeholder="Dirección*" />
                        {errors.direccion && touched.direccion ? (
                          <div className="alert alert-danger" role="alert">{errors.direccion}</div>
                        ) : null}
                      </div>
                      <div className="col-md-4 mt-3 mx-auto">
                        <input type="text" className="form-control form-control-user" id="telefono" onChange={handleChange} value={values.telefono} placeholder="Teléfono*" />
                        {errors.telefono && touched.telefono ? (
                          <div className="alert alert-danger" role="alert">{errors.telefono}</div>
                        ) : null}
                      </div>
                      <div className="col-md-4 mt-3 mx-auto">
                        <label htmlFor="">Fecha de nacimiento</label>
                        <input type="date" className="form-control  form-control-user" id="fecha_nac" onChange={handleChange} value={values.fecha_nac} />
                        {errors.fecha_nac && touched.fecha_nac ? (
                          <div className="alert alert-danger" role="alert">{errors.fecha_nac}</div>
                        ) : null}
                      </div>
                      {
                        !params.id ? (
                          <div className="col-md-4 mt-3 mx-auto">
                            <input type="password" className="form-control  form-control-user" id="contrasena" onChange={handleChange} value={values.contrasena} placeholder="Contraseña*" />
                            {errors.contrasena && touched.contrasena ? (
                              <div className="alert alert-danger" role="alert">{errors.contrasena}</div>
                            ) : null}
                          </div>
                        ) : null
                      }
                      {
                        !params.id ? (
                          <div className="col-md-4 mt-3">
                            <input type="password" className="form-control form-control-user" id="confirmar" name="confirmar" onChange={handleChange} value={values.confirmar} placeholder="Confirme la contraseña*" />
                            {errors.confirmar && touched.confirmar ? (
                              <div className="alert alert-danger" role="alert">{errors.confirmar}</div>
                            ) : null}
                          </div>
                        ) : null
                      }
                    </div>
                  </div>
                  <div className="card-footer text-center">
                    <div className="row">
                      <div className="col-md-6">
                        <button type="submit" disabled={isSubmitting} className={`btn btn-primary btn-icon-split w-50`} >
                          <span className="text-white-50">
                            <i className="fas fa-plus"></i>
                          </span>
                          <span className="text">Guardar</span>
                        </button>
                      </div>
                      <div className="col-md-6">
                        <Link type="button" href="" className="btn btn-danger btn-icon-split w-50" to="/clientes">
                          <span className="text-white-50">
                            <i className="fa-solid fa-x"></i>
                          </span>
                          <span className="text">Cancelar</span>
                        </Link>
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