import axios from "axios";
import Select from "react-select";
import { Form, Formik, Field } from "formik";
import { useEffect, useState } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { useNavigate, useParams } from "react-router-dom";
import { useObras } from "../../context/obras/ObrasProvider";
import { obraSchemaEdit, actividadSchema } from "./ValidateObra"
import _ from "lodash"
import "./obras.css"
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
            label: item.nombre,
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
    const { createActividad, updateObra, searchAct } = useObras()
    const { id } = useParams()
    const [searchTerm, setSearchTerm] = useState('');
    const params = useParams()
    const [obra, setObra] = useState(null);
    const navigate = useNavigate()
    const [modalVisible, setModalVisible] = useState(false)
    const [cliente, setCliente] = useState([])
    const [materiales, setMateriales] = useState([])
    const [empleados, setEmpleados] = useState([])
    const [asesores, setAsesores] = useState([])
    const [actividades, setActividades] = useState([])
    const [matDefault, setMatDefault] = useState([])
    const [empDefault, setEmpDefault] = useState([])
    const [selectedActivity, setSelectedActivity] = useState(null);
    const handleAgregarActividad = (activity = null) => {
        setSelectedActivity(activity);
        setMatDefault([]);
        setEmpDefault([]);
        console.log(activity.actividad)
        setModalVisible(true);
        if (activity) {
            const initialMaterials = activity.materiales.map((material) => ({
                value: material.idMat,
                label: material.nombre,
            }));

            const initialEmployees = activity.empleados.map((employee) => ({
                value: employee.idEmp,
                label: employee.nombre,
            }));

            setMatDefault(initialMaterials);
            setEmpDefault(initialEmployees);
        } else if (!activity.actividad) {
            setMatDefault([]);
            setEmpDefault([]);
        }

    };
    const [currentPage, setCurrentPage] = useState(1);
    const activitiesPerPage = 4;

    const paginate = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) {
            return;
        }
        setCurrentPage(pageNumber);
    };
    const filteredActivities = actividades.filter((detalle) => {
        // Filtra por el término de búsqueda en todas las propiedades del detalle
        const detalleValues = Object.values(detalle);

        // Filtra por el nombre de los materiales y empleados
        const materialesYEmpleados = detalleValues.reduce((acc, value) => {
            if (Array.isArray(value)) {
                // Si el valor es un array, asume que son materiales o empleados y extrae los nombres
                const nombres = value.map(item => item.nombre); // Ajusta según la estructura de tus materiales y empleados
                acc = [...acc, ...nombres];
            } else if (typeof value === 'object' && value !== null) {
                // Si el valor es un objeto, asume que es un material o un empleado y extrae el nombre
                acc.push(value.nombre); // Ajusta según la estructura de tus materiales y empleados
            }
            return acc;
        }, []);

        return [...detalleValues, ...materialesYEmpleados].some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    })
        .sort((a, b) => {
            // Ordena por el estado "En curso" primero
            const estadoA = a.estado.toLowerCase();
            const estadoB = b.estado.toLowerCase();

            if (estadoA === "en curso" && estadoB !== "en curso") {
                return -1;
            } else if (estadoA !== "en curso" && estadoB === "en curso") {
                return 1;
            } else {
                return 0;
            }
        });

    console.clear()

    // Lógica de paginación
    const indexOfLastActivity = currentPage * activitiesPerPage;
    const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
    const currentActivities = filteredActivities.slice(indexOfFirstActivity, indexOfLastActivity);
    const totalPages = Math.ceil(filteredActivities.length / activitiesPerPage);

    const [values, setValues] = useState([])
    const alertConfirmAct = async () => {
        try {
            const updatedActividades = await fetchData(`http://localhost:4000/actividades/${params.id}`);
            setActividades(updatedActividades);
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
        } catch (error) {
            console.error("Error al recuperar actividades:", error);
        }
    }

    const handleCerrarForm = () => {
        setModalVisible(false);
        setMatDefault([]);
        setEmpDefault([]);
    };
    const alertConfirm = () => {
        var message = ""
        if (params.id) {
            message = "actualizada"
        } else {
            message = "agregada"
        }
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
    const handleSearch = () => {
        setCurrentPage(1);
    };


    useEffect(() => {
        const fetchObraDetalle = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/obra/${id}`);
                setObra(response.data)
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
        fetchEmpleados(`http://localhost:4000/actividades/${params.id}`).then((data) => {
            setEmpDefault(data);
        });

        fetchMaterial(`http://localhost:4000/actividades/${params.id}`).then((data) => {
            setMatDefault(data);
        });



        fetchData("http://localhost:4000/clientes").then((data) => {
            setCliente(data);
        });
        fetchData(`http://localhost:4000/actividades/${params.id}`).then((data) => {
            setActividades(data)
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
    const resetForm = () => {
        const initialValues = {
            ...selectedActivity,
            actividades: {
                materiales: [],
                empleados: [],
            },
        };
        setValues(initialValues);
    };
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
                                        <label htmlFor="idEmp">Seleccione el encargado de la obra:</label>
                                        <Field as="select" id="idEmp" name="idEmp" label="idEmp" className="form-select form-control-user" value={values.idEmp}>
                                            <option value="">Seleccione un encargado de la obra</option>
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
                                            <>
                                                <h3 className="ml-3 w-50">Actividades</h3>
                                                <div className="col-md-4 input-group">
                                                    <input
                                                        type="text"
                                                        id="search"
                                                        name="search"
                                                        className="form-control search-input"
                                                        placeholder="Buscar actividad"
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                    />
                                                    <div className="input-group-append">
                                                        <button
                                                            className="btn btn-secondary"
                                                            type="button"
                                                            onClick={handleSearch}
                                                        >
                                                            <i className="fa fa-search"></i>
                                                        </button>
                                                    </div>

                                                </div>
                                            </>


                                        ) : (
                                            <h3 className="text-center w-100">La obra no tiene actividades asociadas</h3>
                                        )
                                    }
                                    <Modal isOpen={modalVisible} toggle={handleCerrarForm} onClosed={() => resetForm()}>
                                        <ModalHeader toggle={handleCerrarForm}>Guardar actividad</ModalHeader>
                                        <ModalBody>
                                            <Formik
                                                initialValues={{
                                                    actividad: selectedActivity ? selectedActivity.actividad : '',
                                                    fechaini: selectedActivity ? selectedActivity.fechaini : '',
                                                    fechafin: selectedActivity ? selectedActivity.fechafin : '',
                                                    actividades: {
                                                        materiales: selectedActivity ? matDefault : [],
                                                        empleados: selectedActivity ? empDefault : [],
                                                    },
                                                    estado: selectedActivity ? selectedActivity.estado : '',
                                                    obra: {
                                                        fechainiObra: obra.fechaini,
                                                        fechafinObra: obra.fechafin
                                                    }
                                                }}

                                                validationSchema={actividadSchema({
                                                    fechainiObra: obra.fechaini,
                                                    fechafinObra: obra.fechafin,
                                                    ...values
                                                })}
                                                onSubmit={async (values, { setSubmitting }) => {
                                                    const formattedShare = {
                                                        ...values,
                                                        antiguo: selectedActivity.actividad,
                                                    };
                                                    await createActividad(id, formattedShare);
                                                    alertConfirmAct();
                                                    setSubmitting(false);
                                                    setModalVisible(false);
                                                    console.clear()
                                                }}
                                            >
                                                {({ values, setFieldValue, handleSubmit, setFieldTouched, errors, touched, handleChange, resetForm }) => (
                                                    <Form
                                                        className="user"
                                                        onSubmit={handleSubmit}
                                                    >
                                                        <div>
                                                            <label htmlFor="actividad">Ingrese la descripción de la actividad</label>
                                                            <input type="text" className="form-control form-control" id="actividad" name="actividad" placeholder="Descripción de la actividad*" value={values.actividad} onChange={handleChange} />
                                                            {
                                                                errors.actividad && touched.actividad ? (
                                                                    <div className="alert alert-danger" role="alert">
                                                                        {
                                                                            errors.actividad
                                                                        }
                                                                    </div>
                                                                ) : null
                                                            }
                                                        </div>
                                                        <div className="mt-3">
                                                            <label htmlFor="fechaini">Seleccione la fecha de inicio de la actividad</label>
                                                            <input type="date" id="fechaini" name="fechaini" className="form-control  form-control" value={values.fechaini} onChange={handleChange} />
                                                            {
                                                                errors.fechaini && touched.fechaini ? (
                                                                    <div className="alert alert-danger" role="alert">
                                                                        {
                                                                            errors.fechaini
                                                                        }
                                                                    </div>
                                                                ) : null
                                                            }
                                                        </div>
                                                        <div className="mt-3">
                                                            <label htmlFor="fechafin">Seleccione la fecha de fin de la actividad</label>
                                                            <input type="date" name="fechafin" id="fechafin" className="form-control form-control" value={values.fechafin} onChange={handleChange} />
                                                            {
                                                                errors.fechafin && touched.fechafin ? (
                                                                    <div className="alert alert-danger" role="alert">
                                                                        {
                                                                            errors.fechafin
                                                                        }
                                                                    </div>
                                                                ) : null
                                                            }
                                                        </div>
                                                        <div className="mt-3">
                                                            <label htmlFor="materiales">Seleccione los materiales necesarios para la actividad</label>
                                                            <Select
                                                                id={`materiales`}
                                                                options={
                                                                    materiales
                                                                }
                                                                isMulti

                                                                // defaultValue={matDefault}
                                                                value={values.actividades.materiales}
                                                                onChange={(selectedMateriales) => setFieldValue(`actividades.materiales`, selectedMateriales)}
                                                                onBlur={() => setFieldTouched(`values.actividades.materiales`, true)}

                                                            />
                                                            {errors.actividades?.materiales && touched.actividades?.materiales && (
                                                                <div className="alert alert-danger">{errors.actividades.materiales}</div>
                                                            )}
                                                        </div>
                                                        <div className="mt-3">
                                                            <label htmlFor="empleados">Seleccione los empleados encargados de la actividad</label>
                                                            <Select
                                                                id={`actividades.empleados`}
                                                                options={empleados}
                                                                isMulti
                                                                value={values.actividades.empleados}
                                                                onChange={(selectedEmpleados) => setFieldValue(`actividades.empleados`, selectedEmpleados)}
                                                                // defaultValue={empDefault}
                                                                onBlur={() => setFieldTouched(`values.actividades.empleados`, true)}

                                                            />
                                                            {errors.actividades?.empleados && touched.actividades?.empleados && (
                                                                <div className="alert alert-danger">{errors.actividades.empleados}</div>
                                                            )}

                                                        </div>
                                                        <div className="mt-3">
                                                            <label htmlFor="estado">Seleccione el estado de la actividad</label>
                                                            <select name="estado" id="estado" className="form-select form-control" value={values.estado} onChange={handleChange}>
                                                                <option value="">Seleccione el estado de la actividad</option>
                                                                <option value="En curso">En curso</option>
                                                                <option value="En revisión">En revisión</option>
                                                                <option value="Terminada">Terminada</option>
                                                                <option value="Cancelada">Cancelada</option>
                                                            </select>
                                                            {
                                                                errors.estado && touched.estado ? (
                                                                    <div className="alert alert-danger" role="alert">
                                                                        {errors.estado}
                                                                    </div>
                                                                ) : null
                                                            }
                                                        </div>
                                                        <div className="card-footer">
                                                            <ModalFooter>
                                                                <Button color="secondary" onClick={handleCerrarForm}>
                                                                    Cancelar
                                                                </Button>
                                                                <button
                                                                    className="btn btn-primary"
                                                                    color="primary"
                                                                    type="submit"
                                                                >
                                                                    Guardar
                                                                </button>

                                                            </ModalFooter>
                                                        </div>
                                                    </Form>

                                                )}
                                            </Formik>

                                        </ModalBody>
                                    </Modal>
                                    <div className="container">
                                        <div className="row">
                                            {filteredActivities.length > 0 ? (
                                                currentActivities.map((detalle) => (
                                                    <div key={detalle.id} className="col-md-3 mt-3">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <h5 className="card-title">Actividad: {detalle.actividad}</h5>
                                                                <p className="card-text">Fecha de inicio: {detalle.fechaini}</p>
                                                                <p className="card-text">Fecha de fin: {detalle.fechafin}</p>
                                                                <p className="card-text">Materiales: {detalle.materiales.map((material) => material.nombre).join(', ')}</p>
                                                                <p className="card-text">Empleados: {detalle.empleados.map((empleado) => empleado.nombre).join(', ')}</p>
                                                                <p className="card-text">Estado: {detalle.estado}</p>
                                                                <div className="mt-3">
                                                                    <Button
                                                                        className="btn btn-secondary"
                                                                        onClick={() => handleAgregarActividad(detalle)}
                                                                    >
                                                                        <i className="fa-solid fa-pen-to-square"></i>
                                                                        &nbsp;Editar
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : <h3>No se encontraron actividades con los parametros de búsqueda ingresados</h3>}
                                            <div className="container">
                                                <div className="row">
                                                    <div className="pagination col-md-1 mt-3 mx-auto">
                                                        {totalPages > 1 && (
                                                            <>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-outline-primary"
                                                                    onClick={() => paginate(currentPage - 1)}
                                                                    disabled={currentPage === 1}
                                                                >
                                                                    Anterior
                                                                </button>
                                                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                                                                    <button
                                                                        type="button"
                                                                        className={`btn btn-outline-primary mr-2 ml-1 ${pageNumber === currentPage ? 'active' : ''}`}
                                                                        key={pageNumber}
                                                                        onClick={() => paginate(pageNumber)}
                                                                    >
                                                                        {pageNumber}
                                                                    </button>
                                                                ))}
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-outline-primary"
                                                                    onClick={() => paginate(currentPage + 1)}
                                                                    disabled={currentPage === totalPages}
                                                                >
                                                                    Siguiente
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <hr className="mt-3" />
                                    <div className="col-md-3 mt-3 mx-auto">
                                        <Button className="btn btn-success" onClick={handleAgregarActividad}>
                                            Agregar Actividad
                                        </Button>
                                    </div>
                                </div>

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