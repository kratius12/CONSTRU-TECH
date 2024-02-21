import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
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
    estado: "1", // Valor predeterminado
  };

  const [especialidad, setEspecialidad] = useState(initialState)
  const validateWhitespace = (value) => {
    return hasWhitespace(value) ? 'No se permiten espacios en blanco' : undefined;
  };
  useEffect(() => {
    const loadEspecialidades = async () => {
      if (params.id) {
        const especialidad = await getEspecialidad(params.id)
        setEspecialidad({
          especialidad: especialidad.especialidad,
          estado: especialidad.estado === "0" ? "0" : "1"
        })
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
  console.clear()
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
              console.log(especialidadObject);
              if (params.id) {
                await updateEspecialidad(params.id, especialidadObject)
                alertConfirm('update')
                setTimeout(
                  navigate("/especialidades"),
                  5000
                )
              } else {
                const validarEsp = axios.put(`http://localhost:4000//validarEspA`, { especialidad: values.especialidad })
                if (validarEsp.data === true) {
                  $.confirm({
                    title: `Error`,
                    content: `La especialidad ${values.especialidad} ya existe`,
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
                  }, setSubmitting(false))
                } else {
                  setSubmitting(true)
                  await createEspecialidad(especialidadObject)
                  alertConfirm()
                  setTimeout(
                    navigate("/especialidades"),
                    5000
                  )
                }
              }
              setEspecialidad({
                especialidad: "",
                estado: ""
              })
            }}
          >
            {({ handleChange, handleSubmit, values, isSubmitting, errors, touched, setFieldValue }) => (
              <Form onSubmit={handleSubmit} className="user">
                <div className="card text-center w-100">
                  <h2>{params.id ? "Editar" : "Agregar"} especialidad</h2>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6 mt-3">
                        <input type="text" className="form-control form-control-user" id="especialidad" onChange={handleChange} value={values.especialidad} placeholder="Nombre*" />
                        {errors.especialidad && touched.especialidad ? (
                          <div className="alert alert-danger" role="alert">{errors.especialidad}</div>
                        ) : null}
                      </div>
                      <div className="col-6 mt-3">
                        {params.id ?
                          (
                            <select id="estado" className="form-select form-control-user" onChange={handleChange} value={values.estado} >
                              <option value="">Seleccione estado*</option>
                              <option value="1">Activo</option>
                              <option value="0">Inactivo</option>
                            </select>
                          ) : null
                        }
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
                          <span className="text">Guardar</span>
                        </button>
                      </div>
                      <div className="col-md-6">
                        <a type="button" href="" className="btn btn-danger btn-icon-split w-50" onClick={() => navigate(`/especialidades`)}>
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
