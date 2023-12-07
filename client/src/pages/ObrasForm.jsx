import { Form, Formik, Field } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import  Select  from "react-select";
import { useObras } from "../context/ObrasProvider";
import ObraSchema from "../components/ValidatorObra";
function ObrasForm() {

    const { createObra, getObra, updateObra, clientes, Clientes, materiales, Materiales, empleados, Empleados } = useObras()
    const params = useParams()
    const navigate = useNavigate()
    const [keyMat, setKeyMat] = useState(0)
    const [keyEmp, setKeyEmp] = useState(0)
    const [keyCli, setKeyCli] = useState(0)
    const [keyEstado, setKeyEstado] = useState(0)

    const [optionsMat, setOptionsMat] = useState([])
    const [defaultOptionsMat, setDefaultOptionsMat] = useState([])
    const [selectedMat, setSelectedMat] = useState(defaultOptionsMat)  

    const [optionsEmp, setOptionsEmp] = useState([])
    const [defaultOptionsEmp, setDefaultOptionsEmp] = useState([]) 
    const [selectedEmp, setSelectedEmp] = useState(defaultOptionsEmp)  

    const [optionsCli, setOptionsCli] = useState([]);
    const [defaultOptionsCli, setDefaultOptionsCli] = useState([]);  
    const [selectedCli, setSelectedCli] = useState(defaultOptionsCli)      

    const optionsEstado = [
        {value:1, label: 'En asesoria'},
        {value:0, label: 'Pendiente'},
        {value:2, label: 'En construcción'},
        {value:3, label: 'Terminado'}
    ]

    const [obra, setObra] = useState({
        descripcion: "",
        area: "",
        estado: "",
        fechaini: "",
        fechafin: "",
        cliente: "",
        empleados: [],
        material: []
    })

    useEffect(() => {
        const loadObras = async () => {
            if (params.id) {
                const obra = await getObra(params.id)
                setObra({
                    descripcion: obra.descripcion,
                    area: obra.area,
                    estado: obra.estado,
                    fechaini: obra.fechaini,
                    fechafin: obra.fechafin,
                    cliente: obra.cliente.idCliente,
                    empleados: obra.empleado_obra,
                    material: obra.materiales_obras
                })
                const defaultOptsEmp = obra.empleado_obra.map(item => ({value: item.empleado.idEmp, label:item.empleado.nombre}))
                setDefaultOptionsEmp(defaultOptsEmp)
                setKeyEmp(prevKey => prevKey + 1) 

                const defaultOptsMat = obra.materiales_obras.map(item => ({value: item.materiales.idMat, label:item.materiales.nombre}))
                setDefaultOptionsMat(defaultOptsMat)
                setKeyMat(prevKey => prevKey + 1)      
                
                const defaultOptionsCli = [
                    {
                        value: obra.cliente.idCli, label: obra.cliente.nombre
                    }
                ]
                setDefaultOptionsCli(defaultOptionsCli)
                setKeyCli(prevKey => prevKey + 1)
                setKeyEstado(prevKey => prevKey + 1)
            }
        }
        const fetchData = async () =>{
            const materialesData = await Materiales()
            const opcionesMat = materialesData.map(item => ({value:item.idMat, label:item.nombre}))
            setOptionsMat(opcionesMat)

            const empleadosData = await Empleados()
            const opcionesEmp = empleadosData.map(item => ({value:item.idEmp, label:item.nombre+'-'+item.apellido}))
            setOptionsEmp(opcionesEmp)

            const clientesData = await Clientes()
            const opcionesClientes = clientesData.map(item => ({value: item.idCli, label:item.nombre}))
            setOptionsCli(opcionesClientes)
            setKeyEstado(prevKey => prevKey + 1)
          }
        fetchData()        
        // Clientes()
        // Materiales()
        // Empleados()
        loadObras()
    }, [])
console.log(defaultOptionsCli);
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <Formik initialValues={obra}
                        enableReinitialize={true}
                        validationSchema={ObraSchema}
                        onSubmit={async (values) => {

                            const obraObject ={
                                ...values,
                                empleados:defaultOptionsEmp,
                                cliente:defaultOptionsCli,
                                material:selectedMat
                            }
                            console.log(obraObject)
                            if (params.id) {
                                await updateObra(params.id, obraObject)
                                navigate("/obras")
                            } else {
                                await createObra(obraObject)
                                navigate("/obras")
                            }
                            setObra({
                                descripcion: "",
                                area: "",
                                estado: "",
                                fechaini: "",
                                fechafin: "",
                                cliente: "",
                                empleados: [],
                                material:[]
                            })
                        }}>
                        {({ handleChange, handleSubmit, handleBlur, setFieldValue, setFieldTouched, values, isSubmitting, errors, touched }) => (
                            <Form onSubmit={handleSubmit} className="user">
                                <div className="card text-center w-100">
                                    <div className="card-header bg-primary text-white">
                                        <h2>{params.id ? "Editar" : "Agregar"} obra</h2>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            {
                                            params.id ? (
                                                <>
                                                <div className="col-md-6 mt-3">
                                                <label htmlFor="descripcion" className="form-label">Descripcion de la obra<span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control form-control-user" id="descripcion" onChange={handleChange} value={values.descripcion} placeholder="Descripción de la obra*" />
                                                    {errors.descripcion && touched.descripcion ? (
                                                        <div className="alert alert-danger" role="alert">{errors.descripcion}</div>
                                                    ) : null}
                                                </div>
                                                <div className="col-md-6 mt-3">
                                                <label htmlFor="area" className="form-label">Área de la obra<span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control form-control-user" id="area" onChange={handleChange} value={values.area} placeholder="Descripción de la obra*" />
                                                    {errors.area && touched.area ? (
                                                        <div className="alert alert-danger" role="alert">{errors.area}</div>
                                                    ) : null}
                                                </div>
                                                <div className="col-md-6 mt-3">
                                                    <label htmlFor="cliente" className="form-label">Cliente<span className="text-danger">*</span></label>
                                                    <Select
                                                    key={keyCli}
                                                    placeholder={<div>Selecciona cliente</div>}
                                                    defaultValue={defaultOptionsCli}
                                                    name="cliente"
                                                    options={optionsCli}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    onChange={(selectedCli) => setSelectedCli(selectedCli)}
                                                    onBlur={(selectedCli) => setSelectedCli(selectedCli)}
                                                    />
                                                    {errors.cliente && touched.cliente ? (
                                                        <div className="alert alert-danger" role="alert">{errors.cliente}</div>
                                                    ) : null}
                                                </div>
                                                <div className="col-md-6 mt-3">
                                                    <label htmlFor="cliente" className="form-label">Estado<span className="text-danger">*</span></label>
                                                    <Select
                                                    key={keyEstado}
                                                    placeholder={<div>Selecciona estado</div>}
                                                    name="cliente"
                                                    value={values.estado}
                                                    options={optionsEstado}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    onChange={(selectedOption) => setFieldValue('estado',selectedOption)}
                                                    onBlur={() => setFieldTouched('estado', true)}
                                                    />
                                                    {errors.cliente && touched.cliente ? (
                                                        <div className="alert alert-danger" role="alert">{errors.cliente}</div>
                                                    ) : null}
                                                </div>                                                
                                                <div className="col-md-6 mt-3">
                                                    <label htmlFor="empleados" className="form-label">Empleados<span className="text-danger">*</span></label>
                                                    <Select
                                                    placeholder={<div>Selecciona Empleados</div>}
                                                    key={keyEmp}
                                                    defaultValue={defaultOptionsEmp}
                                                    isMulti
                                                    name="empleados"
                                                    options={optionsEmp}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    onChange={(selectedOption) => setFieldValue('empleados', selectedOption)}
                                                    onBlur={() => setFieldTouched('empleados', true)}
                                                    />
                                                    {errors.empleados && touched.empleados ? (
                                                        <div className="alert alert-danger" role="alert">{errors.empleados}</div>
                                                    ) : null}
                                                </div>
                                                <div className="col-md-6 mt-3">
                                                    <label htmlFor="material" className="form-label">Materiales<span className="text-danger">*</span></label>
                                                    <Select
                                                    placeholder={<div>Selecciona Materiales</div>}
                                                    key={keyMat}
                                                    defaultValue={defaultOptionsMat}
                                                    isMulti
                                                    name="material"
                                                    options={optionsMat}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    onChange={(selectedMat) => setFieldValue('material', selectedMat)}
                                                    onBlur={() => setFieldTouched('material', true)}
                                                    />
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
                                                <div className="col-md-6 mt-3">
                                                    <label htmlFor="fechafin" className="form-label">Fecha fin<span className="text-danger">*</span></label>
                                                    <input type="date" className="form-control" id="fechafin" onChange={handleChange} value={values.fechafin} />
                                                    {errors.fechafin && touched.fechafin ? (
                                                        <div className="alert alert-danger" role="alert">{errors.fechafin}</div>
                                                    ) : null}
                                                </div>                                                
                                                </>
                                            ) : (
                                                <>
                                                <div className="col-md-6 mt-3">
                                                    <label htmlFor="descripcion" className="form-label">Descripción<span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="descripcion" onChange={handleChange} value={values.descripcion} />
                                                    {errors.descripcion && touched.descripcion ? (
                                                        <div className="alert alert-danger" role="alert">{errors.descripcion}</div>
                                                    ) : null}
                                                </div>
                                                <div className="col-md-6 mt-3">
                                                    <label htmlFor="cliente" className="form-label">Cliente<span className="text-danger">*</span></label>
                                                    <Select
                                                    placeholder={<div>Selecciona cliente</div>}
                                                    defaultValue={defaultOptionsCli}
                                                    name="cliente"
                                                    options={optionsCli}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    onChange={(selectedCli) => setSelectedCli(selectedCli)}
                                                    />
                                                    {errors.cliente && touched.cliente ? (
                                                        <div className="alert alert-danger" role="alert">{errors.cliente}</div>
                                                    ) : null}
                                                </div>
                                                <div className="col-md-6 mt-3">
                                                    <label htmlFor="estado" className="form-label">Estado<span className="text-danger">*</span></label>
                                                    <Select
                                                    key={keyEstado}
                                                    placeholder={<div>Selecciona estado</div>}
                                                    defaultValue={optionsEstado}
                                                    name="estado"
                                                    options={[{value:1, label:'En Asesoría'},{value:0, label:'Pendiente'}]}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    onChange={(selectedOption) => setFieldValue('estado',selectedOption)}
                                                    onBlur={() => setFieldTouched('estado', true)}
                                                    />
                                                    {errors.estado && touched.estado ? (
                                                        <div className="alert alert-danger" role="alert">{errors.estado}</div>
                                                    ) : null}
                                                </div>                                                
                                                <div className="col-md-6 mt-3">
                                                    <label htmlFor="empleados" className="form-label">Asignar asesor<span className="text-danger">*</span></label>
                                                    <Select
                                                    key={keyEmp}
                                                    placeholder={<div>Asignar asesor</div>}
                                                    value={values.empleados}
                                                    name="empleados"
                                                    options={optionsEmp}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    onChange={(selectedEmp) => setSelectedEmp(selectedEmp)}
                                                    
                                                    />
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
                                                <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-icon-split w-50">
                                                    <span className="icon text-white-50">
                                                        <i className="fas fa-plus"></i>
                                                    </span>
                                                    <span className="text">{params.id ? "Editar" : "Agregar"}</span>
                                                </button>
                                            </div>
                                            <div className="col-md-6">
                                                <a type="button" href="" className="btn btn-danger btn-icon-split w-50" onClick={() => navigate(`/obras`)}>
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

export default ObrasForm