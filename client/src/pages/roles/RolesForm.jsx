import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { useRol } from "../../context/roles/RolesProvider";

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
  const [permisos, setPermisos] = useState([]); // Asumiendo que tienes una lista de permisos
  const [roles, setRoles] = useState([]); // Nueva lista de roles
  const {createRol, updateRol} = useRol()
  const navigate = useNavigate()
  const params = useParams()
  useEffect(() => {
    // Cargar la lista de permisos
    fetchData("http://localhost:4000/permisos").then((data) => {
      setPermisos(data);
    });

    // Cargar la lista de roles
    fetchData("http://localhost:4000/roles").then((data) => {
      setRoles(data);
    });
  }, []);

  const initialValues = {
    nombre: "",
    estado: "",
    permisos: [],
  };
  const alertConfirm = (type) => {
    var message = ""
    if (type == "update") {
      message = "actualizado"
    } else {
      message = "agregado"
    }
    $.confirm({
      title: `Rol ` + message + ` con exito!`,
      content: "Redirecionando a listado de roles...",
      icon: 'fa fa-check',
      theme: 'modern',
      closeIcon: true,
      animation: 'zoom',
      closeAnimation: 'scale',
      animationSpeed: 500,
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
      <Formik
        initialValues={initialValues}
        onSubmit={async(values) => {
          console.log(values)
         if(params.id){
          await updateRol(params.id,values)
          alertConfirm("update")
          setTimeout(
            navigate("/roles"),
            5000
          )
         }else{
          await createRol(values)
          alertConfirm()
          setTimeout(
            navigate("/roles"),
            5000
          )
         }
        }}
      >
        {({ handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className="user">
            <div className="card text-center w-100">
              <h2>Agregar Rol</h2>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4 mt-3 mx-auto">
                    <label htmlFor="nombre">Nombre del Rol:</label>
                    <Field
                      className="form-control"
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={values.nombre}
                    />
                    <ErrorMessage
                      name="nombre"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="col-md-4 mt-3 mx-auto">
                    <label htmlFor="estado">Estado del Rol:</label>
                    <Field
                      className="form-control"
                      type="text"
                      id="estado"
                      name="estado"
                      value={values.estado}
                    />
                    <ErrorMessage
                      name="estado"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="col-md-4 mt-3 mx-auto">
                    <label htmlFor="permisos">Permisos:</label>
                    <Select 
                    
                      as="basic-multi-select"
                      options={permisos}
                      isMulti
                      className="form-select"
                      id="permisos"
                      name="permisos"
                      value={values.permisos}
                    >
                      {permisos.map((permiso) => (
                        <option key={permiso.idPer} value={permiso.idPer}>
                          {permiso.permiso}
                        </option>
                      ))}
                    </Select  >
                    <ErrorMessage
                      name="permisos"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
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
                      <span className="text">Agregar</span>
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

export default RolesForm
