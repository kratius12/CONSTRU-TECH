import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Form, Formik, Field } from "formik";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useRol } from "../../context/roles/RolesProvider";
import * as yup from "yup"
const RolSchema = yup.object().shape({
  nombre: yup
    .string()
    .trim() // Elimina espacios en blanco al principio y al final
    .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, 'El nombre no puede contener caracteres especiales ni números')
    .required('El nombre del rol es obligatorio'),
  permisos: yup.array().min(1, 'Debe seleccionar al menos un permiso'),
});

const fetchPermisos = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data.map((permiso) => ({
      value: permiso.idPer,
      label: permiso.permiso,
    }));
  } catch (error) {
    console.error("Error fetching permisos:", error);
    return [];
  }
};

const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const RolesForm = () => {
  const hasWhitespace = (value) => /\s/.test(value);
  const validateWhitespace = (value) => {
    return hasWhitespace(value) ? 'No se permiten espacios en blanco' : undefined;
  };

  const [permisos, setPermisos] = useState([]);
  const [roles, setRoles] = useState({});;
  const { createRol, updateRol, getRol } = useRol();
  const navigate = useNavigate();
  const params = useParams();
  const [key, setKey] = useState(0)
  const [defaultOptions, setDefaultOptions] = useState([]);
  const [permisoSelected, setPermisoSelected] = useState(defaultOptions)
  useEffect(() => {
    const loadPermisos = async () => {
      const permisosData = await fetchPermisos("http://localhost:4000/permisosAct");
      setPermisos(permisosData);
    };

    const loadRoles = async () => {
      if (params.id) {
        try {
          const rol = await getRol(params.id);
          setRoles({
            nombre: rol.nombre,
            estado: rol.estado,
            permisos: rol.rolpermisoempleado.map((permiso) => permiso.idPer),
          });
          const defaul = rol.rolpermisoempleado.map((item) => ({
            value: item.permiso.idPer,
            label: item.permiso.permiso
          }))
          setDefaultOptions(defaul)
          setPermisoSelected(defaul)
          setKey(prevKey => prevKey + 1)
        } catch (error) {
          console.error("Error fetching role data:", error);
        }
      }
    };

    loadPermisos();
    loadRoles();
  }, [params.id, getRol]);

  const initialValues = {
    nombre: roles.nombre || "",
    estado: roles.estado || "",
    permisos: roles.permisos || [],
  };

  const alertConfirm = (type) => {
    $.confirm({
      title: `Rol ` + type + ` con éxito!`,
      content: "Redireccionando a listado de roles...",
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

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={RolSchema}
        onSubmit={async (values) => {
          const rolObject = {
            ...values,
            permisos: permisoSelected
          }
          console.log(rolObject)
          if (params.id) {
            await updateRol(params.id, rolObject);
            alertConfirm("actualizado");
            setTimeout(() => navigate("/roles"));
          } else {
            await createRol(rolObject);
            alertConfirm("agregado");
            setTimeout(() => navigate("/roles"));
          }
        }}
      >
        {({ handleSubmit, handleChange, values, isSubmitting, setFieldValue, errors, touched }) => (
          <Form onSubmit={handleSubmit} className="user">
            <div className="card text-center w-100">
              <h2>{params.id ? "Editar" : "Agregar"} rol</h2>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mt-3 mx-auto">
                    <Field
                      type="text"
                      id="nombre"
                      name="nombre"
                      className="form-control form-control-user"
                      placeholder="Nombre del permiso*"
                      onChange={handleChange}
                      value={values.nombre}
                      onBlur={() => setFieldValue('nombre', values.nombre.trim())}
                      validate={validateWhitespace}
                    />
                    {errors.nombre && touched.nombre ? (
                      <div className="alert alert-danger" role="alert">
                        {errors.nombre}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-md-6 mt-3">
                    {params.id ? (
                      <select id="estado" className="form-select form-control-user" onChange={handleChange} value={values.estado} >
                        <option value="">Seleccione estado</option>
                        <option value="1">Activo</option>
                        <option value="0">Inactivo</option>
                      </select>
                    ) : (
                      <select id="estado" className="form-select form-control-user" onChange={handleChange} value={values.estado} disabled>
                        <option value="1">Activo</option>
                      </select>
                    )}
                    {errors.estado && touched.estado ? (
                      <div className="alert alert-danger" role="alert">
                        {errors.estado}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-md-4 mt-3 mx-auto">
                    <label htmlFor="permisos">Permisos:</label>
                    <Select
                      id="permisos"
                      key={key}
                      options={permisos}
                      isMulti
                      defaultValue={defaultOptions}
                      className="basic-multi-select"
                      name="permisos"
                      onChange={(selectedPer) => {
                        setPermisoSelected(selectedPer)
                        setFieldValue("permisos", selectedPer)
                      }}
                    />
                    {errors.permisos && touched.permisos ? (
                      <div className="alert alert-danger" role="alert">
                        {errors.permisos}
                      </div>
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
                      <span className="text">{params.id ? "Editar" : "Agregar"}</span>
                    </button>
                  </div>
                  <div className="col-md-6">
                    <a
                      type="button"
                      className="btn btn-danger btn-icon-split w-50"
                      onClick={() => navigate(`/roles`)}
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
};

export default RolesForm;