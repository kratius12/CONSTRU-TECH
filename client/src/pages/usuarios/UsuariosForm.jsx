import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useUsuarios } from "../../context/usuarios/UsuariosProvider";
import UsuarioSchema from './UsuariosValidator'
import axios from "axios";

const fetchData = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};

export default function UsuariosForm() {
    const { createUsuario, getUsuario, updateUsuario, getRoles, getEmpleados, } = useUsuarios();
    useEffect(() => {
        getEmpleados()
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
    const [rol, setRol] = useState([])
    const [empleados, setEmpleado] = useState([])
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState({
        correo: "",
        contrasena: "",
        estado: 1,
        idRol: "",
        idEmp: ""
    })
    useEffect(() => {
        fetchData("http://localhost:4000/roles").then((data) => {
            setRol(data);
        });
        fetchData("http://localhost:4000/empleados").then((data) => {
            setEmpleado(data);
        });
    }, []);
    useEffect(() => {
        const loadUsuarios = async () => {
            if (params.id) {
                const usuario = await getUsuario(params.id)
                setUsuario({
                    correo: usuario.correo,
                    contrasena: usuario.contrasena,
                    estado: usuario.estado,
                    idRol: usuario.idRol === "0" ? "0" : "1",
                    idEmp: usuario.idEmp,
                })
            }
        }
        loadUsuarios()
    }, [getUsuario, params.id])

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <Formik initialValues={usuario}
                        enableReinitialize={true}
                        validationSchema={UsuarioSchema}
                        onSubmit={async (values) => {
                            const contrasenaEspacios = values.contrasena.replace(/\s{2,}/g, ' ').trim()
                            const usuariosObject = {
                                ...values,
                                contrasena: contrasenaEspacios,
                            }
                            console.log(values);
                            if (params.id) {
                                await updateUsuario(params.id, values)
                                alertConfirm()
                                setTimeout(
                                    navigate("/usuarios"),
                                    500
                                )
                            } else {
                                await createUsuario(values)
                                alertConfirm()
                                setTimeout(
                                    navigate("/usuarios"),
                                    500
                                )
                            }
                            setUsuario({
                                correo: "",
                                contrasena: "",
                                estado: "",
                                idRol: "",
                                idEmp: ""
                            })
                        }}
                    >
                        {({ handleChange, handleSubmit, values, isSubmitting, errors, touched }) => (
                            <Form onSubmit={handleSubmit} className="user">
                                <div className="card text-center w-100">
                                    <h2>{params.id ? "Editar" : "Agregar"} usuario</h2>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-6 mt-3">
                                                <input type="text" className="form-control form-control-user" id="correo" onChange={handleChange} value={values.correo} placeholder="Correo*" />
                                                {
                                                    errors.correo && touched.correo ? (
                                                        <div className="alert alert-danger" role="alert">{errors.correo}</div>
                                                    ) : null
                                                }
                                            </div>
                                            <div className="col-6 mt-3">
                                                <input type="password" className="form-control form-control-user" id="contrasena" onChange={handleChange} value={values.contrasena} placeholder="Contraseña*" />
                                                {
                                                    errors.contrasena && touched.contrasena ? (
                                                        <div className="alert alert-danger" role="alert">{errors.contrasena}</div>
                                                    ) : null
                                                }
                                            </div>
                                            <div className="col-6 mt-3">
                                                <select className="form-select form-control-user" id="idRol" value={values.idRol} onChange={handleChange}>
                                                    <option>Seleccione un rol*</option>
                                                    {rol.map((rol) => (
                                                        <option key={rol.idRol} value={rol.idRol}>{rol.nombre}</option>
                                                    ))}
                                                </select>
                                                {errors.idRol && touched.idRol ? (
                                                    <div className="alert alert-danger" role="alert">{errors.idRol}</div>
                                                ) : null}
                                            </div>
                                            <div className="col-6 mt-3">
                                                <select className="form-select form-control-user" id="idEmp" value={values.idEmp} onChange={handleChange}>
                                                    <option>Seleccione un empleado*</option>
                                                    {empleados.map((empleado) => (
                                                        <option key={empleado.idEmp} value={empleado.idEmp}>{empleado.nombre}</option>
                                                    ))}
                                                </select>
                                                {errors.idEmp && touched.idEmp ? (
                                                    <div className="alert alert-danger" role="alert">{errors.idEmp}</div>
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
                                            <br />
                                            <div className="col-md-6">
                                                <a type="button" href="" className="btn btn-danger btn-icon-split w-50" onClick={() => navigate(`/usuarios`)}>
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
