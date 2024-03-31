import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useProveedores } from "../../context/proveedores/ProveedorProvider";
import validateForm from "../../components/proveedores/ProveedorValidator";
import axios from "axios";

export default function ProveedoresForm() {
  const { createProveedor, getProveedor, updateProveedor, Proveedores, searchNit } = useProveedores();

  useEffect(() => {
    Proveedores();
  }, []);



  const [placeholders, setPlaceholders] = useState({
    nit: "Número de identificación*",
    nombre: "Nombre*",
  });

  const [tipo, setOpcionSeleccionada] = useState('');
  const [mostrarContacto, setMostrarContacto] = useState(false);
  const [doc, setDoc] = useState(true)

  const handleSelectChange = (event) => {
    const seleccion = event.target.value;
    setOpcionSeleccionada(seleccion);

    if (seleccion === 'Juridico') {
      setMostrarContacto(true);
      setPlaceholders({
        nit: "Nit*",
        nombre: "Razón social*",
      });
    } else {
      setMostrarContacto(false);
      setPlaceholders({
        nit: "Número de identificación*",
        nombre: "Nombre*",
      });
    }
  };


  const hasWhitespace = (value) => {
    return /\s/.test(value);
  };

  const params = useParams();
  const navigate = useNavigate();

  const [proveedor, setProveedor] = useState({
    nombre: "",
    direccion: "",
    nit: "",
    tipo: "",
    estado: "",
    email: "",
    telefono: "",
    nombreContacto: "",
    telefonoContacto: "",
    emailContacto: "",
  });

  useEffect(() => {
    const loadProveedores = async () => {
      if (params.id) {
        const proveedor = await getProveedor(params.id);
        setProveedor({
          nombre: proveedor.nombre,
          direccion: proveedor.direccion,
          nit: proveedor.nit,
          tipo: proveedor.tipo,
          estado: proveedor.estado,
          email: proveedor.email,
          telefono: proveedor.telefono,
          nombreContacto: proveedor.nombreContacto,
          telefonoContacto: proveedor.telefonoContacto,
          emailContacto: proveedor.emailContacto,
        });
        checkDoc(proveedor.tipo, proveedor.nit)
        if (proveedor.tipo === "Juridico") {
          setMostrarContacto(proveedor.tipo === 'Juridico');
          setOpcionSeleccionada(proveedor.tipo);
        }
      }
    };

    loadProveedores();
  }, [getProveedor, params.id]);

  const alertConfirm = () => {
    var message = ""
    if (params.id) {
      message = "actualizado"
    } else {
      message = "agregado"
    }
    // eslint-disable-next-line no-undef
    $.confirm({
      title: `Proveedor ` + message + ` con exito!`,
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
        },
      }
    })
  }

  const checkDoc = async (tipo, documento) => {
    try {
      const response = await fetch(`https://apismovilconstru-production-be9a.up.railway.app/checkDocProv/${documento}/${tipo}/${params.id}`, {
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
            initialValues={proveedor}
            enableReinitialize={true}
            validate={validateForm}
            validateOnChange={true}
            onSubmit={async (values) => {

                checkDoc(values.tipo, values.nit)
                
              if (doc === false) {
                if (params.id) {
                  await updateProveedor(params.id, { ...values, tipo: tipo });
                  navigate("/proveedores");
                  alertConfirm('update');
                  
                } else {
                  await createProveedor({ ...values, tipo: tipo });
                  navigate("/proveedores");
                  alertConfirm();

                }
              }
            }



            }


          >

            {({ handleChange, handleSubmit, values, isSubmitting, touched, setFieldValue, errors }) => (
              <Form onSubmit={handleSubmit} className="user">
                <div className="card text-center w-100">
                  <h2>{params.id ? "Editar" : "Agregar"} proveedor</h2>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 mt-3">
                        <select
                          id="tipo"
                          className={`form-select form-control-user `}
                          onChange={(e) => {
                            handleSelectChange(e);
                            handleChange(e);
                          }}
                          value={values.tipo}
                        >
                          <option value="0">Seleccione el tipo de proveedor*</option>
                          <option value="Natural">Natural</option>
                          <option value="Juridico">Juridico</option>
                        </select>
                        {
                          errors.tipo && touched.tipo ? (
                            <div className="alert alert-danger" role="alert">{errors.tipo}</div>
                          ) : null
                        }

                      </div>
                      <div className="col-md-6 mt-3">
                        <input
                          type="text"
                          className={`form-control form-control-user`}
                          id="nit"
                          onChange={(e) =>{
                            handleChange(e)
                            checkDoc(values.tipo, e.target.value)
                            // params.id ? '' : checkDoc(values.tipo, e.target.value)
                          }}
                          value={values.nit}
                          placeholder={placeholders.nit}
                          onBlur={() => setFieldValue('nit', values.nit.trim())}
                        // validate={validateWhitespace}
                        />
                        {
                          errors.nit && touched.nit ? (
                            <div className="alert alert-danger" role="alert">{errors.nit}</div>
                          ) : null
                        }

                      </div>
                      <div className="col-md-6 mt-3">
                        <input
                          type="text"
                          className={`form-control form-control-user`}
                          id="nombre"
                          onChange={handleChange}
                          value={values.nombre}
                          placeholder={placeholders.nombre}
                          onBlur={() => setFieldValue('nombre', values.nombre.trim())}
                        // validate={validateWhitespace}
                        />
                        {
                          errors.nombre && touched.nombre ? (
                            <div className="alert alert-danger" role="alert">{errors.nombre}</div>
                          ) : null
                        }

                      </div>
                      <div className="col-md-6 mt-3">
                        <input
                          type="text"
                          className={`form-control form-control-user`}
                          id="email"
                          onChange={handleChange}
                          value={values.email}
                          placeholder="Correo electrónico*"
                          onBlur={() => setFieldValue('email', values.email.trim())}
                        // validate={validateWhitespace}
                        />
                        {
                          errors.email && touched.email ? (
                            <div className="alert alert-danger" role="alert">{errors.email}</div>
                          ) : null
                        }

                      </div>
                      <div className="col-md-6 mt-3">
                        <input
                          type="text"
                          className={`form-control form-control-user`}
                          id="direccion"
                          onChange={handleChange}
                          value={values.direccion}
                          placeholder="Dirección*"
                          onBlur={() => setFieldValue('direccion', values.direccion.trim())}
                        // validate={validateWhitespace}
                        />
                        {
                          errors.direccion && touched.direccion ? (
                            <div className="alert alert-danger" role="alert">{errors.direccion}</div>
                          ) : null
                        }
                      </div>
                      <div className="col-md-6 mt-3">
                        <input
                          type="text"
                          className={`form-control form-control-user`}
                          id="telefono"
                          onChange={handleChange}
                          value={values.telefono}
                          placeholder="Teléfono*"
                          onBlur={() => setFieldValue('telefono', values.telefono.trim())}
                        // validate={validateWhitespace}
                        />
                        {
                          errors.telefono && touched.telefono ? (
                            <div className="alert alert-danger" role="alert">{errors.telefono}</div>
                          ) : null
                        }

                      </div>
                    </div>
                  </div>
                  {mostrarContacto && (
                    <div className="card-body">
                      <h4>Datos de contacto del proveedor</h4>
                      <div className="row">
                        <div className="col-md-6 mt-3">
                          <input
                            type="text"
                            className={`form-control form-control-user`}
                            id="nombreContacto"
                            onChange={handleChange}
                            value={values.nombreContacto}
                            placeholder="Nombre del contacto*"
                            onBlur={() => setFieldValue('nombreContacto', values.nombreContacto.trim())}
                          />
                          {
                            errors.nombreContacto && touched.nombreContacto ? (
                              <div className="alert alert-danger" role="alert">
                                {errors.nombreContacto}
                              </div>
                            ) : null
                          }

                        </div>
                        <div className="col-md-6 mt-3">
                          <input
                            type="text"
                            className={`form-control form-control-user`}
                            id="telefonoContacto"
                            onChange={handleChange}
                            value={values.telefonoContacto}
                            placeholder="Teléfono del contacto*"
                            onBlur={() => setFieldValue('telefonoContacto', values.telefonoContacto.trim())}
                          />
                          {
                            errors.telefonoContacto && touched.telefonoContacto ? (
                              <div className="alert alert-danger" role="alert">
                                {errors.telefonoContacto}
                              </div>
                            ) : null
                          }

                        </div>
                        <div className="col-md-6 mt-3">
                          <input
                            type="text"
                            className={`form-control form-control-user`}
                            id="emailContacto"
                            onChange={handleChange}
                            value={values.emailContacto}
                            placeholder="Email del contacto*"
                          />
                          {
                            errors.emailContacto && touched.emailContacto ? (
                              <div className="alert alert-danger" role="alert">
                                {errors.emailContacto}
                              </div>
                            ) : null
                          }

                        </div>
                      </div>
                    </div>
                  )}
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
                        <Link type="button" href="" className="btn btn-danger btn-icon-split w-50" to="/proveedores">
                          <span className="text-white-50">
                            <i className="fa-solid fa-x"></i>
                          </span>
                          <span className="text">Cancelar</span>
                        </Link>
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
