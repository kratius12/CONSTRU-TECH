import { Form, Formik, Field, ErrorMessage } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Select from "react-select";
import { useObras } from "../../context/obras/ObrasProvider";
import { ObraSchema, getValidate } from "../../components/ValidatorObra";
import * as Yup from "yup";
function ObrasForm() {
  const {
    createObra,
    getObra,
    updateObra,
    clientes,
    Clientes,
    materiales,
    Materiales,
    empleados,
    Empleados,
  } = useObras();
  const params = useParams();
  const navigate = useNavigate();
  const [keyMat, setKeyMat] = useState(0);
  const [keyEmp, setKeyEmp] = useState(0);
  const [keyCli, setKeyCli] = useState(0);

  const [actividades, setActividades] = useState([
    {
      actividad: "",
      fechaInicio: "",
      fechaFinal: "",
      empleados: [],
      materiales: [],
      estadoAct: "",
    },
  ]);

  const [optionsMat, setOptionsMat] = useState([]);
  const [defaultOptionsMat, setDefaultOptionsMat] = useState([]);
  const [selectedMat, setSelectedMat] = useState([]);

  const [optionsEmp, setOptionsEmp] = useState([]);
  const [defaultOptionsEmp, setDefaultOptionsEmp] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState([]);

  const [optionsCli, setOptionsCli] = useState([]);
  const [defaultOptionsCli, setDefaultOptionsCli] = useState([]);
  const [selectedCli, setSelectedCli] = useState(null);

  const optsEstadoAct = [
    { value: "En curso", label: "En curso" },
    { value: "En revision", label: "En revision" },
    { value: "Terminada", label: "Terminada" },
  ];

  // const [optionsEstado, setOptionsEstado] = useState(optsEstado);
  // const [defaultOptionsEstado, setDefaultOptionsEstado] = useState([]);
  // const [selectedEstado, setSelectedEstado] = useState(defaultOptionsEstado)
  const [actividadCounter, setActividadCounter] = useState(0);

  const [obra, setObra] = useState({
    descripcion: "",
    area: "",
    estado: "",
    fechaini: "",
    fechafin: "",
    precio: "",
    cliente: [],
    actividades: [
        {
            actividad:'',
            fechaInicio:'',
            fechaFinal:'',
            empleados:[],
            materiales:[],
            estadoAct:''
        }
    ]
  });

  useEffect(() => {
    const loadObras = async () => {
      if (params.id) {
        const obra = await getObra(params.id);
        setObra({
          descripcion: obra.descripcion,
          area: obra.area,
          estado: obra.estado,
          fechaini: obra.fechaini,
          fechafin: obra.fechafin,
          precio: obra.precio,
          cliente: obra.cliente.idCliente,
          empleados: obra.empleado_obra,
          material: obra.materiales_obras,
          actividades: [
            {
                actividad:'',
                fechaInicio:'',
                fechaFinal:'',
                empleados:[],
                materiales:[],
                estadoAct:''
            }
        ]
        });
        // const defaultOptsEmp = obra.empleado_obra.map(item => ({ value: item.empleado.idEmp, label: item.empleado.nombre }))
        // setDefaultOptionsEmp(defaultOptsEmp)
        // setSelectedEmp(defaultOptsEmp)
        // setKeyEmp(prevKey => prevKey + 1)

        // const defaultOptsMat = obra.materiales_obras.map(item => ({ value: item.materiales.idMat, label: item.materiales.nombre }))
        // setDefaultOptionsMat(defaultOptsMat)
        // setSelectedMat(defaultOptsMat)
        // setKeyMat(prevKey => prevKey + 1)

        const defaultOptionsCli = [
          {
            value: obra.cliente.idCli,
            label: obra.cliente.nombre,
          },
        ];
        setDefaultOptionsCli(defaultOptionsCli);
        setSelectedCli(defaultOptionsCli);
        setKeyCli((prevKey) => prevKey + 1);
      }
    };

    loadObras();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const materialesData = await Materiales()
      const opcionesMat = materialesData.filter(item=> item.estado ==1).map(item => ({ value: item.idMat, label: item.nombre }))
      setOptionsMat(opcionesMat)

      const empleadosData = await Empleados();
      const opcionesEmp = empleadosData
        .filter((item) => item.estado == 1)
        .map((item) => ({
          value: item.idEmp,
          label: item.nombre + "-" + item.apellidos,
        }));
      setOptionsEmp(opcionesEmp);

      const clientesData = await Clientes();
      const opcionesClientes = clientesData
        .filter((item) => item.estado == 1)
        .map((item) => ({ value: item.idCli, label: item.nombre }));
      setOptionsCli(opcionesClientes);
      setKeyCli((prevKey) => prevKey + 1);
    };
    fetchData();
  }, [defaultOptionsCli, defaultOptionsEmp, defaultOptionsMat]);

  const validate = (values) => {
    const hasId = params.id ? params.id : "";
    const errors = getValidate(values, hasId);

    return errors;
  };

  const handleMenuClose = () => {
    const focusHelper = document.getElementById("focusHelper");
    if (focusHelper) {
      focusHelper.focus();
    }
  };

  const handleAgregarActividad = () => {
    // setActividades((prevActividades) => [
    //   ...prevActividades,
    //   {
    //     actividad: "",
    //     fechaInicio: "",
    //     fechaFinal: "",
    //     empleados: [],
    //     materiales: [],
    //     estadoAct: "",
    //   },
    // ]);
    setActividadCounter(actividadCounter + 1);
    setObra((prevObra) => ({
        ...prevObra,
        actividades:[
            ...prevObra.actividades,
            {
                actividad:'',
                fechaInicio:'',
                fechaFinal:'',
                empleados:[],
                materiales:[],
                estadoAct:''
            }
        ]
    }))
  };

  const handleChangeActividad = (actividadIndex, field, value) => {
    setObra((prevObra) => {
        const newActividades = [...prevObra.actividades]
        newActividades[actividadIndex] = {
            ...newActividades[actividadIndex],
            [field]: value
        }
        return {...prevObra, actividades: newActividades}
    })
    // setObra((prevObra) => {
    //     const newActividades = [...prevObra.actividades]
    //     newActividades[index][field] = value

    //     return {
    //         ...prevObra,
    //         actividades: newActividades
    //     }
    // })
    // setActividades((prevActividades) => {
    //     const newActividades = [...prevActividades]
    //     newActividades[index][field] = value
    //     return newActividades
    // })
    // const addActividad = [...actividades];
    // addActividad[index][field] = value;
    // setActividades(addActividad);
  };

  const alertConfirm = (type) => {
    var message = "";
    if (type == "update") {
      message = "Actualizado";
    } else {
      message = "Agregada";
    }
    $.confirm({
      title: `Obra ` + message + ` con exito!`,
      content: "Redirecionando a listado de empleados...",
      icon: "fa fa-check",
      theme: "modern",
      closeIcon: true,
      animation: "zoom",
      closeAnimation: "scale",
      animationSpeed: 500,
      type: "green",
      columnClass: "col-md-6 col-md-offset-3",
      autoClose: "okay|4000",
      buttons: {
        okay: function () {},
      },
    });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Formik
            initialValues={obra}
            enableReinitialize={true}
            // validationSchema={ObraSchema}
            validate={validate}
            onSubmit={async (values) => {
              const cleannedDescription = values.descripcion
                .replace(/\s{2,}/g, " ")
                .trim();
              const cleannedArea = values.area.replace(/\s{2,}/g, " ").trim();
              const obraObject = {
                ...values,
                area: cleannedArea,
                descripcion: cleannedDescription,
                cliente: selectedCli,
              };
              if (params.id) {
                await updateObra(params.id, obraObject);
                alertConfirm("update");
                setTimeout(navigate("/obras"), 5000);
                // navigate("/obras")
              } else {
                await createObra(obraObject);
                // navigate("/obras")
                alertConfirm();
                setTimeout(navigate("/obras"), 5000);
              }
              setObra({
                descripcion: "",
                area: "",
                estado: "",
                precio: "",
                fechaini: "",
                fechafin: "",
                cliente: [],
                actividades: [
                    {
                        actividad:'',
                        fechaInicio:'',
                        fechaFinal:'',
                        empleados:[],
                        materiales:[],
                        estadoAct:''
                    }
                ],
              });
            }}
          >
            {({
              handleChange,
              handleSubmit,
              setFieldValue,
              setFieldTouched,
              values,
              isSubmitting,
              errors,
              touched,
            }) => (
              <Form onSubmit={handleSubmit} className="user">
                <div className="card text-center w-100">
                  <h2>{params.id ? "Editar" : "Agregar"} obra</h2>
                  <div className="card-body">
                    <div className="row">
                      <div id="focusHelper"></div>
                      {params.id ? (
                        <>
                          <div className="col-md-6 mt-3">
                            <label htmlFor="cliente" className="form-label">
                              Cliente<span className="text-danger">*</span>
                            </label>
                            <Select
                              key={keyCli}
                              placeholder={<div>Selecciona cliente</div>}
                              defaultValue={defaultOptionsCli}
                              name="cliente"
                              options={optionsCli}
                              className="basic-multi-select"
                              classNamePrefix="select"
                              onChange={(selectedCli) => {
                                setSelectedCli(selectedCli);
                                handleMenuClose;
                              }}
                            />
                            {errors.cliente && touched.cliente ? (
                              <div className="alert alert-danger" role="alert">
                                {errors.cliente}
                              </div>
                            ) : null}
                          </div>
                          <div className="col-md-6 mt-3">
                            <label htmlFor="estado" className="form-label">
                              Estado<span className="text-danger">*</span>
                            </label>
                            <Select
                              id="estado"
                              className="basic-multi-select"
                              classNamePrefix="select"
                              options={[
                                { value: "En sesoria", label: "En sesoria" },
                                { value: "Pendiente", label: "Pendiente" },
                                {
                                  value: "En construccion",
                                  label: "En construccion",
                                },
                                { value: "Terminado", label: "Terminado" },
                              ]}
                              value={{
                                value: values.estado,
                                label:
                                  values.estado === ""
                                    ? "Seleccione estado*"
                                    : values.estado,
                              }}
                              onChange={(selectedOption) => {
                                setFieldValue("estado", selectedOption.value);
                                setFieldTouched("estado", true);
                              }}
                              onBlur={() => setFieldTouched("estado", true)}
                            />
                            {errors.estado && touched.estado ? (
                              <div className="alert alert-danger" role="alert">
                                {errors.estado}
                              </div>
                            ) : null}
                          </div>
                          <div className="col-md-6 mt-3">
                            <label htmlFor="fechaini" className="form-label">
                              Fecha inicio<span className="text-danger">*</span>
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id="fechaini"
                              onChange={handleChange}
                              value={values.fechaini}
                            />
                            {errors.fechaini && touched.fechaini ? (
                              <div className="alert alert-danger" role="alert">
                                {errors.fechaini}
                              </div>
                            ) : null}
                          </div>
                          <div className="col-md-6 mt-3">
                            <label htmlFor="fechafin" className="form-label">
                              Fecha fin<span className="text-danger">*</span>
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id="fechafin"
                              onChange={handleChange}
                              value={values.fechafin || ""}
                            />
                            {errors.fechafin && touched.fechafin ? (
                              <div className="alert alert-danger" role="alert">
                                {errors.fechafin}
                              </div>
                            ) : null}
                          </div>
                          <div className="col-md-6 mt-3">
                            <label htmlFor="area" className="form-label">
                              Área de la obra
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-user"
                              id="area"
                              onChange={handleChange}
                              value={values.area || ""}
                              placeholder="Area de la obra*"
                            />
                            {errors.area && touched.area ? (
                              <div className="alert alert-danger" role="alert">
                                {errors.area}
                              </div>
                            ) : null}
                          </div>
                          <div className="col-md-6 mt-3">
                            <label htmlFor="precio" className="form-label">
                              Precio de la obra
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-user"
                              id="precio"
                              onChange={handleChange}
                              value={values.precio || ""}
                              placeholder="Precio de la obra*"
                            />
                            {errors.precio && touched.precio ? (
                              <div className="alert alert-danger" role="alert">
                                {errors.precio} 
                              </div>
                            ) : null}
                          </div>
                          <div className="col-md-12">
                            <hr />
                            {obra.actividades.map((actividad, index) => (
                                    <div key={index} className="row my-4 px-4">
                                      <div className="col-md-4">
                                        <label
                                          htmlFor={`actividad-${index}`}
                                          className="form-label"
                                        >
                                          Actividad
                                          <span className="text-danger">*</span>
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control form-control-user"
                                          id={`actividad-${index}`}
                                          onChange={(e) =>
                                            handleChangeActividad(
                                              index,
                                              "actividad",
                                              e.target.value
                                            )
                                          }
                                          value={obra.actividades[index]?.actividad || ''}
                                          placeholder="Actividad ha realizarse*"
                                        />
                                      </div>
                                      <div className="col-md-4">
                                        <label
                                          htmlFor={`fechaInicio-${index}`}
                                          className="form-label"
                                        >
                                          Fecha inicio (actividad)
                                          <span className="text-danger">*</span>
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control form-control-user"
                                          id={`fechaInicio-${index}`}
                                          onChange={(e) =>
                                            handleChangeActividad(
                                              index,
                                              "fechaInicio",
                                              e.target.value
                                            )
                                          }
                                          value={obra.actividades[index]?.fechaInicio || ""}
                                          placeholder="Fecha de inicio de la actividad*"
                                        />
                                      </div>
                                      <div className="col-md-4">
                                        <label
                                          htmlFor={`fechaFinal-${index}`}
                                          className="form-label"
                                        >
                                          Fecha fin (actividad)
                                          <span className="text-danger">*</span>
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control form-control-user"
                                          id={`fechaFinal-${index}`}
                                          onChange={(e) =>
                                            handleChangeActividad(
                                              index,
                                              "fechaFinal",
                                              e.target.value
                                            )
                                          }
                                          value={obra.actividades[index]?.fechaFinal || ""}
                                          placeholder="Fecha de finalizacion de la actividad*"
                                        />
                                      </div>
                                      <div className="col-md-4 my-4">
                                          <label htmlFor={`empleados-${index}`} className="form-label">
                                              Empleados<span className="text-danger">*</span>
                                          </label>
                                          <Select
                                              placeholder={<div>Selecciona empleados</div>}
                                              name={`empleados-${index}`}
                                              value={obra.actividades[index].empleados}
                                              options={optionsEmp}
                                              className="basic-multi-select"
                                              classNamePrefix="select"
                                              onChange={(selectedEmp) => {
                                                handleChangeActividad(index, 'empleados', selectedEmp);
                                                setSelectedEmp(selectedEmp);
                                                handleMenuClose();
                                              }}
                                              onBlur={() => setFieldTouched(`empleados-[${index}].empleados`, true)}
                                              onMenuClose={handleMenuClose}
                                          />
                                      </div>
                                      <div className="col-md-4 my-4">
                                          <label htmlFor={`materiales-${index}`} className="form-label">
                                              Materiales<span className="text-danger">*</span>
                                          </label>
                                          <Select
                                              placeholder={<div>Selecciona materiales</div>}
                                              name={`materiales-${index}`} 
                                              value={obra.actividades[index].materiales}
                                              options={optionsMat}
                                              className="basic-multi-select"
                                              classNamePrefix="select"
                                              onChange={(selectedMat) => {
                                                handleChangeActividad(index, 'materiales', selectedMat);
                                                setSelectedMat(selectedMat);
                                                handleMenuClose();
                                              }}
                                              onBlur={() => setFieldTouched(`materiales-[${index}].materiales`, true)}
                                              onMenuClose={handleMenuClose}
                                          />
                                      </div>
                                      <div className="col-md-4 my-4">
                                        <label
                                          htmlFor={`estadoAct-${index}`}
                                          className="form-label"
                                        >
                                          Estado<span className="text-danger">*</span>
                                        </label>
                                        <Select
                                          placeholder={<div>Selecciona estado</div>}
                                          name={`estadoAct-${index}`}
                                          
                                          options={optsEstadoAct}
                                          className="basic-multi-select"
                                          classNamePrefix="select"
                                          
                                          onBlur={() =>
                                            setFieldTouched(`estadoAct-${index}`, true)
                                          }
                                          onMenuClose={handleMenuClose}
                                        />
                                      </div>
                                      <hr />
                                    </div>
                                ))}
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleAgregarActividad}
                            >
                              Agregar Actividad
                            </button>
                          </div>
                          <div className="col-md-12 mt-3">
                            <label htmlFor="descripcion" className="form-label">
                              Descripcion de la obra
                              <span className="text-danger">*</span>
                            </label>
                            <textarea
                              type="text"
                              className="form-control form-control-user"
                              id="descripcion"
                              onChange={handleChange}
                              value={values.descripcion}
                              placeholder="Descripción de la obra*"
                            />
                            {errors.descripcion && touched.descripcion ? (
                              <div className="alert alert-danger" role="alert">
                                {errors.descripcion}
                              </div>
                            ) : null}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="col-md-6 mt-3">
                            <label htmlFor="cliente" className="form-label">
                              Cliente<span className="text-danger">*</span>
                            </label>
                            <Select
                              placeholder={<div>Selecciona cliente</div>}
                              name="cliente"
                              value={selectedCli}
                              options={optionsCli}
                              className="basic-multi-select"
                              classNamePrefix="select"
                              onChange={(selectedCli) => {
                                setFieldValue("cliente", selectedCli);
                                setSelectedCli(selectedCli);
                                handleMenuClose;
                              }}
                              onBlur={() => setFieldTouched("cliente", true)}
                              onMenuClose={handleMenuClose}
                            />
                            {errors.cliente && touched.cliente ? (
                              <div className="alert alert-danger" role="alert">
                                {errors.cliente}
                              </div>
                            ) : null}
                          </div>
                          <div className="col-md-6 mt-3">
                            <label htmlFor="empleados" className="form-label">
                              Asignar asesor
                              <span className="text-danger">*</span>
                            </label>
                            <Select
                              key={keyEmp}
                              placeholder={<div>Asignar asesor</div>}
                              name="empleados"
                              options={optionsEmp}
                              className="basic-multi-select"
                              classNamePrefix="select"
                              onChange={(selectedEmp) => {
                                setFieldValue("empleados", selectedEmp);
                                setSelectedEmp(selectedEmp);
                                handleMenuClose;
                              }}
                              onBlur={() => setFieldTouched("empleados", true)}
                            />
                            {errors.empleados && touched.empleados ? (
                              <div className="alert alert-danger" role="alert">
                                {errors.empleados}
                              </div>
                            ) : null}
                          </div>
                          <div className="col-md-6 mt-3">
                            <label htmlFor="estado" className="form-label">
                              Estado<span className="text-danger">*</span>
                            </label>
                            <select
                              id="estado"
                              className="form-select form-control-user"
                              onChange={handleChange}
                              defaultValue={values.estado}
                              disabled
                            >
                              <option value="Pendiente">Pendiente</option>
                            </select>
                            {errors.estado && touched.estado ? (
                              <div className="alert alert-danger" role="alert">
                                {errors.estado}
                              </div>
                            ) : null}
                          </div>

                          <div className="col-md-6 mt-3">
                            <label htmlFor="fechaini" className="form-label">
                              Fecha inicio<span className="text-danger">*</span>
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id="fechaini"
                              onChange={handleChange}
                              value={values.fechaini}
                            />
                            {errors.fechaini && touched.fechaini ? (
                              <div className="alert alert-danger" role="alert">
                                {errors.fechaini}
                              </div>
                            ) : null}
                          </div>
                          <div className="col-md-12 mt-3">
                            <label htmlFor="descripcion" className="form-label">
                              Descripcion de la obra
                              <span className="text-danger">*</span>
                            </label>
                            <textarea
                              type="text"
                              className="form-control form-control-user"
                              id="descripcion"
                              onChange={handleChange}
                              value={values.descripcion}
                              placeholder="Descripción de la obra*"
                            />
                            {errors.descripcion && touched.descripcion ? (
                              <div className="alert alert-danger" role="alert">
                                {errors.descripcion}
                              </div>
                            ) : null}
                          </div>
                        </>
                      )}
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
                          <span className="text">
                            {params.id ? "Editar" : "Agregar"}
                          </span>
                        </button>
                      </div>
                      <div className="col-md-6">
                        <a
                          type="button"
                          href=""
                          className="btn btn-danger btn-icon-split w-50"
                          onClick={() => navigate(`/obras`)}
                        >
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
  );
}

export default ObrasForm;
