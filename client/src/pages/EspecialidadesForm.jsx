import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useEspecialidades } from "../context/EspecialidadesProvider";
import * as Yup from 'yup';

const EspecialidadSchema = Yup.object().shape({
  especialidad: Yup.string()
    .min(3, 'La especialidad debe contener al menos 3 caracteres')
    .max(50, 'La especialidad no puede contener mas de 50 caracteres')
    .required('La especialidad es requerido'),
  estado: Yup.string()
  .required('El estado es requerido')
});




export default function EspecialidadesForm() {
//   const [agreed, setAgreed] = useState(false)
    const {createEspecialidad, getEspecialidad, updateEspecialidad, } = useEspecialidades()

    const params = useParams()
    const navigate = useNavigate()
    const [especialidad, setEspecialidad] = useState({
        especialidad:"",
        estado:""
    })
    
    useEffect(() =>{
        const loadEspecialidades = async () => {
            if (params.id) {
                const especialidad = await getEspecialidad(params.id)
                setEspecialidad({
                    especialidad:especialidad.especialidad,
                    estado:especialidad.estado
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
          onSubmit={ async (values) => {
            console.log(values);
            if (params.id) {
              await updateEspecialidad(params.id, values)
              navigate("/especialidades")
            } else {
              await createEspecialidad(values)
              navigate("/especialidades")
            }
              setEspecialidad({
                  especialidad:"",
                  estado:""
              })
          }}
          >
            {({handleChange, handleSubmit, values, isSubmitting, errors, touched}) =>(
              <Form onSubmit={handleSubmit}>
                <div className="card text-center w-100">
                  <div className="card-header bg-primary text-white">
                    <h2>{params.id ? "Editar": "Agregar"} especialidad</h2>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6 mt-3">
                        <label htmlFor="especialidad" className="form-label">Especialidad <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="especialidad" onChange={handleChange} value={values.especialidad} />
                          {errors.especialidad && touched.especialidad ? (
                          <div className="alert alert-danger" role="alert">{errors.especialidad}</div>
                          ) : null}                        
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
                      <a type="button" href="" className="btn btn-danger w-50" onClick={()=> navigate(`/especialidades`)}>
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
  )
}
