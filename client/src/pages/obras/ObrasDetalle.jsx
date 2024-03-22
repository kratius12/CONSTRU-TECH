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
import ObraActividadesCard from "../../components/togglEstado/ObraActividadesCard";
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
            cantidad: item.cantidad
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
    const [showGantt, setShowGantt] = useState(true)
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
        var fecha
        if (activity.detalleObra) {
            const initialEmployees = activity.empleados.map((employee) => ({
                value: employee.empleado.idEmp,
                label: employee.empleado.nombre,
            }));
            setEmpDefault(initialEmployees);
            const fechainiActividad = activity.detalleObra.fechaini;
            const fechafinActividad = new Date(fechainiActividad);
            fecha = fechafinActividad.setDate(fechafinActividad.getDate() + parseInt(activity.detalleObra.fechafin, 10) + 1);
            calcularFechaMaxima()
        } else if (!activity.actividad) {
            setMatDefault([]);
            setEmpDefault([]);
            calcularFechaMaxima()
        }
        setMaterialesList([])
        calcularFechaMaxima()
        setActividadesLocales([...actividadesLocales, { ...activity, fechafinActividad: fecha }]);

    };

    const handleAgregarMaterial = () => {

        setNumFormularios(numFormularios + 1);
        setMaterialesList([...materialesList, { idMat: '', cantidad: 0 }]);
    };
    const handleShowGantt = () => {
        showGantt ? setShowGantt(false) : setShowGantt(true)

    };

    const [currentPage, setCurrentPage] = useState(1);
    const activitiesPerPage = 4;
    const paginate = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) {
            return;
        }
        setCurrentPage(pageNumber);
        calcularFechaMaxima()
    };
    const filteredActivities = actividades.filter((actividad) =>
        actividad.detalleObra.actividad.toLowerCase().includes(searchTerm.toLowerCase()) ||
        actividad.empleados.some((empleado) =>
            empleado.empleado.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        actividad.materiales.some((material) =>
            material.materiales.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        actividad.detalleObra.estado.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => {
        // Ordena por el estado "En curso" primero
        const estadoA = a.estado;
        const estadoB = b.estado;

        if (estadoA === "En curso" && estadoB !== "En curso") {
            return -1;
        } else if (estadoA !== "En curso" && estadoB === "En curso") {
            return 1;
        } else {
            return 0;
        }
    });
    const [cantidadDisponible, setCantidadDisponible] = useState(0);
    const indexOfLastActivity = currentPage * activitiesPerPage;
    const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
    const currentActivities = filteredActivities.slice(indexOfFirstActivity, indexOfLastActivity);
    const totalPages = Math.ceil(filteredActivities.length / activitiesPerPage);
    const [values, setValues] = useState([])
    const alertConfirmAct = async () => {
        try {
            const updatedActividades = await fetchData(`https://apismovilconstru.onrender.com/actividades/${params.id}`);
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
        setMaterialesList([])
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
    const handleAbrirModalMateriales = async (actividad) => {
        const materialesData = await fetchMaterial("https://apismovilconstru.onrender.com/materialesAc");
        setMateriales(materialesData);

        setActividadActual(actividad);
        setMaterialesList([]);
        setModalMaterialesVisible(true);
        calcularFechaMaxima()
    };
    const calcularFechaFinEstimada = (fechaInicio, dias) => {
        const fechaInicioActividad = new Date(fechaInicio);
        const fechaFinEstimada = new Date(fechaInicioActividad.getTime() + (dias * 24 * 60 * 60 * 1000));
        return fechaFinEstimada.toLocaleDateString(); // Puedes ajustar el formato según lo que necesites
        calcularFechaMaxima()
    };

    const formatoFechaIni = (fechaInicio) => {
        const fechaInicioActividad = new Date(fechaInicio)
        return fechaInicioActividad.toLocaleDateString()
        calcularFechaMaxima()
    }

    const [direccionCliemte, setDireccionCliente] = useState("")

    const handleCerrarModalMateriales = () => {
        setModalMaterialesVisible(false);
        calcularFechaMaxima()
    };

    // console.clear()
    const [fechaMaxima, setFechaMaxima] = useState(null)

    useEffect(() => {
        const fetchObraDetalle = async () => {
            try {
                const response = await axios.get(`https://apismovilconstru.onrender.com/obra/${id}`);
                setObra(response.data)
                setDireccionCliente(response.data.cliente.direccion);
            } catch (error) {
                console.error("Ocurrio un error al obtener la información de la obra")
            }
        }
        const loadMaterialesEmpleados = async () => {
            const empleadosData = await fetchEmpleados("https://apismovilconstru.onrender.com/empleadosAct");
            setEmpleados(empleadosData);
        };
        fetchEmpleados(`https://apismovilconstru.onrender.com/actividades/${params.id}`).then((data) => {
            setEmpDefault(data);
        });

        fetchMaterial(`https://apismovilconstru.onrender.com/actividades/${params.id}`).then((data) => {
            setMatDefault(data);
        });

        fetchData("https://apismovilconstru.onrender.com/clientes").then((data) => {
            setCliente(data);

        });
        fetchData(`https://apismovilconstru.onrender.com/actividades/${params.id}`).then((data) => {
            setActividades(data)
        })

        fetchData("https://apismovilconstru.onrender.com/empleadosAct").then((data) => {
            setAsesores(data)
        });



        const activityDescriptions = actividades.map((activity) => activity.actividad);
        setExistingActivities(activityDescriptions);
        loadMaterialesEmpleados()
        fetchObraDetalle()

    }, [id]);
    const [materialErrors, setMaterialErrors] = useState([]);
    const [modalError, setModalError] = useState(false);

    const handleEliminarMaterial = (index) => {
        setNumFormularios(numFormularios - 1);
        const updatedList = [...materialesList];
        updatedList.splice(index, 1);
        setMaterialesList(updatedList);
        calcularFechaMaxima()
    };
    const calcularFechaMaxima = async () => {

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
        await axios.put(`https://apismovilconstru.onrender.com/updateDate/${id}`, fechaMaxima)
    }


    const handleGuardarMateriales = async () => {
        const newMaterialErrors = [];
        const materialesData = await fetchMaterial("https://apismovilconstru.onrender.com/materialesAc");
        setMateriales(materialesData);
        setCantidadDisponible(materialesData.cantidad);
        materialesList.forEach((material, index) => {
            if (material.material) {
                if (material.cantidad < 0) {
                    newMaterialErrors[index] = { ...newMaterialErrors[index], cantidad: "La cantidad no puede ser un número negativo" };
                }

                if (material.material.cantidad < material.cantidad) {
                    newMaterialErrors[index] = { ...newMaterialErrors[index], cantidad: `El material seleccionado tiene solo ${material.material.cantidad} unidades y usted está ingresando ${material.cantidad}` };
                } if (material.cantidad == 0) {
                    newMaterialErrors[index] = { ...newMaterialErrors[index], cantidad: "La cantidad ingresada no puede ser 0" }
                }
            } else if (!material.material) {
                newMaterialErrors[index] = { ...newMaterialErrors[index], material: "Debe seleccionar un material" }
            } else {
                handleCerrarModalMateriales()
            }

        });
        if (newMaterialErrors.length == 0) {
            handleCerrarModalMateriales()
            setMaterialErrors([])
            calcularFechaMaxima()
        } else { setMaterialErrors(newMaterialErrors); }
    };
    const [showMatModal, setShowMatModal] = useState(false);
    const [modalMaterials, setModalMaterials] = useState([]);
    const toggleModal = (materials) => {
        setModalMaterials(materials);
        setShowMatModal(!showMatModal);
    };
    const handleCerrarMateriales = () => {
        setShowMatModal(false)
    }

    if (!obra) {
        return <div><h3>Cargando la información de la obra...</h3></div>
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
                validateOnChange={true}
                validateOnBlur={false}
                onSubmit={(values, { setSubmitting }) => {
                    var is = false
                    actividades.forEach((actividad) => {
                        if (actividad.detalleObra.estado != "Terminada") {
                            is = true
                            console.log(actividad.detalleObra.estado)
                        }
                    })
                    if (values.estado == "Terminado" && is == true) {
                        // Mostrar la alerta indicando que hay actividades pendientes
                        $.confirm({
                            title: `Error`,
                            content: `No se puede cambiar el estado de la obra a "Terminado" mientras haya actividades en estado "En curso" o "En revisión".`,
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
                        });
                        setSubmitting(false)
                    } else {
                        setSubmitting(true)
                        updateObra(id, values)
                        alertConfirm("update")
                        navigate("/obras")
                    }
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
                                        <label htmlFor="idEmp">Dirección de la obra:</label>
                                        <Field
                                            type="text"
                                            id="direccion"
                                            name="direccion"
                                            label="Dirección"
                                            className="form-control form-control-user"
                                            placeholder="Dirección"
                                            disabled={true} // Aquí se establece el campo como inhabilitado
                                            value={direccionCliemte || ''} // Usando la dirección del cliente obtenida del fetch
                                        />
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
                                        <label htmlFor="fechafin">Fecha de fin estimado de la obra</label>
                                        <input
                                            type="text"
                                            disabled
                                            name="fechafin"
                                            label="Fecha Fin"
                                            className="form-control form-control-user"
                                            value={values.fechafin = fechaMaxima || values.fechafin}
                                            onChange={handleChange}

                                        />
                                        {
                                            errors.fechafin && touched.fechafin ? (
                                                <div className="alert alert-danger">{errors.fechafin}</div>
                                            ) : null
                                        }
                                    </div>
                                    <div className='col-md-3 mt-3 mx-auto'>
                                        <label htmlFor="precio">Ingrese el precio de la obra</label>
                                        <Field type="text" name="precio" label="Precio" className="form-control form-control-user" defaultValue={values.precio || ''} onChange={handleChange} />
                                        {
                                            errors.precio && touched.precio ? (
                                                <div className="alert alert-danger">{errors.precio}</div>
                                            ) : null
                                        }
                                    </div>
                                    <div className='col-md-3 mt-3 mx-auto'>
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
                                                    ...values
                                                })}
                                                onSubmit={async (values, { setSubmitting }) => {
                                                    // Verificar si ya existe una actividad con la misma descripción
                                                    const existingActivity = actividades.find(activity => activity.detalleObra.actividad.toLowerCase() === values.actividad.toLowerCase());
                                                    const activityChanged = selectedActivity && selectedActivity.detalleObra.actividad.toLowerCase() !== values.actividad.toLowerCase();

                                                    if (existingActivity && activityChanged) {
                                                        $.confirm({
                                                            title: `Error`,
                                                            content: `La actividad ya existe para esta obra`,
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
                                                        });
                                                        setSubmitting(false);
                                                        return;
                                                    }
                                                    else if (existingActivity && !selectedActivity) {
                                                        // Mostrar alerta si la actividad ya existe
                                                        $.confirm({
                                                            title: `Error`,
                                                            content: `La actividad ya existe para esta obra`,
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
                                                        });
                                                        setSubmitting(false);
                                                        return;
                                                    } else if (materialesList.length === 0 && !selectedActivity) {
                                                        $.confirm({
                                                            title: `Error`,
                                                            content: `Si está agregando una actividad es requerido seleccionar al menos un material`,
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
                                                        }), setSubmitting(false);
                                                        return;
                                                    }
                                                    else {
                                                        var estado;
                                                        if (selectedActivity) {
                                                            estado = values.estado
                                                        } else {
                                                            estado = "En curso"
                                                        }

                                                        setSubmitting(true);
                                                        const formattedShare = {
                                                            ...values,
                                                            estado: estado,
                                                            antiguo: selectedActivity ? selectedActivity.detalleObra.actividad : null,
                                                            materiales: materialesList
                                                        };

                                                        setSubmitting(true)
                                                        await createActividad(id, formattedShare);
                                                        alertConfirmAct();
                                                        setModalVisible(false);
                                                        setMaterialErrors([]);
                                                        calcularFechaMaxima(); // Llamada a la función calcularFechaMaxima() después de guardar la actividad

                                                    }
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
                                                            {
                                                                !selectedActivity ? (
                                                                    <select name="estado" id="estado" className="form-select form-control" value={values.estado} onChange={handleChange} disabled defaultValue={"En curso"}>
                                                                        <option value="En curso">En curso</option>
                                                                        <option value="En revisión">En revisión</option>
                                                                        <option value="Terminada">Terminada</option>
                                                                    </select>
                                                                ) : <select name="estado" id="estado" className="form-select form-control" value={values.estado} onChange={handleChange}>
                                                                    <option value="">Seleccione el estado de la actividad</option>
                                                                    <option value="En curso">En curso</option>
                                                                    <option value="En revisión">En revisión</option>
                                                                    <option value="Terminada">Terminada</option>
                                                                </select>
                                                            }
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

                                    <Modal isOpen={modalMaterialesVisible} toggle={() => setModalMaterialesVisible(!modalMaterialesVisible)}
                                    >
                                        <ModalHeader toggle={() => setModalMaterialesVisible(!modalMaterialesVisible)}>Gestionar Materiales</ModalHeader>
                                        <ModalBody>

                                            {materialesList.map((material, index) => (
                                                <Form key={index}>
                                                    <div className="container" key={index}>
                                                        <label htmlFor="">Seleccione un material:</label>
                                                        <Select
                                                            id={`materiales.${index}`}
                                                            name={`materiales.${index}`}
                                                            options={materiales}
                                                            value={materialesList[index].material}
                                                            onChange={(selectedMaterial) => handleMaterialChange(index, selectedMaterial)}
                                                        />

                                                        {materialErrors[index] && materialErrors[index].material && (
                                                            <div className="alert alert-danger mt-2" role="alert">
                                                                {materialErrors[index].material}
                                                            </div>
                                                        )}
                                                        <label className="mt-3">Ingrese la cantidad necesaria</label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
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
                                                        </div>
                                                    </div>
                                                    <hr className="mt-3" />
                                                </Form>
                                            ))}


                                            <Button color="success" onClick={handleAgregarMaterial}>
                                                Agregar Material
                                            </Button>

                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="secondary" onClick={handleCerrarModalMateriales}>
                                                Cancelar
                                            </Button>

                                            <Button color="primary" onClick={() => { handleGuardarMateriales() }}>
                                                Guardar Materiales
                                            </Button>

                                        </ModalFooter>
                                    </Modal>

                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <h3 className="text-center w-100">Actividades</h3>


                                            </div>
                                            {window.innerWidth > 768 && (
                                                <div className="col-md-3 mb-3">
                                                    <a className="btn btn-secondary " onClick={handleShowGantt}>
                                                        Cambiar vista <i className="fa-solid fa-retweet  "></i>
                                                    </a>
                                                </div>

                                            )}


                                            {!showGantt || window.innerWidth < 768 ? (
                                                <div className="col-md-3 mb-3">

                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Buscar actividad"
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                    />
                                                </div>
                                            ) : null
                                            }


                                        </div>
                                        <div className="row">
                                            {showGantt && window.innerWidth > 768 ? (
                                                <>
                                                    {actividades.length > 0 ? (
                                                        <>
                                                            <GanttTask actividades={actividades} handleActividad={handleAgregarActividad} />
                                                        </>
                                                    ) : (
                                                        <h3 className="text-center w-100">La obra no tiene actividades asociadas</h3>
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    {filteredActivities.length > 0 ? (
                                                        currentActivities.map((detalle) => (
                                                            <div key={detalle.id} className="col-md-3 mt-3">
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">Actividad: {detalle.detalleObra.actividad}</h5>
                                                                        <p className="card-text">Fecha de inicio: {formatoFechaIni(detalle.detalleObra.fechaini)}</p>
                                                                        <p className="card-text">Fecha de fin estimada: {calcularFechaFinEstimada(detalle.detalleObra.fechaini, detalle.detalleObra.fechafin)}</p>
                                                                        {detalle.empleados.length > 0 && (
                                                                            <p className="card-text">Empleados: {detalle.empleados.map((empleado) => empleado.empleado.nombre).join(', ')}</p>
                                                                        )}
                                                                        <p className="card-text">Estado: {detalle.detalleObra.estado}</p>
                                                                        <div className="mt-3">
                                                                            <Button
                                                                                className="btn btn-secondary"
                                                                                onClick={() => handleAgregarActividad(detalle)}
                                                                            >
                                                                                <i className="fa-solid fa-pen-to-square"></i>
                                                                                &nbsp;Editar
                                                                            </Button>
                                                                            <Button
                                                                                className="btn btn-primary ml-2"
                                                                                onClick={() => toggleModal(detalle.materiales)}
                                                                            >
                                                                                Ver Materiales
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <h3>No se encontraron actividades con los parametros de búsqueda ingresados</h3>
                                                    )}
                                                    <Modal isOpen={showMatModal} toggle={handleCerrarMateriales}>
                                                        <ModalHeader toggle={handleCerrarMateriales}>Materiales</ModalHeader>
                                                        <ModalBody>

                                                            <table className="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Material</th>
                                                                        <th>Cantidad</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {modalMaterials.map((material, index) => (
                                                                        <tr key={index}>
                                                                            <td>{material.materiales.nombre}</td>
                                                                            <td>{material.cantidad}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button color="secondary" onClick={handleCerrarMateriales}>Cerrar</Button>
                                                        </ModalFooter>
                                                    </Modal>
                                                </>
                                            )}

                                            <div className="container">
                                                <div className="row">
                                                    <div className="pagination col-md-1 mt-3 mx-auto">
                                                        {totalPages > 1 && showGantt == false ? (
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
                                                        ) : null}

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
                                <div className="row justify-content-center">
                                    <div className="col-md-6 text-center">
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