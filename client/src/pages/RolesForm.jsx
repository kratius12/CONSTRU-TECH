import { useEffect, useState } from "react";
import { Form, Formik, Field } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useRol } from "../context/RolesProvider";
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

    const { createRol, getRol, updateRol, permisos, Permisos  } = useRol()
    useEffect(() => {
        Permisos()
    }, [])

    const alertConfirm = (type) => {
        var message =""
        if (type == "update") {
          message = "Actualizado"
        }else{
          message = "Agregado"
        }
        $.confirm({
          title:`Rol  `+message+` con exito!`,
          content:"Redirecionando a listado de roles...",
          icon: 'fa fa-check',
          theme: 'modern',
          closeIcon: true,
          animation: 'zoom',
          closeAnimation: 'scale',
          animationSpeed: 1500,
          type: 'green',
          columnClass:'col-md-6 col-md-offset-3',
          autoClose: 'okay|4000',
          buttons: {
              okay: function () {
              },
          }            
      })
    }

    const params = useParams()
    const navigate = useNavigate()
    const [rol, setRol] = useState({
        nombre: "",
        estado: "",
        permiso: []
    })

    useEffect(() => {
        const loadRoles = async () => {
            if (params.id) {
                const rol = await getRol(params.id)
                setRol({
                    nombre: rol.nombre,
                    estado: rol.estado,
                    permiso: rol.permiso,
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
                                alertConfirm()
                                setTimeout(
                                  navigate("/roles"),
                                  5000
                                )
                              } else {
                                await createRol(values)
                                alertConfirm()
                                setTimeout(
                                  navigate("/roles"),
                                  5000
                                )
                              }
                            setRol({
                                nombre: "",
                                estado: "",
                                permiso: []
                            })
                        }}
                    >
                        {({ handleChange, handleSubmit, values, isSubmitting, errors, touched }) => (
                            <Form onSubmit={handleSubmit}>
                                <div className="card text-center w-100">
                                    <div className="card-header bg-primary text-white">
                                        <h2>{params.id ? "Editar" : "Agregar"} Rol </h2>
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
                                            <div className="col-6 mt-3">
                                                <label htmlFor="estado" className="form-label">Estado <span className="text-danger">*</span></label>
                                                <select id="estado" className="form-select" onChange={handleChange} value={values.estado} >
                                                    <option value="">Seleccione estado</option>
                                                    <option value="1">Activo</option>
                                                    <option value="0">Inactivo</option>
                                                </select>
                                                {errors.estado && touched.estado ? (
                                                    <div className="alert alert-danger" roles="alert">{errors.estado}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer text-center">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <button type="submit" disabled={isSubmitting} className="btn btn-primary w-50">
                                                    <h4>{params.id ? "Guardar" : "Agregar"}</h4>
                                                </button>
                                            </div>
                                            <div className="col-md-6">
                                                <a type="button" href="" className="btn btn-danger w-50" onClick={() => navigate(`/roles`)}>
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
