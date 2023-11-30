import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useUsuario } from "../context/UsuariosProvider";
// import usuarioSchema from "./UsuariosValidator";



export default function UsuariosForm() {
  //   const [agreed, setAgreed] = useState(false)
  const { createUsuario, getUsuario, updateUsuario, getRoles } = useUsuario()
  useEffect(() => {
    getRoles()
  }, [])

 
  const alertConfirm = (type) => {
    var message = ""
    if (type == "update") {
      message = "Actualizado"
    } else {
      message = "Agregado"
    }
    // eslint-disable-next-line no-undef
    $.confirm({
      title: `Usuario ` + message + ` con exito!`,
      content: "Redirecionando a listado de materiales...",
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
        },
      }
    })
  }
  const params = useParams()
  const navigate = useNavigate()
  const [usuarios, setUsuarios] = useState({
    correo: "",
    contrasena: "",
    idRol: "",
    estado: ""
  })

  useEffect(() => {
    const loadUsuarios = async () => {
      if (params.id) {
        const usuarios = await getUsuario(params.id)
        setUsuarios({
          nombre: usuarios.correo,
          contrasena: usuarios.contrasena,
          cantidad: usuarios.idRol,
          idCategoria: usuarios.idCategoria,
          estado: usuarios.estado
        })
      }
    }

    loadUsuarios()

  }, [getMaterial, params.id])

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Formik initialValues={material}
            enableReinitialize={true}
            validationSchema={materialSchema}
            onSubmit={async (values) => {
              console.log(values);
              if (params.id) {
                await updateMaterial(params.id, values)
                alertConfirm()
                setTimeout(
                  navigate("/materiales"),
                  500
                )
              } else {
                await createMaterial(values)
                alertConfirm()
                setTimeout(
                  navigate("/materiales"),
                  500
                )
              }
              setUsuarios({
                nombre: "",
                idProveedor: "",
                cantidad: "",
                idCategoria: "",
                estado: ""
              })
            }}
          >
            {({ handleChange, handleSubmit, values, isSubmitting, errors, touched }) => (
              <Form onSubmit={handleSubmit} className="user">
                <div className="card text-center w-100">
                    <h2>{params.id ? "Editar" : "Agregar"} material</h2>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6 mt-3">
                        <input type="text" className="form-control form-control-user" id="nombre" onChange={handleChange} value={values.nombre} placeholder="Nombre*"/>
                        {errors.nombre && touched.nombre ? (
                          <div className="alert alert-danger" role="alert">{errors.nombre}</div>
                        ) : null}
                      </div>
                      <div className="col-6 mt-3">
                        <input type="number" className="form-control form-control-user" id="cantidad" onChange={handleChange} value={values.cantidad} placeholder="Cantidad*"/>
                        {errors.cantidad && touched.cantidad ? (
                          <div className="alert alert-danger" role="alert">{errors.cantidad}</div>
                        ) : null}
                      </div>
                      <div className="col-6 mt-3">
                        <select className="form-select form-control-user" id="idCategoria" value={values.idRol} onChange={handleChange}>
                          <option >Seleccione una categoria*</option>
                          {roles.map((rol, e) => (
                            <option key={e} value={rol.idRol}>{rol.nombre}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-6 mt-3">
                        <select className="form-select form-control-user" id="idProveedor" value={values.idProveedor } onChange={handleChange}>
                          <option value="">Seleccione un proveedor*</option>
                          {proveedores.map((proveedor, i) => (
                            <option key={i} value={proveedor.idProv}>{proveedor.nombre}</option>
                          ))}
                        </select>
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
                        <a type="button" href="" className="btn btn-danger btn-icon-split w-50" onClick={() => navigate(`/materiales`)}>
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