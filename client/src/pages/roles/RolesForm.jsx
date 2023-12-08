import { useEffect, useState } from "react";
import { Form, Formik, Field } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useRol } from "../../context/roles/RolesProvider";
import * as Yup from 'yup';

const rolSchema = Yup.object().shape({
    nombre: Yup.string()
        .min(3, 'El nombre debe contener al menos 3 caracteres')
        .max(50, 'El nombre no puede contener mas de 50 caracteres')
        .required('El nombre es requerido'),
    estado: Yup.string()
        .required('El estado es requerido')
});
export default function RolesForm() {
    //   const [agreed, setAgreed] = useState(false)
    const { createRol, getRol, updateRol, Roles, permisos, Permisos} = useRol()
    useEffect(() => {
        Roles()
    }, [])
    useEffect(() => {
        Permisos()
    }, [])

    const params = useParams()
    const navigate = useNavigate()
    const [rol, setRol] = useState({
        nombre: "",
        estado: "",
        rol_permiso:[]
    })

    useEffect(() => {
        const loadRoles = async () => {
            if (params.id) {
                const rol = await getRol(params.id)
                setRol({
                    nombre: rol.nombre,
                    estado: rol.estado,
                    rol_permiso: rol_permiso.permiso
                    })
            }
        }
        loadRoles()
    }, [getRol, params.id])

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <Formik initialValues={rol}
                        enableReinitialize={true}
                        validationSchema={rolSchema}
                        onSubmit={async (values) => {
                            console.log(values);
                            if (params.id) {
                                await updateRol(params.id, values)
                                navigate("/roles")
                            } else {
                                await createRol(values)
                                navigate("/roles")
                            }
                            setRol({
                                nombre: "",
                                estado: ""
                            })
                        }}
                    >
                        {({ handleChange, handleSubmit, values, isSubmitting, errors, touched }) => (
                            <Form onSubmit={handleSubmit} className="user">
                                <div className="card text-center w-100">
                                        <h2>{params.id ? "Editar" : "Agregar"} rol </h2>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-6 mt-3">
                                                <input type="text" className="form-control form-control-user" id="nombre" onChange={handleChange} value={values.nombre} placeholder="Nombre*"/>
                                                {errors.nombre && touched.nombre ? (
                                                    <div className="alert alert-danger" role="alert">{errors.nombre}</div>
                                                ) : null}
                                            </div>
                                            <div className="col-6 mt-3">
                                                <select id="estado" className="form-select form-control-user"  onChange={handleChange} value={values.estado} >
                                                    <option value="">Seleccione estado</option>
                                                    <option value="1">Activo</option>
                                                    <option value="0">Inactivo</option>
                                                </select>
                                                {errors.estado && touched.estado ? (
                                                    <div className="alert alert-danger" role="alert">{errors.estado}</div>
                                                ) : null}
                                            </div>
                                            <div className="col-6 mt-3">
                                            <label>Selecciona permisos:</label>   
                                                    <Field
                                                          name="permiso"
                                                          as="select"
                                                          multiple
                                                          className="form-select "
                                                        >
                                                          {permisos.map(item => (
                                                            <option key={item.id} value={item.id}>
                                                              {item.permiso}
                                                            </option>
                                                          ))}
                                                    </Field>
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
                                                    <span className="text">{params.id ? "Guardar" : "Agregar"}</span>
                                                </button>
                                            </div>
                                            <div className="col-md-6">
                                                <a type="button" href="" className="btn btn-danger btn-icon-split w-50" onClick={() => navigate(`/roles`)}>
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
