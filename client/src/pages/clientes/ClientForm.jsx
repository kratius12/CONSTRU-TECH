import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useClients } from "../../context/clientes/ClientesProvider";
import ClientSchema from "../../components/ValidatorCliente";




export default function ClientsForm() {
  const { createClient, getClient, updateClient } = useClients()

  const [selectedOption, setSelectedOption] = useState("");

  const handleClick = (selectedOption) => {
    console.log(selectedOption);
    setSelectedOption(selectedOption.value);
  };
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

  const estadoOptions = [
    {
      value: 1, label: "Activo",
    }, {
      value: 0, label: "Inactivo"
    }
  ]

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
          estado: cliente.estado === "0" ? "0" : "1",
          contrasena: cliente.contrasena
        })

      }
    }
    loadClients()
  }, [getClient, params.id])

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Formik initialValues={cliente}
            enableReinitialize={true}
            validationSchema={ClientSchema}
            onSubmit={async (values) => {
              const hoy = new Date();
              const fechaNac = new Date(values.birthdate);
              let edad = hoy.getFullYear() - fechaNac.getFullYear();
              const m = hoy.getMonth() - fechaNac.getMonth();
              if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
                edad--;
              }
              // const cleanedNombre = values.nombre.replace(/\s{2,}/g, "")
              console.log(values);
              if (params.id) {
                await updateClient(params.id, values)
                navigate("/clientes")
              } else {
                await createClient(values)
                navigate("/clientes")
              }
              setCliente({
                nombre: "",
                apellidos: "",
                email: "",
                direccion: "",
                telefono: "",
                tipoDoc: "",
                cedula: "",
                fecha_nac: "",
                estado: "",
                contrasena: ""
              })
            }}
          >
            {({ handleChange, handleSubmit, values, isSubmitting, errors, touched }) => (
              <Form onSubmit={handleSubmit} className="user">
                <div className="card text-center w-100">
                  <br />
                  <h1>{params.id ? "Editar" : "Agregar"} cliente</h1>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6 mt-3">
                        <input type="text" className="form-control  form-control-user" id="nombre" onChange={handleChange} value={values.nombre} placeholder="Nombre*" />
                        {errors.nombre && touched.nombre ? (
                          <div className="alert alert-danger" role="alert">{errors.nombre}</div>
                        ) : null}
                      </div>
                      <div className="col-6 mt-3">
                        <input type="text" className="form-control  form-control-user" id="apellidos" onChange={handleChange} value={values.apellidos} placeholder="Apellido*" />
                        {errors.apellidos && touched.apellidos ? (
                          <div className="alert alert-danger" role="alert">{errors.apellidos}</div>
                        ) : null}
                      </div>
                      <div className="col-6 mt-3">
                        <input type="text" className="form-control  form-control-user" id="email" onChange={handleChange} value={values.email} placeholder="Correo electronico*" />
                        {errors.email && touched.email ? (
                          <div className="alert alert-danger" role="alert">{errors.email}</div>
                        ) : null}
                      </div>
                      <div className="col-6 mt-3">
                        <input type="text" className="form-control  form-control-user" id="direccion" onChange={handleChange} value={values.direccion} placeholder="Dirección*" />
                        {errors.direccion && touched.direccion ? (
                          <div className="alert alert-danger" role="alert">{errors.direccion}</div>
                        ) : null}
                      </div>
                      <div className="col-6 mt-3">
                        <input type="text" className="form-control form-control-user" id="telefono" onChange={handleChange} value={values.telefono} placeholder="Teléfono*" />
                        {errors.telefono && touched.telefono ? (
                          <div className="alert alert-danger" role="alert">{errors.telefono}</div>
                        ) : null}
                      </div>
                      <div className="col-6 mt-3">
                        <select id="tipoDoc" className="form-select  form-control-user" onChange={handleChange} value={values.tipoDoc} >
                          <option value="">Seleccione tipo documento*</option>
                          <option value="Cedula de ciudadania">Cedula de ciudadania</option>
                          <option value="Cedula de extranjeria">Cedula de extranjeria</option>
                          <option value="Pasaporte">Pasaporte</option>
                        </select>
                        {errors.tipoDoc && touched.tipoDoc ? (
                          <div className="alert alert-danger" role="alert">{errors.tipoDoc}</div>
                        ) : null}
                      </div>
                      <div className="col-6 mt-3">
                        <input type="text" className="form-control  form-control-user" id="cedula" onChange={handleChange} value={values.cedula} placeholder="Número de documento de identidad*" />
                        {errors.cedula && touched.cedula ? (
                          <div className="alert alert-danger" role="alert">{errors.cedula}</div>
                        ) : null}
                      </div>
                      <div className="col-6 mt-3">
                        <label htmlFor="">Fecha de nacimiento</label>
                        <input type="date" className="form-control  form-control-user" id="fecha_nac" onChange={handleChange} value={values.fecha_nac} />
                        {errors.fecha_nac && touched.fecha_nac ? (
                          <div className="alert alert-danger" role="alert">{errors.fecha_nac}</div>
                        ) : null}
                      </div>
                      <div className="col-6 mt-3">
                        <input type="password" className="form-control  form-control-user" id="contrasena" onChange={handleChange} value={values.contrasena} placeholder="Contraseña*" />
                        {errors.contrasena && touched.contrasena ? (
                          <div className="alert alert-danger" role="alert">{errors.contrasena}</div>
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
                        <a type="button" href="" className="btn btn-danger btn-icon-split w-50" onClick={() => navigate(`/clientes`)}>
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