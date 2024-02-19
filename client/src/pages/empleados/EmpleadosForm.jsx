import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Form, Formik, Field } from "formik";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEmpleados } from "../../context/empleados/EmpleadosProvider";
import EmpleadoSchema from "../../components/empleados/ValidatorEmpleado"

const fetchData1 = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export default function EmpleadosForm() {
  const { createEmpleado, getEmpleado, updateEmpleado, especialidades, Especialidades, searchDoc, searchEmail } = useEmpleados();
  const params = useParams();
  const navigate = useNavigate();
  const [key, setKey] = useState(0);
  const [keyRol, setKeyRol] = useState(0)
  const [options, setOptions] = useState([]);
  const [defaultOptions, setDefaultOptions] = useState([]);
  const [selectedEsp, setSelectedEsp] = useState(defaultOptions);
  const initialState = {
    nombre: "",
    apellidos: "",
    direccion: "",
    estado: 1,
    telefono: "",
    tipoDoc: "",
    cedula: "",
    especialidad: [],
    email: "",
    contrasena: "",
    rol:""
  };

  const [empleado, setEmpleado] = useState(initialState);
  const [email, setEmail] = useState(true)
  const [doc, setDoc] = useState(true)
  const [rol, setRol] = useState([])


  useEffect(() => {
    const rol = async () => {
      axios.get(`http://localhost:4000/rolesAct`).then((response) => {
        setRol(response.data)
      })
    }
    const loadEmpleados = async () => {
      if (params.id) {
        const empleado = await getEmpleado(params.id);
        if (empleado) {
          setEmpleado({
            nombre: empleado.nombre,
            apellidos: empleado.apellidos,
            direccion: empleado.direccion,
            estado: empleado.estado === "0" ? "0" : "1",
            email: empleado.email,
            telefono: empleado.telefono,
            tipoDoc: empleado.tipoDoc,
            cedula: empleado.cedula,
            especialidad: empleado.empleado_especialidad,
            contrasena: '',
            rol: empleado.rol.idRol
          });
          const defaultOpts = empleado.empleado_especialidad.map((item) => ({
            value: item.especialidad.id,
            label: item.especialidad.especialidad,
          }));
          setDefaultOptions(defaultOpts);
          setKey((prevKey) => prevKey + 1);
        }
      } else {
        setEmpleado(initialState);
      }
    };

    const fetchData = async () => {
      const especialidadesData = await Especialidades();
      const opciones = especialidadesData
        .filter((item) => item.estado == 1)
        .map((item) => ({ value: item.id, label: item.especialidad }));
      setOptions(opciones);
    };

    fetchData();
    loadEmpleados();
    rol()
  }, []);


  const alertConfirm = (type) => {
    var message = "";
    if (type === "update") {
      message = "Actualizado";
    } else {
      message = "Agregado";
    }
    window.$.confirm({
      title: `Empleado ` + message + ` con éxito!`,
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
        okay: function () { },
      },
    });
  };

  const checkEmail = async (email) => {
    try {
      const response = await fetch(`http://localhost:4000/checkEmailEmp/${email}/${params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (response.status === 203) {
        $.confirm({
          title: `El correo ingresado ya existe, por favor intente con uno diferente`,
          content: "",
          icon: 'fa fa-x-mark',
          theme: 'modern',
          closeIcon: true,
          animation: 'zoom',
          closeAnimation: 'scale',
          animationSpeed: 500,
          type: 'red',
          columnClass: 'col-md-6 col-md-offset-3',
          buttons: {
            cerrar: function () {
            },
          }
        })
        setEmail(true)
      } else {
        setEmail(false)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const checkDoc = async (tipoDoc, cedula) => {
    try {
      const response = await fetch(`http://localhost:4000/checkDocEmp/${cedula}/${tipoDoc}/${params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (response.status === 203) {
        $.confirm({
          title: `El numero y tipo de documento ingresado ya existe`,
          content: "",
          icon: 'fa fa-x-mark',
          theme: 'modern',
          closeIcon: true,
          animation: 'zoom',
          closeAnimation: 'scale',
          animationSpeed: 500,
          type: 'red',
          columnClass: 'col-md-6 col-md-offset-3',
          buttons: {
            cerrar: function () {
            },
          }
        })
        setDoc(true)
      } else {
        setDoc(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Formik
            initialValues={empleado}
            enableReinitialize={true}
            validationSchema={EmpleadoSchema}
            validateOnChange={true}
            onSubmit={async (values) => {
              const empleadoObject = {
                ...values,
                especialidad: selectedEsp,

              };

              checkEmail(values.email)
              checkDoc(values.tipoDoc, values.cedula)
              if (email === false && doc === false) {
                if (params.id) {
                  
                  await updateEmpleado(params.id, empleadoObject);
                  alertConfirm('update');
                  setTimeout(() => navigate("/empleados"));
                } else {
                  
                  await createEmpleado(empleadoObject);
                  alertConfirm();
                  setTimeout(() => navigate("/empleados"));
                }
              }


            }}
          >
            {({ handleChange, handleSubmit, values, isSubmitting, errors, touched, setFieldValue }) => (
              <Form onSubmit={handleSubmit} className="user">
                <div className="card text-center w-100">
                  <br />
                  <h1 className="h4 text-gray-900 mb-4">{params.id ? "Editar" : "Agregar"} empleado</h1>
                  <div className="card-body">
                    <div className="row">
                      <div id="focusHelper"></div>
                      <div className="col-md-6 mt-3">
                        <Field type="text" className="form-control form-control-user" id="nombre" name="nombre" placeholder="Nombres*" />
                        {errors.nombre && touched.nombre ? (
                          <div className="alert alert-danger" role="alert">{errors.nombre}</div>
                        ) : null}
                      </div>
                      <div className="col-md-6 mt-3">
                        <input type="text" className="form-control form-control-user" id="apellidos" onChange={handleChange} value={values.apellidos} placeholder="Apellidos*" />
                        {errors.apellidos && touched.apellidos ? (
                          <div className="alert alert-danger" role="alert">{errors.apellidos}</div>
                        ) : null}
                      </div>
                      <div className="col-md-6 mt-3">
                        <input type="text" className="form-control form-control-user" id="email" onChange={(e) => {
                          handleChange(e)
                          checkEmail(e.target.value)
                        }} value={values.email} placeholder="Email*" />
                        {errors.email && touched.email ? (
                          <div className="alert alert-danger" role="alert">{errors.email}</div>
                        ) : null}
                      </div>
                      <div className="col-md-6 mt-3">
                        <input type="password" className="form-control form-control-user" id="contrasena" onChange={handleChange} value={values.contrasena} placeholder="Contraseña*" />
                        {errors.contrasena && touched.contrasena ? (
                          <div className="alert alert-danger" role="alert">{errors.contrasena}</div>
                        ) : null}
                      </div>
                      <div className="col-md-6 mt-3">
                        <select id="tipoDoc" className="form-select form-control-user" onChange={(e) => {
                          handleChange(e)

                        }} value={values.tipoDoc}>
                          <option value="">Seleccione tipo documento*</option>
                          <option value="Cedula de ciudadanía">Cedula de ciudadanía</option>
                          <option value="Cedula de extranjería">Cedula de extranjería</option>
                          <option value="Pasaporte">Pasaporte</option>
                        </select>
                        {errors.tipoDoc && touched.tipoDoc ? (
                          <div className="alert alert-danger" role="alert">{errors.tipoDoc}</div>
                        ) : null}
                      </div>
                      <div className="col-md-6 mt-3">
                        <input type="text" className="form-control form-control-user" id="cedula" onChange={(e) => {
                          handleChange(e)
                          checkDoc(values.tipoDoc, values.cedula)
                          params.id ? '' : checkDoc(values.tipoDoc, e.target.value)
                        }} value={values.cedula} placeholder="Número de documento*" />
                        {errors.cedula && touched.cedula ? (
                          <div className="alert alert-danger" role="alert">{errors.cedula}</div>
                        ) : null}
                      </div>
                      <div className="col-md-6 mt-3">
                        <input type="text" className="form-control form-control-user" id="telefono" onChange={handleChange} value={values.telefono} placeholder="Número telefónico*" />
                        {errors.telefono && touched.telefono ? (
                          <div className="alert alert-danger" role="alert">{errors.telefono}</div>
                        ) : null}
                      </div>
                      <div className="col-md-6 mt-3">
                        <input type="text" className="form-control form-control-user" id="direccion" onChange={handleChange} value={values.direccion} placeholder="Dirección*" />
                        {errors.direccion && touched.direccion ? (
                          <div className="alert alert-danger" role="alert">{errors.direccion}</div>
                        ) : null}
                      </div>
                      <div className="col-md-6 mt-3">
                        {params.id ? (
                          <select id="estado" className="form-select form-control-user" onChange={handleChange} value={values.estado} >
                            <option value="">Seleccione estado</option>
                            <option value="1">Activo</option>
                            <option value="0">Inactivo</option>
                          </select>
                        ) :null}
                        {errors.estado && touched.estado ? (
                          <div className="alert alert-danger" role="alert">{errors.estado}</div>
                        ) : null}
                      </div>
                      <div className="col-md-6 mt-3">
                        <label>Selecciona especialidades:</label>
                        <Select
                          id="especialidad"
                          key={key}
                          defaultValue={defaultOptions}
                          isMulti
                          name="especialidad"
                          options={options}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={(selectedEsp) => {
                            setSelectedEsp(selectedEsp)
                            setFieldValue("especialidad", selectedEsp)
                          }}
                        />
                        {errors.especialidad && touched.especialidad ? (
                          <div className="alert alert-danger" role="alert">{errors.especialidad}</div>
                        ) : null}
                      </div>
                      <div className="col-md-6 mt-3">
                        <select
                          id="rol"
                          name="rol"
                          className="form-select form-control-user"
                          onChange={handleChange}
                          value={values.rol}
                        >
                          <option value="">Seleccione el rol del empleado*</option>
                          {rol.map((role) => (
                            <option key={role.idRol} value={role.idRol}>
                              {role.nombre}
                            </option>
                          ))}
                        </select>
                        {errors.rol && touched.rol ? (
                          <div className="alert alert-danger" role="alert">{errors.rol}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="card-footer text-center">
                    <div className="row">
                      <div className="col-md-6">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-icon-split w-50">
                          <span className="text-white-50">
                            <i className="fas fa-plus"></i>
                          </span>
                          <span className="text">Guardar</span>
                        </button>
                      </div>
                      <div className="col-md-6">
                        <a type="button" href="" className="btn btn-danger btn-icon-split w-50" onClick={() => navigate(`/empleados`)}>
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
