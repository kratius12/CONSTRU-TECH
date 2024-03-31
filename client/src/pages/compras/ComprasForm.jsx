import { useState, useEffect } from "react";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { useCompras } from "../../context/compras/ComprasProvider";
import axios from "axios";
import comprasSchema from "../../components/compras/ComprasSchema";

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
  const { createCompra, searchFact } = useCompras();
  const [materiales, setMateriales] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const navigate = useNavigate();


  const alertConfirm = (type) => {
    var message = ""
    if (type == "update") {
      message = "Actualizado"
    } else {
      message = "Agregado"
    }
    $.confirm({
      title: `Compra  agregada con exito!`,
      content: "",
      icon: 'fa fa-check',
      theme: 'modern',
      closeIcon: true,
      animation: 'zoom',
      closeAnimation: 'scale',
      animationSpeed: 1500,
      type: 'green',
      columnClass: 'col-md-6 col-md-offset-3',
      autoClose: 'okay|4000',
      buttons: {
        okay: function () {
        },
      }
    })
  }


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
        idMat: "",
        cantidad: "",
        precio: "",
        subtotal: "",
      },
    ],
  };

  useEffect(() => {
    fetchData("https://apismovilconstru-production-be9a.up.railway.app/materiales").then((data) => {
      setMateriales(data);
    });
    fetchData("https://apismovilconstru-production-be9a.up.railway.app/provsAc").then((data) => {
      setProveedores(data);
    });
  }, []);
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  // Function to update selected materials array
  const updateSelectedMaterials = (index, materialId) => {
    const newSelectedMaterials = [...selectedMaterials];
    newSelectedMaterials[index] = materialId;
    setSelectedMaterials(newSelectedMaterials);
  };

  useEffect(() => {
    calcularTotalGeneral(initialValues.detalles);
  }, []);
  // console.clear()
  return (
    <div className="container">
      <Formik

        initialValues={initialValues}
        validationSchema={comprasSchema}
        enableReinitialize={true}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values)
          const validateFact = await searchFact(values)
          if (validateFact === true) {
            $.confirm({
              title: `Error`,
              content: `El codigo de factura: ` + values.codigoFactura + ` ya existe, por favor ingrese uno diferente`,
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
          } else {
            const formData = new FormData();
            formData.append("fecha", values.fecha);
            formData.append("imagen", values.imagen);
            formData.append("idProv", values.idProv);
            formData.append("codigoFactura", values.codigoFactura);
            formData.append("total_compra", totalGeneral)
            values.detalles.forEach((detalle, index) => {
              formData.append(`detalles[${index}][idMat]`, detalle.idMat);
              formData.append(`detalles[${index}][cantidad]`, detalle.cantidad);
              formData.append(`detalles[${index}][precio]`, detalle.precio);
              formData.append(`detalles[${index}][subtotal]`, detalle.subtotal);
            });


            try {
              console.log(formData)
              await createCompra(formData);
              alertConfirm();
              navigate("/compras");
            } catch (error) {
              console.error("Error al crear la compra:", error);
            } finally {
              setSubmitting(false);
            }

          }
        }}
      >
        {({ handleSubmit, values, isSubmitting, setFieldValue, errors, touched }) => (
          <Form onSubmit={handleSubmit} className="user" encType="multipart/form-data">
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
                    <input
                      id="imagen"
                      name="imagen"
                      type="file"
                      className="form-control"
                      onChange={(event) => {
                        setFieldValue('imagen', event.currentTarget.files[0]);
                      }}
                    />
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
                              <label htmlFor={`detalles.${index}.idMat`}>Material:</label>
                              <Field
                                as="select"
                                className="form-select"
                                id={`detalles.${index}.idMat`}
                                name={`detalles.${index}.idMat`}
                                value={detalle.idMat}
                                key={`detalles.${index}.idMat`}
                                onChange={(e) => {
                                  arrayHelpers.replace(index, {
                                    idMat: e.target.value,
                                    cantidad: "",
                                    precio: "",
                                    subtotal: "",
                                  });
                                  updateSelectedMaterials(index, e.target.value);
                                }}
                              >
                                <option value="">Seleccione un material</option>
                                {materiales
                                  .filter(
                                    (material) =>
                                      !selectedMaterials.includes(material.idMat)
                                  )
                                  .map((material) => (
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
                            <div className="col-md-3 mt-3 mx-auto">
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
                            <div className="col-md-3 mt-3 mx-auto">
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
                            <div className="col-md-3 mt-3 mx-auto">
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
                                <i class="fa-solid fa-x"></i>
                              </button>
                              <hr className="mt-md-3 mx-auto" />
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="btn btn-success mt-3"
                          onClick={() => {
                            arrayHelpers.push({
                              idMat: "",
                              cantidad: "",
                              precio: "",
                              subtotal: "",
                            });
                          }}
                        >
                          Agregar material
                        </button>
                        {calcularTotalGeneral(values.detalles)}
                        <div className="col-md-3 mt-3 mx-auto">
                          <label htmlFor={`total_compra`}>Total:</label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">$</span>
                            </div>
                            <Field
                              type="text"
                              className="form-control"
                              disabled
                              value={totalGeneral.toLocaleString()}
                              name="total_compra"
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
                  <Link type="button" href="" className="btn btn-danger btn-icon-split w-50" to="/compras">
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

export default ComprasForm;
