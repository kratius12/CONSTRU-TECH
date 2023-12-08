import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useCategorias } from "../../context/categorias/CategoriasProvider";
import CategoriaSchema from "../../components/ValidatorCategoria";


export default function CategoriasForm() {
//   const [agreed, setAgreed] = useState(false)
    const {createCategoria, getCategoria, updateCategoria, } = useCategorias()

    const params = useParams()
    const navigate = useNavigate()
    const [categoria, setCategoria] = useState({
        nombre:"",
        medida:"",
        estado:""
    })
    
    useEffect(() =>{
        const loadEspecialidades = async () => {
            if (params.id) {
                const categoria = await getCategoria(params.id)
                setCategoria({
                    nombre:categoria.nombre,
                    medida:categoria.medida,
                    estado:categoria.estado
                })                
            }
        }
        loadEspecialidades()
    }, [getCategoria, params.id])

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Formik initialValues={categoria}
          enableReinitialize={true}
          validationSchema={CategoriaSchema}
          onSubmit={ async (values) => {
            console.log(values);
            if (params.id) {
              await updateCategoria(params.id, values)
              navigate("/categorias")
            } else {
              await createCategoria(values)
              navigate("/categorias")
            }
            setCategoria({
                  nombre:"",
                  medida:"",
                  estado:""
              })
          }}
          >
            {({handleChange, handleSubmit, values, isSubmitting, errors, touched}) =>(
              <Form onSubmit={handleSubmit} className="user">
                <div className="card text-center w-100">
                    <h2>{params.id ? "Editar": "Agregar"} categoria</h2>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6 mt-3">
                        <input type="text" className="form-control form-control-user" id="nombre" onChange={handleChange} value={values.nombre} placeholder="Nombre*"/>
                          {errors.nombre && touched.nombre ? (
                          <div className="alert alert-danger" role="alert">{errors.nombre}</div>
                          ) : null}                        
                      </div>
                      <div className="col-6 mt-3">
                        <select id="medida" className="form-select form-control-user" onChange={handleChange} value={values.medida} >
                          <option value="">Seleccione la unidad de medida*</option>
                          <option value="m">Metro</option>
                          <option value="m2">Metro cuadrado</option>
                          <option value="kg">Kilogramo</option>
                          <option value="und">Unidad</option>
                          <option value="lt">Litros</option>
                        </select>
                        {errors.medida && touched.medida ? (
                          <div className="alert alert-danger" role="alert">{errors.medida}</div>
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
                          <span className="icon text-white-50">
                            <i className="fas fa-plus"></i>
                          </span>
                          <span className="text">{params.id ? "Editar" : "Agregar"}</span>
                        </button>
                      </div>
                      <div className="col-md-6">
                        <a type="button" href="" className="btn btn-danger btn-icon-split w-50" onClick={() => navigate(`/categorias`)}>
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
