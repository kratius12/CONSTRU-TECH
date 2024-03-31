import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Form, Formik, Field } from "formik";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
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
  const [rol, setRol] = useState(true)

  useEffect(() => {
    const loadPermisos = async () => {
      const permisosData = await fetchPermisos("https://apismovilconstru-production-be9a.up.railway.app/permisosAct");
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
          checkRol(rol.nombre)
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
      content: "",
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

  const checkRol = async (rol) => {
    try {
      const response = await fetch(`https://apismovilconstru-production-be9a.up.railway.app/checkRol/${rol}/${params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (response.status === 203) {
        $.confirm({
          title: `El rol ingresado ya existe, por favor intente con uno diferente`,
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
        setRol(true)
      } else {
        setRol(false)
      }

    } catch (error) {
      console.log(error)
    }
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
          checkRol(values.nombre)
          if (rol === false) {
            if(params.id){
              setSubmitting(true)
              
              await updateRol(params.id, rolObject);
              alertConfirm("actualizado");
              setTimeout(() => navigate("/roles"));


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
                    <label htmlFor="">Nombre del rol</label>
                    <Field
                      type="text"
                      id="nombre"
                      name="nombre"
                      className="form-control form-control-user"
                      placeholder="Nombre del rol*"

                      onChange={(e) => {
                        handleChange(e)
                        checkRol(e.target.value)
                      }}

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
                  <div className="col-md-6 mt-3 mx-auto">
                    <label htmlFor="permisos">Permisos:</label>
                    <Select
                      id="permisos"
                      key={key}
                      options={permisos}
                      isMulti
                      defaultValue={defaultOptions}
                      className=""
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
                    <Link type="button" href="" className="btn btn-danger btn-icon-split w-50" to="/roles">
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
  );
};

export default RolesForm;
