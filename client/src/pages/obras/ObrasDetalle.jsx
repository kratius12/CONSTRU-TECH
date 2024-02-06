import axios from "axios";
import Select from "react-select";
import { Form, Formik, Field } from "formik";
import { useEffect, useState } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Card } from "reactstrap"
import { useNavigate, useParams } from "react-router-dom";
import { useObras } from "../../context/obras/ObrasProvider";
import {actividad, obraSchemaEdit} from "./ValidateObra"
const fetchData = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

const fetchMaterial = async (url) => {
    try {
        const responseMat = await axios.get(url);
        return responseMat.data.map((item) => ({
            value: item.idMat,
            label: item.nombre
        }))
    } catch (error) {
        console.error("Error fetching materiales:", error);
    }
}

const fetchEmpleados = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data.map((item) => ({
            value: item.idEmp,
            label: item.nombre,
        }));
    } catch (error) {
        console.error("Error fetching empleados:", error);
        return [];
    }
};

const ObraDetalle = () => {
    const { createActividad, updateObra } = useObras()
    const { id } = useParams()
    const params = useParams()
    const [obra, setObra] = useState(null);
    const navigate = useNavigate()
    const [modalVisible, setModalVisible] = useState(false)
    const [cliente, setCliente] = useState([])
    const [materiales, setMateriales] = useState([])
    const [empleados, setEmpleados] = useState([])
    const [asesores, setAsesores] = useState([])
    const [actividades, setActividades] = useState([])

    const handleAgregarActividad = () => {
        setModalVisible(true)
    }
    const handleCerrarForm = () => {

        setModalVisible(false);
    };
    const alertConfirm = () => {
        var message = ""
        if (params.id) {
            message = "actualizada"
        } else {
            message = "agregada"
        }
        // eslint-disable-next-line no-undef
        $.confirm({
            title: `Obra ${message} con éxito!`,
            content: "Redireccionando a listado de materiales...",
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
                    navigate("/obras")
                },

            }
        })
    }
    const alertConfirmAct = () => {
        $.confirm({
            title: `Actividad guardada con éxito!`,
            content: "Redireccionando a listado de materiales...",
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
                    navigate(`/detalleObra/${id}`)
                },
            }
        })
    }
    useEffect(() => {
        const fetchObraDetalle = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/obra/${id}`);
                setObra(response.data)
                console.log(response.data)
            } catch (error) {
                console.error("Ocurrio un error al obtener la información de la obra")
            }
        }
        const loadMaterialesEmpleados = async () => {
            const materialesData = await fetchMaterial("http://localhost:4000/materialesAc");
            const empleadosData = await fetchEmpleados("http://localhost:4000/empleadosAct");
            setMateriales(materialesData);
            setEmpleados(empleadosData);
        };

        fetchData("http://localhost:4000/clientes").then((data) => {
            setCliente(data);
        });
        fetchData(`http://localhost:4000/actividades/${params.id}`).then((data) => {
            setActividades(data)
            console.log(data)
        })

        fetchData("http://localhost:4000/empleadosAct").then((data) => {
            setAsesores(data)
        });
        loadMaterialesEmpleados()
        fetchObraDetalle()
    }, [id]);
    if (!obra) {
        return <div>Error al cargar la información de la obra</div>
    }

    return (
        <div>
            <Formik
                initialValues={obra}
                enableReinitialize={true}
                validationSchema={obraSchemaEdit}
                onSubmit={(values) => {
                    updateObra(id, values)
                    alertConfirm("update")
                    navigate("/obras")
                }}
            >
                {({ values, isSubmitting, errors, touched, handleSubmit, handleChange }) => (
                    <Form
                        className="user"
                        onSubmit={handleSubmit}
                    >
                        <div className='card text-center w-100'>
                            <h2>Detalle de obra</h2>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-md-3 mt-3 mx-auto'>
                                        <label htmlFor="idCliente">Seleccione el cliente:</label>
                                        <Field as="select" name="idCliente" label="idCliente" className="form-select form-control-user" value={values.idCliente}>
                                            <option value="">Seleccione el cliente</option>
                                            {cliente.map((cliente) => (
                                                <option key={cliente.idCli} value={cliente.idCli}>
                                                    {cliente.nombre}
                                                </option>
                                            ))}
                                        </Field>
                                        {
                                            errors.idCliente && touched.idCliente ? (
                                                <div className="alert alert-danger">{errors.idCliente}</div>
                                            ) : null
                                        }
                                    </div>
                                    <div className='col-md-3 mt-3 mx-auto'>
                                        <label htmlFor="idEmp">Seleccione el asesor:</label>
                                        <Field as="select" id="idEmp" name="idEmp" label="idEmp" className="form-select form-control-user" value={values.idEmp}>
                                            <option value="">Seleccione un asesor</option>
                                            {asesores.map((empleado) => (
                                                <option key={empleado.idEmp} value={empleado.idEmp}>
                                                    {empleado.nombre}
                                                </option>
                                            ))}
                                        </Field>
                                        {
                                            errors.empleado && touched.empleado ? (
                                                <div className="alert alert-danger">{errors.empleado}</div>
                                            ) : null
                                        }
                                    </div>

                                    <div className='col-md-3 mt-3 mx-auto'>
                                        <label htmlFor="area">Ingrese el area de la obra</label>
                                        <Field type="text" name="area" label="Area" className="form-control form-control-user" placeholder="Area" />
                                        {
                                            errors.area && touched.area ? (
                                                <div className="alert alert-danger">{errors.area}</div>
                                            ) : null
                                        }
                                    </div>
                                    <div className='col-md-3 mt-3 mx-auto'>
                                        <label htmlFor="fechaini">Seleccione la fecha de inicio de la obra</label>
                                        <input type="date" name="fechaini" label="Fecha Inicio" className="form-control form-control-user" value={values.fechaini} onChange={handleChange} />
                                        {
                                            errors.fechaini && touched.fechaini ? (
                                                <div className="alert alert-danger">{errors.fechaini}</div>
                                            ) : null
                                        }
                                    </div>
                                    <div className='col-md-3 mt-3 mx-auto'>
                                        <label htmlFor="fechafin">Seleccione la fecha de fin de la obra</label>
                                        <input type="date" name="fechafin" label="Fecha Fin" className="form-control form-control-user" value={values.fechafin} onChange={handleChange} />
                                        {
                                            errors.fechafin && touched.fechafin ? (
                                                <div className="alert alert-danger">{errors.fechafin}</div>
                                            ) : null
                                        }
                                    </div>
                                    <div className='col-md-4 mt-3 mx-auto'>
                                        <label htmlFor="precio">Ingrese el precio de la obra</label>
                                        <Field type="text" name="precio" label="Precio" className="form-control form-control-user" defaultValue={values.precio || ''} onChange={handleChange} />
                                        {
                                            errors.precio && touched.precio ? (
                                                <div className="alert alert-danger">{errors.precio}</div>
                                            ) : null
                                        }
                                    </div>
                                    <div className='col-md-4 mt-3 mx-auto'>
                                        <label htmlFor="estado">Seleccione el estado de la obra</label>
                                        <select name="estado" id="estado" className="form-select form-control-user" onChange={handleChange} value={values.estado}>
                                            <option value="">Seleccione una opción</option>
                                            <option value="En asesoria">En asesoria</option>
                                            <option value="Pendiente">Pendiente</option>
                                            <option value="En construcción">En construcción</option>
                                            <option value="Terminado">Terminado</option>
                                        </select>
                                        {
                                            errors.estado && touched.estado ? (
                                                <div className="alert alert-danger">{errors.estado}</div>
                                            ) : null
                                        }
                                    </div>
                                    <div className='col-md-16 mt-3 mx-auto'>
                                        <label htmlFor="descripcion">Ingrese la descripcion de la obra</label>
                                        <Field as="textarea" name="descripcion" label="Descripción" className="form-control form-control" />
                                    </div>
                                    {
                                        errors.descripcion && touched.descripcion ? (
                                            <div className="alert alert-danger">{errors.descripcion}</div>
                                        ) : null
                                    }
                                </div>
                                <hr />
                                <div className="detalle-container mt-4">
                                    {
                                        actividades.length > 0 ? (

                                            <h3 className="text-center w-100">Actividades</h3>
                                        ) : (
                                            <h3 className="text-center w-100">La obra no tiene actividades asociadas</h3>
                                        )
                                    }
                                    <br />
                                    {actividades.length > 0 ? (

                                        actividades.map((detalle) => (
                                            <>
                                                <div key={detalle.id}>
                                                    <Card className="detalle-card">
                                                        <div><strong>Actividad: </strong> {detalle.actividad}</div>
                                                        <div><strong>Fecha de inicio:</strong> {detalle.fechaini}</div>
                                                        <div><strong>Fecha de fin:</strong>{detalle.fechafin}</div>
                                                        <div><strong>Materiales:</strong>{detalle.materiales.idMat}</div>
                                                        <div><strong>Empleados:</strong>{detalle.empleados.idEmp}</div>
                                                        <div><strong>Estado:</strong>{detalle.estado}</div>
                                                        <div className="mt-3">
                                                            <button className="btn btn-secondary">
                                                                <i class="fa-solid fa-pen-to-square"></i>
                                                            </button>
                                                            <button className="btn btn-secondary ml-3">
                                                                <i class="fa-solid fa-eye"></i>
                                                            </button>
                                                        </div>
                                                        <div className="mt-3">
                                                           
                                                        </div>
                                                    </Card>
                                                </div></>
                                        )
                                        )) : null}
                                </div>

                                <div className="mt-3">
                                    <hr className="mt-3" />
                                    <div className="col-md-3 mt-3 mx-auto">
                                        <Button className="btn btn-success" onClick={handleAgregarActividad}>
                                            Agregar Actividad
                                        </Button>
                                    </div>
                                </div>
                                <Modal isOpen={modalVisible} toggle={handleCerrarForm} onClosed={handleCerrarForm}>
                                    <ModalHeader toggle={handleCerrarForm}>Agregar actividad</ModalHeader>
                                    <ModalBody>
                                        <Formik
                                            initialValues={{
                                                descripcion: '',
                                                fechaini: '',
                                                fechafin: '',
                                                actividades: {
                                                    materiales: [],
                                                    empleados: [],

                                                },
                                                estado: ''
                                            }}
                                            validationSchema={actividad}
                                            enableReinitialize={true}
                                            onSubmit={(values) => {
                                                try {
                                                    console.log(values)
                                                    createActividad(id, values)
                                                    handleCerrarForm()
                                                    alertConfirmAct()
                                                } catch (error) {
                                                    console.error('Error al guardar:', error);
                                                }

                                            }}
                                        >
                                            {({ values, setFieldValue, isSubmitting, handleSubmit, setFieldTouched, errors, touched, handleChange }) => (
                                                <Form
                                                    className="user"
                                                    onSubmit={handleSubmit}
                                                >
                                                    <div>
                                                        <input type="text" className="form-control form-control" id="descripcion" name="descripcion" placeholder="Descripción de la actividad*" value={values.descripcion} onChange={handleChange} />
                                                        {
                                                            errors.actividades && touched.actividades ? (
                                                                <div className="alert alert-danger" role="alert">{errors.actividades}</div>
                                                            ):null
                                                        }
                                                    </div>
                                                    <div className="mt-3">
                                                        <label htmlFor="fechaini">Seleccione la fecha de inicio</label>
                                                        <input type="date" id="fechaini" name="fechaini" className="form-control  form-control" value={values.fechaini} onChange={handleChange} />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label htmlFor="fechafin">Seleccione la fecha de fin</label>
                                                        <input type="date" name="fechafin" id="fechafin" className="form-control form-control" value={values.fechafin} onChange={handleChange} />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label htmlFor="fechaInicio">Fecha Inicial</label>
                                                        <Select
                                                            id={`materiales`}
                                                            options={materiales}
                                                            isMulti
                                                            value={values.actividades.materiales}
                                                            onChange={(selectedMateriales) => setFieldValue(`actividades.materiales`, selectedMateriales)}
                                                            onBlur={() => setFieldTouched(`actividades.materiales`, true)}
                                                        />
                                                    </div>
                                                    <div className="mt-3">
                                                        <Select
                                                            id={`actividades.empleados`}
                                                            options={empleados}
                                                            isMulti
                                                            value={values.actividades.empleados}
                                                            onChange={(selectedEmpleados) => setFieldValue(`actividades.empleados`, selectedEmpleados)}
                                                            onBlur={() => setFieldTouched(`actividades.empleados`, true)}
                                                        />
                                                    </div>
                                                    <div className="mt-3">
                                                        <select name="estado" id="estado" className="form-select form-control" value={values.estado} onChange={handleChange}>
                                                            <option value="">Seleccione el estado de la actividad</option>
                                                            <option value="En curso">En curso</option>
                                                            <option value="En revisión">En revisión</option>
                                                            <option value="Terminada">Terminada</option>
                                                            <option value="Cancelada">Cancelada</option>
                                                        </select>
                                                    </div>
                                                    <div className="card-footer">
                                                        <ModalFooter>
                                                            <Button color="secondary" onClick={handleCerrarForm}>
                                                                Cancelar
                                                            </Button>
                                                            <button className="btn btn-primary" color="primary" type="submit" >
                                                                Guardar
                                                            </button>
                                                        </ModalFooter>
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>
                                    </ModalBody>
                                </Modal>
                            </div>
                            <div className="card-footer text-center">
                                <div className="row">
                                    <div className="col-md-6">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="btn btn-primary btn-icon-split w-50"
                                        >
                                            <span className="text-white-50">
                                                <i className="fas fa-plus"></i>
                                            </span>
                                            <span className="text">Guardar</span>
                                        </button>
                                    </div>
                                    <div className="col-md-6">
                                        <a
                                            type="button"
                                            className="btn btn-danger btn-icon-split w-50"
                                            onClick={() => navigate(`/obras`)}
                                        >
                                            <span className="text-white-50">
                                                <i className="fa-solid fa-x"></i>
                                            </span>
                                            <span className="text">Regresar</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}

            </Formik>
        </div >
    )
}


export default ObraDetalle