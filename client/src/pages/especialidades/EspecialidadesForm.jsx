import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEspecialidades } from "../../context/especialidades/EspecialidadesProvider";
import EspecialidadSchema from '../../components/especialidades/ValidatorEspecialidad'
import axios from "axios";

export default function EspecialidadesForm() {
  //   const [agreed, setAgreed] = useState(false)
  const { createEspecialidad, getEspecialidad, updateEspecialidad, } = useEspecialidades()

  const params = useParams()
  const navigate = useNavigate()
  const initialState = {
    especialidad: "",
    estado: 1, // Valor predeterminado
  };

  const [especialidad, setEspecialidad] = useState(initialState)
  const [nombre, setNombre] = useState(true)
  const validateWhitespace = (value) => {
    return hasWhitespace(value) ? 'No se permiten espacios en blanco' : undefined;
  };
  useEffect(() => {
    const loadEspecialidades = async () => {
      if (params.id) {
        const especialidad = await getEspecialidad(params.id)
        setEspecialidad({
          especialidad: especialidad.especialidad
        })
        checkNombre(especialidad)
      } else {
        setEspecialidad(initialState)
      }
    }
    loadEspecialidades()
  }, [getEspecialidad, params.id])

  const alertConfirm = (type) => {
    var message = ""
    if (type == "update") {
      message = "Actualizado"
    } else {
      message = "Agregada"
    }
    $.confirm({
      title: `Especialidad ` + message + ` con exito!`,
      content: "",
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

  const checkNombre = async (nombre) => {
    try {
      const response = await fetch(`https://apismovilconstru-production-be9a.up.railway.app/checkEsp/${nombre}/${params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (response.status === 203) {
        $.confirm({
          title: `La especialidad ingresada ya existe, por favor intente con uno diferente`,
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
        setNombre(true)
        
      } else {
        setNombre(false)
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
          <Formik initialValues={especialidad}
            enableReinitialize={true}
            validationSchema={EspecialidadSchema}
            onSubmit={async (values, { setSubmitting }) => {
              const cleannedName = values.especialidad.replace(/\s{2,}/g, ' ').trim()
              const especialidadObject = {
                ...values,
                especialidad: cleannedName
              }
              checkNombre(values.especialidad)
              if (nombre === false) {
                if (params.id) {
                  await updateEspecialidad(params.id, especialidadObject)
                  alertConfirm('update')
                  setTimeout(
                    navigate("/especialidades"),
                    5000
                  )
                } else {

                  await createEspecialidad(especialidadObject)
                  alertConfirm()
                  setTimeout(
                    navigate("/especialidades"),
                    5000
                  )
                }                

              }
            }}
          >
            {({ handleChange, handleSubmit, values, isSubmitting, errors, touched, setFieldValue }) => (
              <Form onSubmit={handleSubmit} className="user">
                <div className="card text-center w-100">
                  <h2>{params.id ? "Editar" : "Agregar"} especialidad</h2>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6 offset-3 mt-3">

                        <input type="text" className="form-control form-control-user" id="especialidad" onChange={(e) =>{
                          handleChange(e)
                          checkNombre(e.target.value)
                        }} value={values.especialidad} placeholder="Nombre*"  />
                        {errors.especialidad && touched.especialidad ? (
                          <div className="alert alert-danger" role="alert">{errors.especialidad}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="card-footer text-center">
                    <div className="row">
                      <div className="col-md-6">
                        <button type="submit" disabled={isSubmitting} className={`btn btn-primary btn-icon-split w-50`}>
                          <span className="text-white-50">
                            <i className="fas fa-plus"></i>
                          </span>
                          <span className="text">Guardar</span>
                        </button>
                      </div>
                      <div className="col-md-6">
                      <Link type="button" href="" className="btn btn-danger btn-icon-split w-50" to="/especialidades">
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
