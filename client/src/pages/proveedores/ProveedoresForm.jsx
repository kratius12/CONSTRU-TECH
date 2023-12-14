import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useProveedores } from "../../context/proveedores/ProveedorProvider";
import proveedorSchema from './ProveedorValidator'
import Swal from 'sweetalert2';

export default function ProveedoresForm() {
    //   const [agreed, setAgreed] = useState(false)
    const { createProveedor, getProveedor, updateProveedor, Proveedores, searchNit } = useProveedores()
    useEffect(() => {
        Proveedores()
    }, [])


    const params = useParams()
    const navigate = useNavigate()
    const [proveedor, setProveedor] = useState({
        nombre: "",
        direccion: "",
        nit: "",
        tipo: "",
        estado: "",
        email: "",
        telefono: "",
        nombreContacto: "",
        telefonoContacto: "",
        emailContacto: ""
    })

    const alertConfirm = () => {
        $.confirm({
            title: `Proveedor guardado con exito!`,
            content: "Redirecionando a listado de empleados...",
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

    useEffect(() => {
        const loadProveedores = async () => {
            if (params.id) {
                const proveedor = await getProveedor(params.id)
                setProveedor({
                    nombre: proveedor.nombre,
                    direccion: proveedor.direccion,
                    nit: proveedor.nit,
                    tipo: proveedor.tipo,
                    estado: proveedor.estado,
                    email: proveedor.email,
                    telefono: proveedor.telefono,
                    nombreContacto: proveedor.nombreContacto,
                    telefonoContacto: proveedor.telefonoContacto,
                    emailContacto: proveedor.emailContacto
                })
            }
        }
        loadProveedores()
    }, [getProveedor, params.id])
    const [placeholders, setPlaceholders] = useState({
        nit: "Número de identificación*",
        nombre: "Nombre*",
    });
    const [tipo, setOpcionSeleccionada] = useState(''); // Estado para la opción seleccionada
    const [mostrarContacto, setMostrarContacto] = useState(false);
    const handleSelectChange = (event) => {
        const seleccion = event.target.value
        setOpcionSeleccionada(seleccion);
        if (seleccion === 'Juridico') {
            setMostrarContacto(true)
            setPlaceholders({
                nit: "Nit*",
                nombre: "Razón social*",
            });
        } else {
            setMostrarContacto(false)
            setPlaceholders({
                nit: "Número de identificación*",
                nombre: "Nombre*",
            });
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <Formik initialValues={proveedor}
                        enableReinitialize={true}
                        validationSchema={proveedorSchema}
                        onSubmit={async (values) => {
                            try {
                                const validateFact = await searchNit(values)
                                if (validateFact === true) {
                                    $.confirm({
                                        title: `Error`,
                                        content: `El `+placeholders.nit +`${values.nit} ya existe, por favor ingrese uno diferente`,
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
                                    })
                                } else {
                                    // El NIT no existe, procede con la creación o actualización del proveedor
                                    console.log(values);

                                    if (params.id) {
                                        await updateProveedor(params.id, values);
                                        navigate("/proveedores");
                                        alertConfirm();
                                    } else {
                                        await createProveedor(values);
                                        navigate("/proveedores");
                                        alertConfirm();
                                    }

                                    setProveedor({
                                        nombre: "",
                                        direccion: "",
                                        nit: "",
                                        tipo: "",
                                        estado: "",
                                        email: "",
                                        telefono: "",
                                        nombreContacto: "",
                                        telefonoContacto: "",
                                        emailContacto: ""
                                    });
                                }
                            } catch (error) {
                                console.error(error);
                                // Manejar errores de la solicitud al servidor
                            }
                        }}
                    >

                        {({ handleChange, handleSubmit, values, isSubmitting, errors, touched }) => (

                            <Form onSubmit={handleSubmit} className="user">
                                <div className="card text-center w-100">
                                    <h2>{params.id ? "Editar" : "Agregar"} proveedor</h2>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6 mt-3">
                                                <select id="tipo" className="form-select form-control-user" onChange={handleSelectChange} value={values.tipo = tipo}

                                                >
                                                    <option value="0">Seleccione el tipo de proveedor*</option>
                                                    <option value="Natural">Natural</option>
                                                    <option value="Juridico">Juridico</option>
                                                </select>
                                                {errors.tipo && touched.tipo ? (
                                                    <div className="alert alert-danger" role="alert">{errors.tipo}</div>
                                                ) : null}

                                            </div>
                                            <div className="col-md-6 mt-3">
                                                <input type="text" className="form-control form-control-user" id="nit" onChange={handleChange} value={values.nit} placeholder={placeholders.nit} />
                                                {errors.nit && touched.nit ? (
                                                    <div className="alert alert-danger" role="alert">{errors.nit}</div>
                                                ) : null}
                                            </div>
                                            <div className="col-md-6 mt-3">
                                                <input type="text" className="form-control form-control-user" id="nombre" onChange={handleChange} value={values.nombre} placeholder={placeholders.nombre} />
                                                {errors.nombre && touched.nombre ? (
                                                    <div className="alert alert-danger" role="alert">{errors.nombre}</div>
                                                ) : null}
                                            </div>

                                            <div className="col-md-6 mt-3">
                                                <input type="text" className="form-control form-control-user" id="email" onChange={handleChange} value={values.email} placeholder="Correo electrónico*" />
                                                {errors.email && touched.email ? (
                                                    <div className="alert alert-danger" role="alert">{errors.email}</div>
                                                ) : null}
                                            </div>
                                            <div className="col-md-6 mt-3">
                                                <input type="text" className="form-control form-control-user" id="direccion" onChange={handleChange} value={values.direccion} placeholder="Dirección*" />
                                                {errors.direccion && touched.direccion ? (
                                                    <div className="alert alert-danger" role="alert">{errors.direccion}</div>
                                                ) : null}
                                            </div>
                                            <div className="col-md-6 mt-3">
                                                <input type="text" className="form-control form-control-user" id="telefono" onChange={handleChange} value={values.telefono} placeholder="Teléfono*" />
                                                {errors.telefono && touched.telefono ? (
                                                    <div className="alert alert-danger" role="alert">{errors.telefono}</div>
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
                                                    ) : (
                                                        <select id="estado" className="form-select form-control-user" onChange={handleChange} value={values.estado} disabled>
                                                            <option value="1">Activo</option>
                                                        </select>
                                                    )
                                                }
                                                {/* {errors.estado && touched.estado ? (
                                                    <div className="alert alert-danger" role="alert">{errors.estado}</div>
                                                ) : null} */}
                                            </div>

                                        </div>
                                    </div>
                                    {mostrarContacto && (
                                        <div className="card-body">
                                            <h4>Datos de contacto del proveedor</h4>
                                            <div className="row">
                                                <div className="col-md-6 mt-3">
                                                    <input type="text" className="form-control form-control-user" id="nombreContacto" onChange={handleChange} value={values.nombreContacto} placeholder="Nombre del contacto*" />
                                                    {errors.nombreContacto && touched.nombreContacto ? (
                                                        <div className="alert alert-danger" role="alert">{errors.nombreContacto}</div>
                                                    ) : null}
                                                </div>
                                                <div className="col-md-6 mt-3">
                                                    <input type="text" className="form-control form-control-user" id="telefonoContacto" onChange={handleChange} value={values.telefonoContacto} placeholder="Teléfono del contacto*" />
                                                    {errors.telefonoContacto && touched.telefonoContacto ? (
                                                        <div className="alert alert-danger" role="alert">{errors.telefonoContacto}</div>
                                                    ) : null}
                                                </div>
                                                <div className="col-md-6 mt-3">
                                                    <input type="text" className="form-control form-control-user" id="emailContacto" onChange={handleChange} value={values.emailContacto} placeholder="Email del contacto*" />
                                                    {errors.emailContacto && touched.emailContacto ? (
                                                        <div className="alert alert-danger" role="alert">{errors.emailContacto}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    )}
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
                                                <a type="button" href="" className="btn btn-danger btn-icon-split w-50" onClick={() => navigate(`/proveedores`)}>
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
