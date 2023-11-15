import { Form, Formik, Field } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useObras } from "../context/ObrasProvider";
import ObraSchema from "../components/ValidatorObra";
function ObrasForm() {

    const {createObra, getObra, updateObra, clientes, Clientes, materiales, Materiales, empleados, Empleados} = useObras()
    const params = useParams()
    const navigate = useNavigate()
    const [obra, setObra] = useState({
        descripcion:"",
        cantidad:"",
        estado:"",
        fechaini:"",
        fechafin:"",
        cliente:"",
        empleados:"",
        material:""
    })
    
    useEffect(() =>{
        const loadObras = async () => {
            if (params.id) {
                const obra = await getObra(params.id)
                setObra({
                    descripcion:obra.descripcion,
                    cantidad:obra.cantidad,
                    estado:obra.estado,
                    fechaini:obra.fechaini,
                    fechafin:obra.fechafin,
                    cliente:obra.idCliente,
                })                
            }
        }
        Clientes()
        Materiales()
        Empleados()
        loadObras()
    }, [params.id])

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <Formik initialValues={obra}
                        enableReinitialize={true}
                        validationSchema={ObraSchema}
                        onSubmit={ async (values) =>{
                            console.log(values)
                            if (params.id) {
                            await updateObra(params.id, values)
                            navigate("/obras")
                            }else{
                            await createObra(values)
                            navigate("/obras")
                            }
                            setObra({
                                descripcion:"",
                                cantidad:"",
                                estado:"",
                                fechaini:"",
                                fechafin:"",
                                cliente:"",
                                empleado:""
                            })
                        }}>
                            {({handleChange, handleSubmit, values, isSubmitting, errors, touched}) => (
                            <Form onSubmit={handleSubmit}>
                                <div className="card text-center w-100">
                                    <div className="card-header bg-primary text-white">
                                        <h2>{params.id ? "Editar":"Agregar"} Obra</h2>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            {
                                            params.id ? (
                                            <>
                                            
                                            <div className="col-md-6 mt-3">
                                                <label htmlFor="descripcion" className="form-label">Descripcion<span className="text-danger">*</span></label>
                                                <input type="text" className="form-control" id="descripcion" onChange={handleChange} value={values.descripcion} />
                                                {errors.descripcion && touched.descripcion ? (
                                                    <div className="alert alert-danger" role="alert">{errors.descripcion}</div>
                                                ) : null} 
                                            </div>
                                            <div className="col-md-6 mt-3">
                                                <label htmlFor="cliente" className="form-label">Cliente<span className="text-danger">*</span></label>
                                                <Field className="form-select"
                                                name="cliente"
                                                as="select"
                                                >
                                                
                                                {clientes.map(item => (
                                                    <option key={item.idCli} value={item.idCli}>
                                                    {item.nombre}
                                                    </option>
                                                    ))}
                                                </Field>
                                                {errors.cliente && touched.cliente ? (
                                                <div className="alert alert-danger" role="alert">{errors.cliente}</div>
                                                ) : null}                         
                                            </div>
                                            <div className="col-md-6 mt-3">
                                                <label htmlFor="empleados" className="form-label">Empleados<span className="text-danger">*</span></label>
                                                <Field className="form-select"
                                                name="empleados"
                                                as="select"
                                                multiple
                                                >
                                                {empleados.map(item => (
                                                    <option key={item.idEmp} value={item.idEmp}>
                                                    {item.nombre} - {item.cedula}
                                                    </option>
                                                    ))}
                                                </Field>
                                                {errors.empleados && touched.empleados ? (
                                                <div className="alert alert-danger" role="alert">{errors.empleados}</div>
                                                ) : null}                         
                                            </div>
                                            <div className="col-md-6 mt-3">
                                                <label htmlFor="material" className="form-label">Materiales<span className="text-danger">*</span></label>
                                                <Field className="form-select"
                                                name="material"
                                                as="select"
                                                multiple
                                                >
                                                {materiales.map(item => (
                                                    <option key={item.idMat} value={item.idMat}>
                                                    {item.nombre}
                                                    </option>
                                                    ))}
                                                </Field>
                                                {errors.material && touched.material ? (
                                                <div className="alert alert-danger" role="alert">{errors.material}</div>
                                                ) : null}                         
                                            </div> 
                                            <div className="col-md-6 mt-3">
                                                <label htmlFor="fechaini" className="form-label">Fecha inicio<span className="text-danger">*</span></label>
                                                <input type="date" className="form-control" id="fechaini" onChange={handleChange} value={values.fechaini} />
                                                {errors.fechaini && touched.fechaini ? (
                                                <div className="alert alert-danger" role="alert">{errors.fechaini}</div>
                                                ) : null}
                                            </div>
                                            </>                                                
                                            ):(
                                            <>
                                                <div className="col-md-6 mt-3">
                                                    <label htmlFor="descripcion" className="form-label">Descripcion<span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="descripcion" onChange={handleChange} value={values.descripcion} />
                                                    {errors.descripcion && touched.descripcion ? (
                                                        <div className="alert alert-danger" role="alert">{errors.descripcion}</div>
                                                    ) : null} 
                                                </div>
                                                <div className="col-md-6 mt-3">
                                                    <label htmlFor="cliente" className="form-label">Cliente<span className="text-danger">*</span></label>
                                                    <Field className="form-select"
                                                    name="cliente"
                                                    as="select"
                                                    >
                                                    <option value="">Seleccione Cliente</option>
                                                    {clientes.map(item => (
                                                        <option key={item.idCli} value={item.idCli}>
                                                        {item.nombre}
                                                        </option>
                                                        ))}
                                                    </Field>
                                                    {errors.cliente && touched.cliente ? (
                                                    <div className="alert alert-danger" role="alert">{errors.cliente}</div>
                                                    ) : null}                         
                                                </div>
                                                <div className="col-md-6 mt-3">
                                                    <label htmlFor="empleados" className="form-label">Asignar asesor<span className="text-danger">*</span></label>
                                                    <Field className="form-select"
                                                    name="empleados"
                                                    as="select"
                                                    >
                                                    <option value="">Seleccione asesor</option>
                                                    {empleados.map(item => (
                                                        <option key={item.idEmp} value={item.idEmp}>
                                                        {item.nombre} - {item.cedula}
                                                        </option>
                                                        ))}
                                                    </Field>
                                                    {errors.empleados && touched.empleados ? (
                                                    <div className="alert alert-danger" role="alert">{errors.empleados}</div>
                                                    ) : null}                         
                                                </div>
                                                <div className="col-md-6 mt-3">
                                                    <label htmlFor="fechaini" className="form-label">Fecha inicio<span className="text-danger">*</span></label>
                                                    <input type="date" className="form-control" id="fechaini" onChange={handleChange} value={values.fechaini} />
                                                    {errors.fechaini && touched.fechaini ? (
                                                    <div className="alert alert-danger" role="alert">{errors.fechaini}</div>
                                                    ) : null}
                                                </div>                                                
                                            </>
                                            )
                                            }
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
                                                <a type="button" href="" className="btn btn-danger w-50" onClick={()=> navigate(`/obras`)}>
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

export default ObrasForm