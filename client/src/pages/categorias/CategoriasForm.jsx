import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCategorias } from "../../context/categorias/CategoriasProvider";
import CategoriaSchema from "../../components/categorias/ValidatorCategoria";


export default function CategoriasForm() {
  //   const [agreed, setAgreed] = useState(false)
  const { createCategoria, getCategoria, updateCategoria, } = useCategorias()

  const params = useParams()
  const navigate = useNavigate()
  const [categoria, setCategoria] = useState({
    nombre: ""
  })
  const validateWhitespace = (value) => {
    return hasWhitespace(value) ? 'No se permiten espacios en blanco' : undefined;
  };
  const alertConfirm = () => {
    var message = ""
    if (params.id) {
        message = "actualizada"
    } else {
        message = "agregada"
    }
    $.confirm({
        title: `Categoria ${message} con éxito!`,
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
                navigate("/categorias")
            },

        }
    })
}
  useEffect(() => {
    const loadEspecialidades = async () => {
      if (params.id) {
        const categoria = await getCategoria(params.id)
        setCategoria({
          nombre: categoria.nombre,
        })
        checkNombre(categoria.nombre)
      }
    }
    loadEspecialidades()
  }, [getCategoria, params.id])
  const [nombre, setNombre] = useState(true)
  const checkNombre = async (nombre) => {
    try {
      const response = await fetch(`https://apismovilconstru.onrender.com/checkCat/${nombre}/${params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (response.status === 203) {
        $.confirm({
          title: `El material ingresado ya existe, por favor intente con uno diferente`,
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

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Formik initialValues={categoria}
            enableReinitialize={true}
            validationSchema={CategoriaSchema}
            onSubmit={async (values) => {
              checkNombre(values.nombre)
              if (nombre === false) {
                if (params.id) {
                  await updateCategoria(params.id, values)
                  navigate("/categorias")
                  alertConfirm()
                } else {
                  await createCategoria(values)
                  navigate("/categorias")
                  alertConfirm("update")
                }                
              }
            }}
          >
            {({ handleChange, handleSubmit, values, isSubmitting, errors, touched, setFieldValue }) => (
              <Form onSubmit={handleSubmit} className="user">
                <div className="card text-center w-100">
                  <h2>{params.id ? "Editar" : "Agregar"} categoria</h2>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6 offset-md-3 mt-3">
                        <input type="text" className="form-control form-control-user" id="nombre" onChange={(e) =>{
                          handleChange(e)
                          checkNombre(e.target.value)
                        }} value={values.nombre} placeholder="Nombre*" onBlur={() => setFieldValue('nombre', values.nombre.trim())} // Eliminar espacios en blanco al salir del campo
                          validate={validateWhitespace} />
                        {errors.nombre && touched.nombre ? (
                          <div className="alert alert-danger" role="alert">{errors.nombre}</div>
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
                        <Link type="button" href="" className="btn btn-danger btn-icon-split w-50" to="/categorias">
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
