import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useEspecialidades } from "../../context/especialidades/EspecialidadesProvider";
import EspecialidadSchema from '../../components/ValidatorEspecialidad'




export default function EspecialidadesForm() {
  //   const [agreed, setAgreed] = useState(false)
  const { createEspecialidad, getEspecialidad, updateEspecialidad, } = useEspecialidades()

  const params = useParams()
  const navigate = useNavigate()
  const [especialidad, setEspecialidad] = useState({
    especialidad: "",
    estado: ""
  })

  useEffect(() => {
    const loadEspecialidades = async () => {
      if (params.id) {
        const especialidad = await getEspecialidad(params.id)
        setEspecialidad({
          especialidad: especialidad.especialidad,
          estado: especialidad.estado
        })
      }
    }
    loadEspecialidades()
  }, [getEspecialidad, params.id])

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Formik initialValues={especialidad}
            enableReinitialize={true}
            validationSchema={EspecialidadSchema}
            onSubmit={async (values) => {
              console.log(values);
              if (params.id) {
                await updateEspecialidad(params.id, values)
                navigate("/especialidades")
              } else {
                await createEspecialidad(values)
                navigate("/especialidades")
              }
              setEspecialidad({
                especialidad: "",
                estado: ""
              })
            }}
          >
            {({ handleChange, handleSubmit, values, isSubmitting, errors, touched }) => (
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
                        <select id="estado" className="form-select form-control-user" onChange={handleChange} value={values.estado} >
                          <option value="">Seleccione estado*</option>
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
                          <span className="text-white-50">
                            <i className="fas fa-plus"></i>
                          </span>
                          <span className="text">{params.id ? "Editar" : "Agregar"}</span>
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
