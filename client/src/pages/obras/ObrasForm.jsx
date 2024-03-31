import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import {  useNavigate, useParams, Link } from "react-router-dom";
import { useObras } from "../../context/obras/ObrasProvider";
import { obraSchemaAgg } from "../../components/obras/ValidateObra"
const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
const ObrasForm = () => {
  const params = useParams();
  const { createObra} = useObras();
  const navigate = useNavigate();

  const [clientes, setCliente] = useState([]);
  const [asesores, setAsesores] = useState([]);
  const [obra, setObra] = useState({
    idCliente: '',
    idEmp: '',
    area: '',
    fechaini: '',
    fechafin: '16/04/2024',
    precio: '',
    descripcion: '',
    estado:"",
  });

  const alertConfirm = () => {
    $.confirm({
      title: `Obra agregada con éxito!`,
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
    fetchData("https://apismovilconstru-production-be9a.up.railway.app/clientes").then((data) => {
      setCliente(data);
    });
    fetchData("https://apismovilconstru-production-be9a.up.railway.app/empleadosAct").then((data) => {
      setAsesores(data)
    });  
  }, []);

  const initialValues = {
    idCliente: obra.idCliente,
    idEmp: obra.idEmp,
    area: obra.area,
    fechaini: obra.fechaini,
    fechafin: obra.fechafin,
    precio: obra.precio,
    descripcion: obra.descripcion,
    estado: obra.estado,
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={obraSchemaAgg}
        onSubmit={(values) => {
          console.log(values)
            createObra(values)
            alertConfirm()
            navigate("/obras")
          
        }}
      >
        {({ values, isSubmitting, handleSubmit, errors, touched, handleChange }) => (
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
                      errors.idEmp && touched.idEmp ? (
                        <div className="alert alert-danger">{errors.idEmp}</div>
                      ) : null
                    }
                  </div>
                  <div className='col-md-3 mt-3 mx-auto'>
                    <label htmlFor="fechaini">Seleccione la fecha de inicio de la obra</label>
                    <input type="date" name="fechaini" label="Fecha Inicio" className="form-control form-control-user" value={values.fechaini} onChange={handleChange} />
                    {
                      errors.fechaini && touched.fechaini ? (
                        <div className="alert alert-danger">{errors.fechaini}</div>
                      ) : null
                    }
                  </div>
                  <div className='col-md-3 mt-3 mx-auto'>
                  <label htmlFor="estado">Seleccione el estado de la obra</label>
                    
                      <select name="estado" disabled id="estado" className="form-select form-control-user" onChange={handleChange}>
                        <option value="">Seleccione una opción</option>
                        <option value="En asesoria">En asesoria</option>
                        <option selected  value="Pendiente">Pendiente</option>
                        <option value="En construcción">En construcción</option>
                        <option value="Terminado">Terminado</option>
                      </select>
                    
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
                      <span className="text">Guardar</span>
                    </button>
                  </div>
                  <div className="col-md-6">
                    <Link type="button" href="" className="btn btn-danger btn-icon-split w-50" to="/obras">
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
}

export default ObrasForm;