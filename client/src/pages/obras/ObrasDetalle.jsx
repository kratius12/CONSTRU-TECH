import axios from "axios";
import Select from "react-select";
import { Form, Formik, Field } from "formik";
import { useEffect, useState } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { useNavigate, useParams } from "react-router-dom";
import { useObras } from "../../context/obras/ObrasProvider";
import { obraSchemaEdit, actividadSchema } from "../../components/obras/ValidateObra"
import "../../components/obras/obras.css"
import { format, addDays, max } from 'date-fns';
import GanttTask from "../../components/togglEstado/GanttTask";
// import GanttChartComponent from "../../components/obras/Componentgant";

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
    const [materialesList, setMaterialesList] = useState([{ material: "", cantidad: 0 }]);
    const [numFormularios, setNumFormularios] = useState(1);
    const [showGantt, setShowGantt] = useState(false)
    const [actividadesLocales, setActividadesLocales] = useState([]);



    const handleAgregarActividad = (activity) => {
        if (activity.detalleObra) {
            setSelectedActivity(activity);
        } else {
            setSelectedActivity(null)
        }
        setMatDefault([]);
        setEmpDefault([]);
        setModalVisible(true);

        if (activity.detalleObra) {
            const initialEmployees = activity.empleados.map((employee) => ({
                value: employee.empleado.idEmp,
                label: employee.empleado.nombre,
            }));
            setEmpDefault(initialEmployees);
        } else if (!activity.actividad) {
            setMatDefault([]);
            setEmpDefault([]);
        }
        const fechainiActividad = activity.detalleObra.fechaini;
        const fechafinActividad = new Date(fechainiActividad);
        const fecha = fechafinActividad.setDate(fechafinActividad.getDate() + parseInt(activity.detalleObra.fechafin, 10) + 1);

        setActividadesLocales([...actividadesLocales, { ...activity, fechafinActividad: fecha }]);

    };

    const handleAgregarMaterial = () => {

        setNumFormularios(numFormularios + 1);
        setMaterialesList([...materialesList, { idMat: '', cantidad: 0 }]);
    };
    const handleShowGantt = () => {
        setShowGantt(true);
    };

    const handleCerrarGantt = () => {
        setShowGantt(false)
    }

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
            value.toString().includes(searchTerm)
        );
    })
        .sort((a, b) => {
            // Ordena por el estado "En curso" primero
            const estadoA = a.estado;
            const estadoB = b.estado;

            if (estadoA === "en curso" && estadoB !== "en curso") {
                return -1;
            } else if (estadoA !== "en curso" && estadoB === "en curso") {
                return 1;
            } else {
                return 0;
            }
        });
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
                content: "",
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
    const [existingActivities, setExistingActivities] = useState([]);
    const handleMaterialChange = (index, selectedMaterial) => {
        const updatedList = [...materialesList];
        updatedList[index].material = selectedMaterial;
        setMaterialesList(updatedList);
    };

    const handleCantidadChange = (index, nuevaCantidad) => {
        const nuevosMateriales = [...materialesList];
        nuevosMateriales[index].cantidad = nuevaCantidad;
        setMaterialesList(nuevosMateriales);
    };

    const [actividadActual, setActividadActual] = useState(null);
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
            content: "",
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
    const [modalMaterialesVisible, setModalMaterialesVisible] = useState(false);
    const handleAbrirModalMateriales = (actividad) => {
        setActividadActual(actividad);
        setMaterialesList(actividad.materiales || []); // Asegúrate de que actividad.materiales sea un array
        setModalMaterialesVisible(true);
    };
    const calcularFechaFinEstimada = (fechaInicio, dias) => {
        const fechaInicioActividad = new Date(fechaInicio);
        const fechaFinEstimada = new Date(fechaInicioActividad.getTime() + (dias * 24 * 60 * 60 * 1000));
        return fechaFinEstimada.toLocaleDateString(); // Puedes ajustar el formato según lo que necesites
    };

    const formatoFechaIni = (fechaInicio) => {
        const fechaInicioActividad = new Date(fechaInicio)
        return fechaInicioActividad.toLocaleDateString()
    }



    const handleCerrarModalMateriales = () => {
        setModalMaterialesVisible(false);
    };

    // console.clear()
    const [fechaMaxima, setFechaMaxima] = useState(null)

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
        const calcularFechaMaxima = () => {

            var fechafin = null;

            var fechaini = null

            actividades.forEach((detalle) => {
                const fechainicio = detalle.detalleObra.fechaini
                const fechaFinDetalle = detalle.detalleObra.fechafin;
                // Verifica si la fecha actual es posterior a la fecha máxima almacenada
                if (!fechafin || fechaFinDetalle > fechafin) {
                    fechafin = fechaFinDetalle;
                    fechaini = fechainicio
                }
            });
            const inicio = new Date(fechaini)
            const fechafinMaxima = new Date(inicio.getTime() + (fechafin * 24 * 60 * 60 * 1000))
            const fechaMaximaFormateada = format(fechafinMaxima, 'dd/MM/yyyy');
            setFechaMaxima(fechaMaximaFormateada)
        }


        const activityDescriptions = actividades.map((activity) => activity.actividad);
        setExistingActivities(activityDescriptions);
        loadMaterialesEmpleados()
        fetchObraDetalle()
        calcularFechaMaxima()
    }, [id]);
    const [materialErrors, setMaterialErrors] = useState([]);
    const [modalError, setModalError] = useState(false);

    const handleEliminarMaterial = (index) => {
        setNumFormularios(numFormularios - 1);
        const updatedList = [...materialesList];
        updatedList.splice(index, 1);
        setMaterialesList(updatedList);
    };


    const handleGuardarMateriales = () => {
        const newMaterialErrors = {};

        materialesList.forEach((material, index) => {
            if (material.cantidad < 0) {
                newMaterialErrors[index] = { ...newMaterialErrors[index], cantidad: "La cantidad no puede ser un número negativo" };
            } else if (material.cantidad === 0) {
                newMaterialErrors[index] = { ...newMaterialErrors[index], cantidad: "La cantidad no puede ser 0" };
            }

            if (!material.material) {
                newMaterialErrors[index] = { ...newMaterialErrors[index], material: "Debe seleccionar un material" };
            }

            // Agregar otras validaciones según tus requisitos
        });

        // Muestra los errores debajo de cada campo
        setMaterialErrors(newMaterialErrors);

        // Muestra el mensaje de error general de la modal si hay algún error
        setModalError(Object.keys(newMaterialErrors).length > 0);
        // Si no hay errores, cierra la modal
        if (Object.keys(newMaterialErrors).length === 0) {
            handleCerrarModalMateriales();
        }
    };

    const [selectedMaterials, setSelectedMaterials] = useState([]);


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
                                            errors.idEmp && touched.idEmp ? (
                                                <div className="alert alert-danger">{errors.idEmp}</div>
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
                                        <input
                                            type="text"
                                            disabled
                                            name="fechafin"
                                            label="Fecha Fin"
                                            className="form-control form-control-user"
                                            value={ values.fechafin = fechaMaxima }
                                            onChange={handleChange}

                                        />
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
                                            <option value="Pendiente">Pendiente</option>
                                            <option value="En asesoria">En asesoria</option>
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
                                            <h3 className="text-center w-100">Actividades</h3>
                                            <GanttTask actividades={actividades} handleActividad={handleAgregarActividad} />
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
                                                    actividad:
                                                        selectedActivity ? selectedActivity.detalleObra.actividad :
                                                            '',
                                                    fechaini:
                                                        selectedActivity ? selectedActivity.detalleObra.fechaini :
                                                            '',
                                                    fechafin:
                                                        selectedActivity ? selectedActivity.detalleObra.fechafin :
                                                            '',
                                                    empleados:
                                                        selectedActivity ? empDefault :
                                                            [],
                                                    materiales:
                                                        selectedActivity ? matDefault :
                                                            [],
                                                    estado:
                                                        selectedActivity ? selectedActivity.detalleObra.estado :
                                                            '',
                                                    obra: {
                                                        fechainiObra: obra.fechaini,
                                                        fechafinObra: obra.fechafin
                                                    }
                                                }}
                                                validationSchema={actividadSchema({
                                                    fechainiObra: new Date(obra.fechaini),
                                                    fechafinObra: new Date(obra.fechafin),
                                                    ...values
                                                })}
                                                onSubmit={async (values, { setSubmitting }) => {

                                                    const formattedShare = {
                                                        ...values,
                                                        antiguo: selectedActivity ? selectedActivity.detalleObra.actividad : null,
                                                        materiales: materialesList
                                                    };
                                                    for (const actividad of actividades) {
                                                        if (actividad.actividad === values.actividad && !selectedActivity) {
                                                            $.confirm({
                                                                title: `Error`,
                                                                content: `La actividad ${actividad.actividad} ya exite para esta obra`,
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
                                                            setSubmitting(false)
                                                            return
                                                        } else if (actividad.actividad == values.actividad && selectedActivity.detalleObra.actividad != values.actividad) {
                                                            $.confirm({
                                                                title: `Error`,
                                                                content: `La actividad ${values.actividad} ya exite para esta obra other`,
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
                                                            setSubmitting(false)
                                                            return
                                                        } else {
                                                            setSubmitting(true)
                                                        }
                                                    }
                                                    setSubmitting(true);
                                                    await createActividad(id, formattedShare);
                                                    alertConfirmAct();
                                                    setModalVisible(false);
                                                }}
                                            >
                                                {({ values, setFieldValue, handleSubmit, setFieldTouched, errors, touched, handleChange }) => (
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
                                                            <label htmlFor="fechafin">Ingrese la cantidad de dias que le tomará esta activdad</label>
                                                            <input type="number" name="fechafin" id="fechafin" className="form-control form-control" value={values.fechafin} onChange={handleChange} />
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
                                                            <label htmlFor="empleados">Seleccione los empleados encargados de la actividad</label>
                                                            <Select
                                                                key={`select${values.empleados}`}
                                                                id={`empleados`}
                                                                options={empleados}
                                                                isMulti
                                                                value={values.empleados}
                                                                onChange={(selectedEmpleados) => setFieldValue(`empleados`, selectedEmpleados)}
                                                                onBlur={() => setFieldTouched(`values.empleados`, true)}

                                                            />
                                                            {errors.empleados && touched.empleados && (
                                                                <div className="alert alert-danger">{errors.empleados}</div>
                                                            )}

                                                        </div>

                                                        <div className="mt-3">
                                                            <label htmlFor="estado">Seleccione el estado de la actividad</label>
                                                            <select name="estado" id="estado" className="form-select form-control" value={values.estado} onChange={handleChange}>
                                                                <option value="">Seleccione el estado de la actividad</option>
                                                                <option value="En curso">En curso</option>
                                                                <option value="En revisión">En revisión</option>
                                                                <option value="Terminada">Terminada</option>
                                                            </select>
                                                            {
                                                                errors.estado && touched.estado ? (
                                                                    <div className="alert alert-danger" role="alert">
                                                                        {errors.estado}
                                                                    </div>
                                                                ) : null
                                                            }
                                                        </div>
                                                        <div>
                                                            <div className="container">
                                                                <div className="text-center">
                                                                    <Button color="primary" className="mt-3" onClick={() => handleAbrirModalMateriales(selectedActivity ? selectedActivity.materiales : [])}>
                                                                        Gestionar Materiales
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="card-footer mt-3">
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
                                    <Modal isOpen={modalMaterialesVisible} toggle={() => setModalMaterialesVisible(!modalMaterialesVisible)}>
                                        <ModalHeader toggle={() => setModalMaterialesVisible(!modalMaterialesVisible)}>Gestionar Materiales</ModalHeader>
                                        <ModalBody>

                                            {materialesList.map((material, index) => (
                                                <Form key={index}>
                                                    <div className="container" key={index}>
                                                        <Select
                                                            id={`materiales.${index}`}
                                                            name={`materiales.${index}`}
                                                            options={materiales}
                                                            defaultValue={selectedMaterials[index]}
                                                            value={materialesList[index].material}
                                                            onChange={(selectedMaterial) => handleMaterialChange(index, selectedMaterial)}
                                                        />
                                                        {materialErrors[index] && materialErrors[index].material && (
                                                            <div className="alert alert-danger mt-2" role="alert">
                                                                {materialErrors[index].material}
                                                            </div>
                                                        )}
                                                        <input
                                                            type="number"
                                                            className="form-control mt-3"
                                                            name={`cantidad-${index}`}
                                                            value={material.cantidad}
                                                            onChange={(e) => handleCantidadChange(index, e.target.value)}
                                                        />
                                                        
                                                        {materialErrors[index] && materialErrors[index].cantidad && (
                                                            <div className="alert alert-danger mt-2" role="alert">
                                                                {materialErrors[index].cantidad}
                                                            </div>
                                                        )}
                                                        <div className="text-center mt-2">
                                                            <Button color="danger" onClick={() => handleEliminarMaterial(index)}>
                                                                X
                                                            </Button>
                                                            <p>Cantidad actual: {material.cantidad}</p>
                                                        </div>
                                                    </div>
                                                    <hr className="mt-3" />
                                                </Form>
                                            ))}

                                            {modalError && (
                                                <div className="alert alert-danger mt-2" role="alert">
                                                    Mensaje de error general de la modal.
                                                </div>
                                            )}

                                            <Button color="success" onClick={handleAgregarMaterial}>
                                                Agregar Material
                                            </Button>

                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="secondary" onClick={handleCerrarModalMateriales}>
                                                Cancelar
                                            </Button>

                                            
                                            <Button color="primary" onClick={() => handleGuardarMateriales()}>
                                                Guardar Materiales
                                            </Button>

                                        </ModalFooter>
                                    </Modal>

                                    <div className="container">
                                        <div className="row">
                                            {filteredActivities.length > 0 ? (
                                                currentActivities.map((detalle) => (
                                                    <>
                                                    </>

                                                ))
                                            ) : (
                                                <h3>No se encontraron actividades con los parametros de búsqueda ingresados</h3>
                                            )

                                            }



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
                                        <Button
                                            className="btn btn-success"
                                            onClick={handleAgregarActividad}
                                        >
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