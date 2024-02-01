import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import axios from "axios";
import { Route, useNavigate, useParams } from "react-router-dom";
import { useObras } from "../../context/obras/ObrasProvider";
import { obraSchemaAgg, obraSchemaEdit } from "./ValidateObra"
import * as Yup from "yup"
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

const ObrasForm = () => {
  const params = useParams();
  const { createObra, updateObra, getObra, getActividades } = useObras();
  const navigate = useNavigate();

  const [clientes, setCliente] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [asesores, setAsesores] = useState([]);
  const [actividad, setActividad] = useState([])
  const [obra, setObra] = useState({
    idCliente: '',
    idEmp: '',
    area: '',
    fechaini: '',
    fechafin: '',
    precio: '',
    descripcion: '',
    estado: "",
    actividades: []
  });
  const [defaultMateriales, setDefaultMateriales] = useState([]); // Inicializa como array vacío
  const [defaultEmpleados, setDefaultEmpleados] = useState([]); // Inicializa como array vacío

  const alertConfirm = () => {
    var message = ""
    if (params.id) {
      message = "actualizado"
    } else {
      message = "agregado"
    }
    // eslint-disable-next-line no-undef
    $.confirm({
      title: `Material ${message} con éxito!`,
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
        },
      }
    })
  }

  useEffect(() => {
    const loadMaterialesEmpleados = async () => {
      const materialesData = await fetchMaterial("http://localhost:4000/materialesAc");
      const empleadosData = await fetchEmpleados("http://localhost:4000/empleadosAct");
      setMateriales(materialesData);
      setEmpleados(empleadosData);
    };

    fetchData("http://localhost:4000/clientes").then((data) => {
      setCliente(data);
    });

    fetchData("http://localhost:4000/empleadosAct").then((data) => {
      setAsesores(data)
    });
    fetchData(`http://localhost:4000/actividades/${params.id}`).then((data) => {
      setActividad(data)
      setFieldValue("actividades",data)
    })

    const loadObra = async () => {
      if (params.id) {
        try {
          const obra = await getObra(params.id);
          setObra({
            idCliente: obra.idCliente,
            idEmp: obra.idEmp,
            area: obra.area,
            fechaini: obra.fechaini,
            fechafin: obra.fechafin,
            precio: obra.precio,
            descripcion: obra.descripcion,
            estado: obra.estado,
            actividades: []
          })

          const defaultMateriales = obra.actividades.flatMap((actividad) =>
            actividad.materiales.map((material) => ({
              value: material.idMat,
              label: material.nombre,
            }))
          );

          const defaultEmpleados = obra.actividades.flatMap((actividad) =>
            actividad.empleados.map((empleado) => ({
              value: empleado.idEmp,
              label: empleado.nombre,
            }))
          );
          setDefaultMateriales(defaultMateriales);
          setDefaultEmpleados(defaultEmpleados);
        } catch (error) {
          console.error("Error fetching obra data:", error);
        }
      }
    };

    loadMaterialesEmpleados();
    loadObra();
  }, [params.id, getObra]);

  const initialValues = {
    idCliente: obra.idCliente,
    idEmp: obra.idEmp,
    area: obra.area,
    fechaini: obra.fechaini,
    fechafin: obra.fechafin,
    precio: obra.precio,
    descripcion: obra.descripcion,
    estado: obra.estado,
    actividades: obra.actividades || [], // Asegúrate de inicializar como un array
  };


  return (
    <div>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={params.id ? (
          obraSchemaEdit
        ) : obraSchemaAgg}
        onSubmit={(values) => {
          const formattedValues = {
            ...values,
            actividades: values.actividades.map((actividad) => ({
              ...actividad,
              materiales: actividad.materiales.map((material) => material.value),
              empleados: actividad.empleados.map((empleado) => empleado.value),
            })),
          };
          console.log(values)
          if (params.id) {
            updateObra(params.id, formattedValues)
            alertConfirm("update")
            navigate("/obras")
          } else {
            createObra(formattedValues)
            alertConfirm()
            navigate("/obras")
          }
        }}
      >
        {({ values, setFieldValue, isSubmitting, handleSubmit, setFieldTouched, errors, touched, handleChange }) => (
          <Form
            className='user'
            onSubmit={handleSubmit}
          >
            <div className='card text-center w-100'>
              <h2>{params.id ? "Editar" : "Agregar"} obra</h2>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-md-3 mt-3 mx-auto'>
                    <label htmlFor="idCliente">Seleccione el cliente:</label>
                    <Field as="select" name="idCliente" label="idCliente" className="form-select form-control-user" value={values.idCliente}>
                      <option value="">Seleccione el cliente</option>
                      {clientes.map((cliente) => (
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
                  {
                    params.id ? (
                      <div className='col-md-3 mt-3 mx-auto'>
                        <label htmlFor="area">Ingrese el area de la obra</label>
                        <Field type="text" name="area" label="Area" className="form-control form-control-user" placeholder="Area" />
                        {
                          errors.area && touched.area ? (
                            <div className="alert alert-danger">{errors.area}</div>
                          ) : null
                        }
                      </div>
                    ) : null
                  }



                  <div className='col-md-3 mt-3 mx-auto'>
                    <label htmlFor="fechaini">Seleccione la fecha de inicio de la obra</label>
                    <input type="date" name="fechaini" label="Fecha Inicio" className="form-control form-control-user" value={values.fechaini} onChange={handleChange} />
                    {
                      errors.fechaini && touched.fechaini ? (
                        <div className="alert alert-danger">{errors.fechaini}</div>
                      ) : null
                    }
                  </div>
                  {
                    params.id ? (
                      <div className='col-md-3 mt-3 mx-auto'>
                        <label htmlFor="fechafin">Seleccione la fecha de fin de la obra</label>
                        <input type="date" name="fechafin" label="Fecha Fin" className="form-control form-control-user" value={values.fechafin} onChange={handleChange} />
                        {
                          errors.fechafin && touched.fechafin ? (
                            <div className="alert alert-danger">{errors.fechafin}</div>
                          ) : null
                        }
                      </div>
                    ) : null
                  }
                  {
                    params.id ? (
                      <div className='col-md-4 mt-3 mx-auto'>
                        <label htmlFor="precio">Ingrese el precio de la obra</label>
                        <Field type="text" name="precio" label="Precio" className="form-control form-control-user" defaultValue={values.precio || ''} onChange={handleChange} />
                        {
                          errors.precio && touched.precio ? (
                            <div className="alert alert-danger">{errors.precio}</div>
                          ) : null
                        }
                      </div>
                    ) : null
                  }
                  <div className='col-md-4 mt-3 mx-auto'>
                    <label htmlFor="estado">Seleccione el estado de la obra</label>
                    {params.id ? (
                      <select name="estado" id="estado" className="form-select form-control-user" onChange={handleChange} value={values.estado}>
                        <option value="">Seleccione una opción</option>
                        <option value="En asesoria">En asesoria</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="En construcción">En construcción</option>
                        <option value="Terminado">Terminado</option>
                      </select>
                    ) : (
                      <select name="estado" disabled id="estado" className="form-select form-control-user" onChange={handleChange}>
                        <option value="">Seleccione una opción</option>
                        <option value="En asesoria">En asesoria</option>
                        <option selected value="Pendiente">Pendiente</option>
                        <option value="En construcción">En construcción</option>
                        <option value="Terminado">Terminado</option>
                      </select>
                    )}

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
                  {params.id ? (
                    <FieldArray name="actividades">
                      {({ push, remove }) => (
                        <div>
                          {values.actividades.map((actividad, index) => (
                            <div key={index} className="row mt-3">
                              <hr />
                              <h3>Información de la actividad #{index + 1}</h3>
                              <div className='col-md-4'>
                                <label htmlFor={`actividades[${index}].descripcion`}>Descripción de la actividad</label>
                                <Field as="textarea" name={`actividades[${index}].descripcion`} className="form-control form-control-user" />
                                <ErrorMessage name={`actividades[${index}].descripcion`} component="div" className="alert alert-danger" />
                              </div>
                              <div className='col-md-4'>
                                <label htmlFor={`actividades[${index}].fechaini`}>Fecha Inicio</label>
                                <Field type="date" name={`actividades[${index}].fechaini`} className="form-control form-control-user" />
                                <ErrorMessage name={`actividades[${index}].fechaini`} component="div" className="alert alert-danger" />
                              </div>
                              <div className='col-md-4'>
                                <label htmlFor={`actividades[${index}].fechafin`}>Fecha Fin</label>
                                <Field type="date" name={`actividades[${index}].fechafin`} className="form-control form-control-user" />
                                <ErrorMessage name={`actividades[${index}].fechafin`} component="div" className="alert alert-danger" />
                              </div>
                              <div className="col-md-4 mt-3 mx-auto">
                                <label htmlFor={`actividades[${index}].materiales`}>Materiales:</label>
                                <Select
                                  id={`actividades[${index}].materiales`}
                                  options={materiales}
                                  isMulti
                                  value={actividad.materiales}
                                  onChange={(selectedMateriales) => setFieldValue(`actividades[${index}].materiales`, selectedMateriales)}
                                  onBlur={() => setFieldTouched(`actividades[${index}].materiales`, true)}
                                />
                                <ErrorMessage name={`actividades[${index}].materiales`} component="div" className="alert alert-danger" />
                              </div>
                              <div className="col-md-4 mt-3 mx-auto">
                                <label htmlFor={`actividades[${index}].empleados`}>Empleados:</label>
                                <Select
                                  id={`actividades[${index}].empleados`}
                                  options={empleados}
                                  isMulti
                                  value={actividad.empleados}
                                  onChange={(selectedEmpleados) => setFieldValue(`actividades[${index}].empleados`, selectedEmpleados)}
                                  onBlur={() => setFieldTouched(`actividades[${index}].empleados`, true)}
                                />
                                <ErrorMessage name={`actividades[${index}].empleados`} component="div" className="alert alert-danger" />
                              </div>
                              <div className='col-md-4'>
                                <label htmlFor={`actividades[${index}].estadoAct`}>Estado</label>
                                <Field as="select" name={`actividades[${index}].estadoAct`} className="form-select form-control-user">
                                  <option value="">Seleccione un estado</option>
                                  <option value="En curso">En curso</option>
                                  <option value="En revisión">En revisión</option>
                                  <option value="Terminada">Terminada</option>
                                </Field>
                                <ErrorMessage name={`actividades[${index}].estadoAct`} component="div" className="alert alert-danger" />
                              </div>
                              <div className='col-md-4 mt-3'>
                                <button type="button" className="btn btn-danger" onClick={() => remove(index)}>
                                  Eliminar actividad
                                </button>
                              </div>
                            </div>
                          ))}
                          <hr className='mt-4' />
                          <div className="row mt-3">
                            <div className='col-md-12'>
                              <button type="button" className='btn btn-success' onClick={() => push({ descripcion: '', fechaini: '', fechafin: '', materiales: [], empleados: [], estadoAct: '' })}>
                                Agregar actividad
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </FieldArray>
                  ) : null}
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
                      <span className="text">{params.id ? "Editar" : "Agregar"}</span>
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
  );
}

export default ObrasForm;