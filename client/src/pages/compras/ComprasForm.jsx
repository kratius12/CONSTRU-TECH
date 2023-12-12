import  { useState, useEffect } from "react";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useCompras } from "../../context/compras/ComprasProvider";
import axios from "axios";
import comprasSchema from "./ComprasSchema";

const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const ComprasForm = () => {
  const { createCompra } = useCompras();
  const [categorias, setCategorias] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const selectedHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const sendHandler = async () => {
    if (!file) {
      alert("you must upload file");
      return;
    }

    const formdata = new FormData();
    formdata.append("image", file);

    const response = await fetch("http://localhost:4000/compra", {
      method: "POST",
      body: formdata,
    });
    const result = await response.text();

    console.log(result);

    try {
      const parsedResult = JSON.parse(result);
      console.log(parsedResult);
    } catch (error) {
      console.error(error);
    }

    // Verificar si el elemento 'fileinput' existe antes de acceder a sus propiedades
    const fileInput = document.getElementById("fileinput");
    if (fileInput) {
      fileInput.value = null;
    }

    setFile(null);
  };

  const [totalGeneral, setTotalGeneral] = useState(0);

  const calcularTotalGeneral = (detalles) => {
    let total = 0;
    detalles.forEach((detalle) => {
      const subtotal = detalle.cantidad * detalle.precio;
      total += subtotal;
    });
    setTotalGeneral(total);
  };

  const initialValues = {
    fecha: "",
    imagen: "",
    idProv: "",
    codigoFactura: "",
    total_compra: 0,
    detalles: [
      {
        idCat: "",
        idMat: "",
        cantidad: "",
        precio: "",
        subtotal: "",
      },
    ],
  };

  useEffect(() => {
    fetchData("http://localhost:4000/categorias").then((data) => {
      setCategorias(data);
    });
    fetchData("http://localhost:4000/materiales").then((data) => {
      setMateriales(data);
    });
    fetchData("http://localhost:4000/provs").then((data) => {
      setProveedores(data);
    });
  }, []);

  useEffect(() => {
    const calcularTotalGeneral = (detalles) => {
      let total = 0;
      detalles.forEach((detalle) => {
        const subtotal = detalle.cantidad * detalle.precio;
        total += subtotal;
      });
      setTotalGeneral(total);
    };

    calcularTotalGeneral(initialValues.detalles);
  }, [initialValues.detalles]);

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={comprasSchema}
        enableReinitialize={true}
        onSubmit={async (values) => {
          console.log(values);
          await createCompra(values);
          navigate("/compras");
        }}
      >
        {({ handleSubmit, values, isSubmitting, errors, touched }) => (
          <Form
            onSubmit={handleSubmit}
            className="user"
            encType="multipart/form-data"
          >
            <div className="card text-center w-100">
              <h2>Agregar compra</h2>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3 mt-3 mx-auto">
                    <label htmlFor="fecha">Fecha:</label>
                    <Field className="form-control " type="date" id="fecha" name="fecha" />
                    {errors.fecha && touched.fecha ? (
                      <div className="alert alert-danger" role="alert">{errors.fecha}</div>
                    ) : null}
                  </div>
                  <div className="col-md-3 mt-3 mx-auto">
                    <label htmlFor="imagen">Factura:</label>
                    <input id="fileinput" onChange={selectedHandler} className="form-control" type="file" />
                    {errors.imagen && touched.imagen ? (
                      <div className="alert alert-danger" role="alert">{errors.imagen}</div>
                    ) : null}
                  </div>
                  <div className="col-md-3 mt-3 mx-auto">
                    <label htmlFor={`idProv`}>
                      Proveedor:
                    </label>
                    <Field
                      as="select"
                      id={`idProv`}
                      name={`idProv`}
                      value={values.idProv}
                      className="form-select"
                    >
                      <option value="">Seleccione un proveedor</option>
                      {proveedores.map((proveedor) => (
                        <option key={proveedor.idProv} value={proveedor.idProv}>
                          {proveedor.nombre}
                        </option>
                      ))}
                    </Field>
                    {errors.idProv && touched.idProv ? (
                      <div className="alert alert-danger" role="alert">{errors.idProv}</div>
                    ) : null}
                  </div>
                  <div className="col-md-3 mt-3 mx-auto">
                    <label htmlFor="codigoFactura">Código de Factura:</label>
                    <Field className="form-control" type="text" id="codigoFactura" name="codigoFactura" />
                    {errors.codigoFactura && touched.codigoFactura ? (
                      <div className="alert alert-danger" role="alert">{errors.codigoFactura}</div>
                    ) : null}
                  </div>

                </div>
                <hr className="mt-md-3 mx-auto" />
                <div>
                  <FieldArray
                    name="detalles"
                    render={(arrayHelpers) => (
                      <div>
                        {values.detalles.map((detalle, index) => (
                          <div key={index} className="row">

                            <div className="col-md-3 mt-3 mx-auto">
                              <label htmlFor={`detalles.${index}.idCat`}>Categoría:</label>
                              <Field
                                as="select"
                                className="form-select"
                                id={`detalles.${index}.idCat`}
                                name={`detalles.${index}.idCat`}
                                value={values.detalles.idCat}
                                key={`detalles.${index}.idCat`}
                              >
                                <option value="">Seleccione una categoría</option>
                                {categorias.map((categoria) => (
                                  <option key={categoria.idcat} value={categoria.idcat}>
                                    {categoria.nombre}
                                  </option>
                                ))}
                              </Field>
                              <ErrorMessage
                                name={`detalles.${index}.idCat`}
                                component="div"
                                className="alert alert-danger"
                              />
                            </div>
                            <div className="col-md-3 mt-3 mx-auto">
                              <label htmlFor={`detalles.${index}.idMat`}>Material:</label>
                              <Field
                                as="select"
                                className="form-select"
                                id={`detalles.${index}.idMat`}
                                name={`detalles.${index}.idMat`}
                                value={detalle.idMat}
                                key={`detalles.${index}.idMat`}
                              >
                                <option value="">Seleccione un material</option>
                                {materiales.map((material) => (
                                  <option key={material.idMat} value={material.idMat}>
                                    {material.nombre}
                                  </option>
                                ))}
                              </Field>
                              <ErrorMessage
                                name={`detalles.${index}.idMat`}
                                component="div"
                                className="alert alert-danger"
                              />
                            </div>
                            <div className="col-md-2 mt-3 mx-auto">
                              <label htmlFor={`detalles.${index}.cantidad`}>Cantidad:</label>
                              <Field
                                type="text"
                                className="form-control"
                                id={`detalles.${index}.cantidad`}
                                name={`detalles.${index}.cantidad`}
                                key={`detalles.${index}.cantidad`}
                              />
                              <ErrorMessage
                                name={`detalles.${index}.cantidad`}
                                component="div"
                                className="alert alert-danger"
                              />
                            </div>
                            <div className="col-md-2 mt-3 mx-auto">
                              <label htmlFor={`detalles.${index}.precio`}>Precio:</label>
                              <Field
                                type="text"
                                className="form-control"
                                id={`detalles.${index}.precio`}
                                name={`detalles.${index}.precio`}
                                key={`detalles.${index}.precio`}
                              />
                              <ErrorMessage
                                name={`detalles.${index}.precio`}
                                component="div"
                                className="alert alert-danger"
                              />
                            </div>
                            <div className="col-md-2 mt-3 mx-auto">

                              <label htmlFor={`detalles.${index}.subtotal`}>Subtotal:</label>
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">$</span>
                                </div>
                                <Field
                                  type="text"
                                  className="form-control"
                                  id={`detalles.${index}.subtotal`}
                                  name={`detalles.${index}.subtotal`}
                                  key={`detalles.${index}.subtotal`}
                                  disabled
                                  value={(detalle.cantidad * detalle.precio).toLocaleString()}
                                />
                              </div>
                            </div>
                            <div className="col-md-12 mt-3 mx-auto">
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                Eliminar detalle
                              </button>
                              <p {...calcularTotalGeneral(values.detalles)}></p>
                            </div>
                            <hr className="mt-2" />
                            <p {...values.total_compra = totalGeneral} ></p>
                          </div>
                        ))}
                        {/* {errors.detalles && (
                          <div className="alert alert-danger" role="alert">
                            {errors.detalles}
                          </div>
                        )} */}
                        <button
                          type="button"
                          className="btn btn-success mt-3"
                          onClick={() => {
                            arrayHelpers.push({
                              idCat: "",
                              idMat: "",
                              cantidad: "",
                              precio: "",
                              subtotal: ""
                            });
                          }}
                        >
                          Agregar material
                        </button>
                        <div className="col-md-2 mt-3 mx-auto">
                          <label htmlFor={`total_compra`}>Total:</label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">$</span>
                            </div>
                            <Field
                              type="text"
                              className="form-control"
                              disabled
                              value={(values.total_compra).toLocaleString()}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  />

                </div>
              </div>
              <div className="card-footer text-center">
                <div className="row">
                  <div className="col-md-6">
                    <button type="submit" onClick={sendHandler} disabled={isSubmitting} className="btn btn-primary btn-icon-split w-50">
                      <span className="text-white-50">
                        <i className="fas fa-plus"></i>
                      </span>
                      <span className="text">Agregar</span>
                    </button>
                  </div>
                  <div className="col-md-6">
                    <a type="button" href="" className="btn btn-danger btn-icon-split w-50" onClick={() => navigate(`/compras`)}>
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

export default ComprasForm;
