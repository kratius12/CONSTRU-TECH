import { useEffect, useState } from "react";
import Select from "react-select";
// import makeAnimated from 'react-select/animated';
import { Form, Formik, Field } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useRol } from "../../context/roles/RolesProvider";
import RolSchema from "../roles/RolesValidator";


export default function RolesForm() {

  const { createRol, getRol, updateRol, permisos, Permisos } = useRol()
  const params = useParams()
  const navigate = useNavigate()
  const [key, setKey] = useState(0)
  const [options, setOptions] = useState([]);
  const [defaultOptions, setDefaultOptions] = useState([]);
  const [selectedPer, setSelectedPer] = useState(defaultOptions)
  const initialState = {
    nombre: "",
    estado: 1,
    permisos: []
  }
  const [rol, setRol] = useState(initialState)
  const estadoOptions = [
    {
      value: 1, label: "Activo",
    }, {
      value: 0, label: "Inactivo"
    }
  ]
  useEffect(() => {
    const loadPermisos = async () => {
      if (params.id) {
        const rol = await getRol(params.id)
        if (rol) {
          setRol({
            nombre: rol.nombre,
            estado: rol.estado === "0" ? "0" : "1",
            permiso: rol.rol_permiso
          })
          const defaultOpts = rol.rol_permiso.map(item => ({ value: item.permiso.id, label: item.permiso.permiso }))
          setDefaultOptions(defaultOpts)
          setSelectedPer(defaultOpts)
          setKey(prevKey => prevKey + 1)
        }
      }else{
        setRol(initialState)
      }
    }
    const fetchData = async () => {
      const permisos = await Permisos()
      const opciones = permisos.map(item => ({ value: item.id, label: item.permiso }))
      setOptions(opciones)
    }
    fetchData()
    loadPermisos()
  }, [])

  const alertConfirm = (type) => {
    var message = ""
    if (type == "update") {
      message = "Actualizado"
    } else {
      message = "Agregado"
    }
    $.confirm({
      title: `Rol ` + message + ` con exito!`,
      content: "Redirecionando a listado de roles...",
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


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Formik initialValues={rol}
            enableReinitialize={true}
            validationSchema={RolSchema}
            onSubmit={async (values) => {
              const rolEspacios = values.nombre.replace(/\s{2,}/g, ' ').trim()
              console.log(values);
              const rolObject = {
                ...values,
                rol : rolEspacios,
                permiso: selectedPer
              }
              if (params.id) {
                await updateRol(params.id, rolObject)
                alertConfirm()
                setTimeout(
                  navigate("/roles"),
                  5000
                )
              } else {
                await createRol(rolObject)
                alertConfirm()
                setTimeout(
                  navigate("/roles"),
                  5000
                )

              }
              setRol({
                nombre: "",
                estado: "",
                permiso: []
              })
            }}
          >
            {({ handleChange, handleSubmit, values, isSubmitting, errors, touched }) => (
              <Form onSubmit={handleSubmit} className="user">
                <div className="card text-center w-100">
                  <br />
                  <h1 className="h4 text-gray-900 mb-4">{params.id ? "Editar" : "Agregar"} rol</h1>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 mt-3">
                        <input type="text" className="form-control form-control-user" id="nombre" onChange={handleChange} value={values.nombre} placeholder="Nombres*" />
                        {errors.nombre && touched.nombre ? (
                          <div className="alert alert-danger" role="alert">{errors.nombre}</div>
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
                          className="basic-multix-select"
                          classNamePrefix="select"
                        /> */}
                        {errors.estado && touched.estado ? (
                          <div className="alert alert-danger" role="alert">{errors.estado}</div>
                        ) : null}
                      </div>
                      <div className="col-md-6 mt-3">
                        <label>Selecciona permisos:</label>
                        <Select
                          key={key}
                          defaultValue={defaultOptions}
                          isMulti
                          name="permiso"
                          options={options}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={(selectedPer) => setSelectedPer(selectedPer)}
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
                        <a type="button" href="" className="btn btn-danger btn-icon-split w-50" onClick={() => navigate(`/roles`)}>
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