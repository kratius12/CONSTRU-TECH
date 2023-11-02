import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useProveedores } from "../context/ProveedorProvider";
import * as Yup from 'yup';

const proveedorSchema = Yup.object().shape({
    nombre: Yup.string()
        .min(3, 'El nombre debe contener al menos 3 caracteres')
        .max(50, 'El nombre no puede contener mas de 50 caracteres')
        .required('El nombre es requerido'),
    email: Yup.string().email('Formato de correo electronico invalido').required('Correo electronico requerido'),
    telefono: Yup.string()
        .min(7, 'El telefono debe contener al menos 7 caracteres')
        .max(12, 'El telefono no puede contener mas de 12 caracteres')
        .required('El telefono es requerido'),
    direccion: Yup.string()
        .min(5, 'La direccion debe contener al menos 5 caracteres')
        .max(50, 'La direccion no puede contener mas de 50 caracteres')
        .required('La direccion es requerida'),
    estado: Yup.string()
        .required('El estado es requerido'),
    nit: Yup.string()
        .min(14, 'El nit debe contener 14 digitos')
        .max(14, 'El nit debe tener como maximo 14 digitos')
        .required('El nit es requerido'),
    nombreContacto: Yup.string()
        .min(3, 'El nombre del contacto debe contener al menos 3 caracteres')
        .max(50, 'El nombre del contacto no puede contener mas de 50 caracteres')
        .required('El nombre del contacto es requerido'),
    telefonoContacto: Yup.string()
        .min(7, 'El telefono del contacto debe contener al menos 7 caracteres')
        .max(12, 'El telefono del contacto no puede contener mas de 12 caracteres')
        .required('El telefono del contacto es requerido'),
    emailContacto: Yup.string().email('Formato de correo electronico invalido').required('Correo electronico requerido'),
});
export default function ProveedoresForm() {
    //   const [agreed, setAgreed] = useState(false)
    const { createProveedor, getProveedor, updateProveedor, Proveedores } = useProveedores()
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

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <Formik initialValues={proveedor}
                        enableReinitialize={true}
                        validationSchema={proveedorSchema}
                        onSubmit={async (values) => {
                            console.log(values);
                            if (params.id) {
                                await updateProveedor(params.id, values)
                                navigate("/proveedores")
                            } else {
                                await createProveedor(values)
                                navigate("/proveedores")
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
                            })
                        }}
                    >
                        {({ handleChange, handleSubmit, values, isSubmitting, errors, touched }) => (
                            <Form onSubmit={handleSubmit}>
                                <div className="card text-center w-100">
                                    <div className="card-header bg-primary text-white">
                                        <h2>{params.id ? "Editar" : "Agregar"} proveedor</h2>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-6 mt-3">
                                                <label htmlFor="nombre" className="form-label">Nombre <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control" id="nombre" onChange={handleChange} value={values.nombre} />
                                                {errors.nombre && touched.nombre ? (
                                                    <div className="alert alert-danger" role="alert">{errors.nombre}</div>
                                                ) : null}
                                            </div>
                                            <div className="col-6 mt-3">
                                                <label htmlFor="nit" className="form-label">Nit <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control" id="nit" onChange={handleChange} value={values.nit} />
                                                {errors.nit && touched.nit ? (
                                                    <div className="alert alert-danger" role="alert">{errors.nit}</div>
                                                ) : null}
                                            </div>
                                            <div className="col-6 mt-3">
                                                <label htmlFor="email" className="form-label">Correo electronico <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control" id="email" onChange={handleChange} value={values.email} />
                                                {errors.email && touched.email ? (
                                                    <div className="alert alert-danger" role="alert">{errors.email}</div>
                                                ) : null}
                                            </div>
                                            <div className="col-6 mt-3">
                                                <label htmlFor="direccion" className="form-label">Dirección <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control" id="direccion" onChange={handleChange} value={values.direccion} />
                                                {errors.direccion && touched.direccion ? (
                                                    <div className="alert alert-danger" role="alert">{errors.direccion}</div>
                                                ) : null}
                                            </div>
                                            <div className="col-6 mt-3">
                                                <label htmlFor="telefono" className="form-label">Teléfono <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control" id="telefono" onChange={handleChange} value={values.telefono} />
                                                {errors.telefono && touched.telefono ? (
                                                    <div className="alert alert-danger" role="alert">{errors.telefono}</div>
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
                                            <div className="col-6 mt-3">
                                                <label htmlFor="tipo" className="form-label">Tipo proveedor <span className="text-danger">*</span></label>
                                                <select id="tipo" className="form-select" onChange={handleChange} value={values.tipo} >
                                                    <option value="">Seleccione tipo</option>
                                                    <option value="Natural">Natural</option>
                                                    <option value="Juridico">Juridico</option>
                                                </select>
                                                {errors.tipo && touched.tipo ? (
                                                    <div className="alert alert-danger" role="alert">{errors.tipo}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                    <h4>Datos de contacto del proveedor</h4>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-6 mt-3">
                                                <label htmlFor="nombreContacto" className="form-label">Nombre <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control" id="nombreContacto" onChange={handleChange} value={values.nombreContacto} />
                                                {errors.nombreContacto && touched.nombreContacto ? (
                                                    <div className="alert alert-danger" role="alert">{errors.nombreContacto}</div>
                                                ) : null}
                                            </div>
                                            <div className="col-6 mt-3">
                                                <label htmlFor="telefonoContacto" className="form-label">Telefono <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control" id="telefonoContacto" onChange={handleChange} value={values.telefonoContacto} />
                                                {errors.telefonoContacto && touched.telefonoContacto ? (
                                                    <div className="alert alert-danger" role="alert">{errors.telefonoContacto}</div>
                                                ) : null}
                                            </div>
                                            <div className="col-6 mt-3">
                                                <label htmlFor="emailContacto" className="form-label">Correo electronico <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control" id="emailContacto" onChange={handleChange} value={values.emailContacto} />
                                                {errors.emailContacto && touched.emailContacto ? (
                                                    <div className="alert alert-danger" role="alert">{errors.emailContacto}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer text-center">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <button type="submit" disabled={isSubmitting} className="btn btn-primary w-50">
                                                    <h4>{params.id ? "Editar" : "Agregar"}</h4>
                                                </button>
                                            </div>
                                            <div className="col-md-6">
                                                <a type="button" href="" className="btn btn-danger w-50" onClick={() => navigate(`/proveedores`)}>
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
