import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { usePermiso } from "../../context/permisos/PermisosProvider";
import permisoSchema from './PermisosValidator'

export default function UsuariosForm() {
    const { createPermiso, getPermiso, updatePermiso, Permisos } = usePermiso();
    useEffect(() => {
            Permisos()
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
            title: `Permiso ` + message + ` con exito!`,
            content: "Redirecionando a listado de usuarios...",
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
    const [permiso, setPermiso] = useState({
        permiso: "",
        estado: 1
    })
    useEffect(() => {
        const loadUsuarios = async () => {
            if (params.id) {
                const permiso = await getPermiso(params.id)
                setPermiso({
                    permiso: permiso.permiso,
                    estado: permiso.estado === "0" ? "0" :  "1"
                })
            }
        }
        loadUsuarios()
    }, [getPermiso, params.id])

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <Formik initialValues={permiso}
                        enableReinitialize={true}
                        validationSchema={permisoSchema}
                        onSubmit={async (values) => {
                            console.log(values);
                            if (params.id) {
                                await updatePermiso(params.id, values)
                                alertConfirm()
                                setTimeout(
                                    navigate("/permisos"),
                                    500
                                )
                            } else {
                                await createPermiso(values)
                                alertConfirm()
                                setTimeout(
                                    navigate("/permisos"),
                                    500
                                )
                            }
                            setPermiso({
                                permiso: "",
                                estado: ""
                            })
                        }}
                    >
                        {({ handleChange, handleSubmit, values, isSubmitting, errors, touched }) => (
                            <Form onSubmit={handleSubmit} className="user">
                                <div className="card text-center w-100">
                                    <h2>{params.id ? "Editar" : "Agregar"} permiso</h2>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-6 mt-3">
                                                <input type="text" className="form-control form-control-user" id="permiso" onChange={handleChange} value={values.permiso} placeholder="Nombre*" />
                                                {
                                                    errors.permiso && touched.permiso ? (
                                                        <div className="alert alert-danger" role="alert">{errors.permiso}</div>
                                                    ) : null
                                                }
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
                                            <br />
                                            <div className="col-md-6">
                                                <a type="button" href="" className="btn btn-danger btn-icon-split w-50" onClick={() => navigate(`/permisos`)}>
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
