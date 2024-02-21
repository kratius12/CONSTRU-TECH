import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
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

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Formik
            initialValues={proveedor}
            enableReinitialize={true}
            validate={validateForm}
            validateOnChange={true}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                if (params.id) {
                  const validateFact = await axios.put(`http://localhost:4000/documentoProvE/${params.id}`, { nit: values.nit, tipo: values.tipo })
                  console.log(validateFact.data)
                  if (validateFact.data == true) {
                    var type;
                    if (values.tipo == "Juridico") {
                      type = "NIT"
                    } else {
                      type = "Número de documento"
                    }
                    $.confirm({
                      title: `Error`,
                      content: `El ${type} ${values.nit} ya está asociado a otro proveedor`,
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
                    }, setSubmitting(false))
                  } else {
                    setSubmitting(true)
                    await updateProveedor(params.id, { ...values, tipo: tipo });
                    navigate("/proveedores");
                    alertConfirm();
                  }
                } else {

                  const validateFact = await axios.put(`http://localhost:4000/documentoProvA`, { nit: values.nit, tipo: tipo })
                  if (validateFact.data == true) {
                    var type;
                    if (values.tipo == "Juridico") {
                      type = "NIT"
                    } else {
                      type = "Número de documento"
                    }
                    $.confirm({
                      title: `Error`,
                      content: `El ${type} ${values.nit} ya está asociado a otro proveedor`,
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
                    }, setSubmitting(false))
                  } else {
                    setSubmitting(true)
                    await createProveedor({ ...values, tipo: tipo });
                    navigate("/proveedores");
                    alertConfirm();
                  }

                }

                setProveedor({
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
              } catch (error) {
                console.error(error);
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
                          onChange={handleChange}
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
                      <div className="col-md-6 mt-3">
                        {params.id ? (
                          <select
                            id="estado"
                            className="form-select form-control-user"
                            onChange={handleChange}
                            value={values.estado}
                          >
                            <option value="">Seleccione estado</option>
                            <option value="1">Activo</option>
                            <option value="0">Inactivo</option>
                          </select>
                        ) :
                          null}

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
                        <a type="button" href="" className="btn btn-danger btn-icon-split w-50" onClick={() => navigate(`/proveedores`)}>
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
