import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Form, Formik, Field } from "formik";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useRol } from "../../context/roles/RolesProvider";
import RolSchema from "../../components/roles/RolesValidator";

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

const RolesForm = () => {
  const hasWhitespace = (value) => /\s/.test(value);
  const validateWhitespace = (value) => {
    return hasWhitespace(value) ? 'No se permiten espacios en blanco' : undefined;
  };

  const [permisos, setPermisos] = useState([]);
  const [roles, setRoles] = useState({});
  const { createRol, updateRol, getRol } = useRol();
  const navigate = useNavigate();
  const params = useParams();
  const [key, setKey] = useState(0);
  const [defaultOptions, setDefaultOptions] = useState([]);
  const [permisoSelected, setPermisoSelected] = useState(defaultOptions);

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
            label: item.permiso.permiso,
            idPer: item.permiso.idPer
          }));
          setDefaultOptions(defaul);
          setPermisoSelected(defaul);
          setKey((prevKey) => prevKey + 1);
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
    window.$.confirm({
      title: `Rol ${type} con éxito!`,
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

  const errorcitos = () => {
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
  }

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={RolSchema}
        onSubmit={async (values, {setSubmitting}) => {
          const rolObject = {
            ...values,
            permisos: permisoSelected
          };
          console.log(values.nombre)
          if(params.id){
            const validateRol = await axios.put(`http://localhost:4000/rolSE/${params.id}`,{nombre:rolObject.nombre})
            console.log(validateRol.data)
            if(validateRol.data == true){
              $.confirm({
                title: `Error`,
                content: `El rol ${values.nombre} ya exite, por favor ingrese otro`,
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
              },
              setSubmitting(false))
            }else{
              setSubmitting(true)
              await updateRol(params.id, rolObject);
              alertConfirm("actualizado");
              setTimeout(() => navigate("/roles"));
            }
          }else{
            const validateRol = await axios.put(`http://localhost:4000/rolSA`,{nombre:rolObject.nombre},{timeout:500})
            if (validateRol.d == true) {
              console.log(validateRol)
              $.confirm({
                title: `Error`,
                content: `El rol ${rolObject.nombre} ya exite, por favor ingrese otro`,
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
             
            }else{
              await createRol(rolObject);
              alertConfirm("agregado");
              setTimeout(() => navigate("/roles"));
              setSubmitting(true)
            }
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
                    ) : null}
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
                      <span className="text">Guardar</span>
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
