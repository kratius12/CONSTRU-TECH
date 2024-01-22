import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useProveedores } from "../../context/proveedores/ProveedorProvider";
import proveedorSchema from './ProveedorValidator';

export default function ProveedoresForm() {
  const { createProveedor, getProveedor, updateProveedor, Proveedores, searchNit } = useProveedores();

  useEffect(() => {
    Proveedores();
  }, []);

  const [errors, setErrors] = useState({
    nombreContacto: '',
    telefonoContacto: '',
    emailContacto: '',
  });

  const [fieldErrors, setFieldErrors] = useState({
    nombreContacto: '',
    telefonoContacto: '',
    emailContacto: '',
  });

  const validateWhitespace = (value) => {
    return hasWhitespace(value) ? 'No se permiten espacios en blanco' : undefined;
  };

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

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateFields = (values) => {
    const newErrors = { ...errors };
    const newFieldErrors = { ...fieldErrors };

    if (values.tipo === 'Juridico') {
      if (!values.nombreContacto || values.nombreContacto.trim().length < 3) {
        newErrors.nombreContacto = 'El nombre de contacto debe tener al menos 3 caracteres';
        newFieldErrors.nombreContacto = newErrors.nombreContacto;
      } else {
        newErrors.nombreContacto = '';
        newFieldErrors.nombreContacto = '';
      }

      if (!values.telefonoContacto || values.telefonoContacto.trim().length < 7) {
        newErrors.telefonoContacto = 'El teléfono de contacto debe tener al menos 7 caracteres';
        newFieldErrors.telefonoContacto = newErrors.telefonoContacto;
      } else {
        newErrors.telefonoContacto = '';
        newFieldErrors.telefonoContacto = '';
      }

      if (!values.emailContacto || !isValidEmail(values.emailContacto)) {
        newErrors.emailContacto = 'Formato de correo electrónico inválido para el contacto';
        newFieldErrors.emailContacto = newErrors.emailContacto;
      } else {
        newErrors.emailContacto = '';
        newFieldErrors.emailContacto = '';
      }
    } else {
      newErrors.nombreContacto = '';
      newErrors.telefonoContacto = '';
      newErrors.emailContacto = '';
      newFieldErrors.nombreContacto = '';
      newFieldErrors.telefonoContacto = '';
      newFieldErrors.emailContacto = '';
    }

    setErrors(newErrors);
    setFieldErrors(newFieldErrors);

    return Object.values(newErrors).every((error) => !error);
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
      content: "Redirecionando a listado de materiales...",
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
            validateOnChange={true}
            validationSchema={proveedorSchema}
            onSubmit={async (values) => {
              try {
                if (params.id) {
                  await updateProveedor(params.id, { ...values, tipo: tipo });
                  navigate("/proveedores");
                  alertConfirm();
                } else {
                  const validateFact = await searchNit(values);

                  if (validateFact === true) {
                    alert(`Error: El ${placeholders.nit} ${values.nit} ya existe, por favor ingrese uno diferente`);
                  } else {
                    const isFieldsValid = validateFields(values);

                    if (isFieldsValid) {
                      await createProveedor({ ...values, tipo: tipo });
                      navigate("/proveedores");
                      alertConfirm();
                    }
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
            }}
          >

            {({ handleChange, handleSubmit, values, isSubmitting, touched, setFieldValue }) => (
              <Form onSubmit={handleSubmit} className="user">
                <div className="card text-center w-100">
                  <h2>{params.id ? "Editar" : "Agregar"} proveedor</h2>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 mt-3">
                        <select
                          id="tipo"
                          className={`form-select form-control-user ${errors.tipo ? 'is-invalid' : ''}`}
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
                        {errors.tipo && <div className="invalid-feedback">{errors.tipo}</div>}
                      </div>
                      <div className="col-md-6 mt-3">
                        <input
                          type="text"
                          className={`form-control form-control-user ${fieldErrors.nit && 'is-invalid'}`}
                          id="nit"
                          onChange={handleChange}
                          value={values.nit}
                          placeholder={placeholders.nit}
                          onBlur={() => setFieldValue('nit', values.nit.trim())}
                          validate={validateWhitespace}
                        />
                        {fieldErrors.nit && <div className="invalid-feedback">{fieldErrors.nit}</div>}
                      </div>
                      <div className="col-md-6 mt-3">
                        <input
                          type="text"
                          className={`form-control form-control-user ${fieldErrors.nombre && 'is-invalid'}`}
                          id="nombre"
                          onChange={handleChange}
                          value={values.nombre}
                          placeholder={placeholders.nombre}
                          onBlur={() => setFieldValue('nombre', values.nombre.trim())}
                          validate={validateWhitespace}
                        />
                        {fieldErrors.nombre && <div className="invalid-feedback">{fieldErrors.nombre}</div>}
                      </div>
                      <div className="col-md-6 mt-3">
                        <input
                          type="text"
                          className={`form-control form-control-user ${fieldErrors.email && 'is-invalid'}`}
                          id="email"
                          onChange={handleChange}
                          value={values.email}
                          placeholder="Correo electrónico*"
                          onBlur={() => setFieldValue('email', values.email.trim())}
                          validate={validateWhitespace}
                        />
                        {fieldErrors.email && <div className="invalid-feedback">{fieldErrors.email}</div>}
                      </div>
                      <div className="col-md-6 mt-3">
                        <input
                          type="text"
                          className={`form-control form-control-user ${fieldErrors.direccion && 'is-invalid'}`}
                          id="direccion"
                          onChange={handleChange}
                          value={values.direccion}
                          placeholder="Dirección*"
                          onBlur={() => setFieldValue('direccion', values.direccion.trim())}
                          validate={validateWhitespace}
                        />
                        {fieldErrors.direccion && <div className="invalid-feedback">{fieldErrors.direccion}</div>}
                      </div>
                      <div className="col-md-6 mt-3">
                        <input
                          type="text"
                          className={`form-control form-control-user ${fieldErrors.telefono && 'is-invalid'}`}
                          id="telefono"
                          onChange={handleChange}
                          value={values.telefono}
                          placeholder="Teléfono*"
                          onBlur={() => setFieldValue('telefono', values.telefono.trim())}
                          validate={validateWhitespace}
                        />
                        {fieldErrors.telefono && <div className="invalid-feedback">{fieldErrors.telefono}</div>}
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
                        ) : (
                          <select
                            id="estado"
                            className="form-select form-control-user"
                            onChange={handleChange}
                            value={values.estado}
                            disabled
                          >
                            <option value="1">Activo</option>
                          </select>
                        )}
                        {/* {errors.estado && touched.estado ? (
                            <div className="alert alert-danger" role="alert">{errors.estado}</div>
                        ) : null} */}
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
                          {fieldErrors.nombreContacto && <div className="alert alert-danger">{fieldErrors.nombreContacto}</div>}
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
                          {fieldErrors.telefonoContacto && touched.telefonoContacto ? (<div className="alert alert-danger" role="alert">{fieldErrors.telefonoContacto}</div>):null}
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
                          {fieldErrors.emailContacto && <div className="alert alert-danger">{fieldErrors.emailContacto}</div>}
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
                          <span className="text">{params.id ? "Editar" : "Agregar"}</span>
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
