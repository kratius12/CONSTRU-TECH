import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useCompras } from "../../context/compras/ComprasProvider";
import comprasSchema from './ComprasSchema'
import axios from "axios";
export default function ComprasForm() {
  //   const [agreed, setAgreed] = useState(false)
  const { createCompra, getCompra, Compras, createDetalle, getDetalle } = useCompras()
  useEffect(() => {
    Compras()
  }, [])

  const params = useParams()
  const navigate = useNavigate()
  const [compra, setCompra] = useState({
    fecha: '',
    imagen: '',
    total_compra: '',
    detalle: []
  })
  const [detalle, setDetalle] = useState([

    {
      
      idMat: '',
      idCat: "",
      cantidad: 0,
      precio: 0,
      subtotal: ''
    }]
  )
  const formatNumber = (number) => {
    return number.toLocaleString('es-ES');
  };

  const addMaterial = () => {
    setDetalle([{
      ...detalle,
      idMat: "",
      idCat: "",
      precio: "",
      cantidad: "",
      subtotal: "",
    }]
    )
  };
  const removeMaterial = (index) => {
    const updateMaterial = [...detalle];
    updateMaterial.splice(index, 1);
    setDetalle(updateMaterial);
  };
  const [material, setMaterial] = useState([])
  const [categoria, setCategoria] = useState([])

  const handleInputChange = (index, key, value) => {
    const updateMaterial = [...detalle];
    updateMaterial[index][key] = value;
    setDetalle(updateMaterial);
  };

  const calculateSubtotal = () => {
    return detalle.reduce((total, detalle) => {
      return total + detalle.precio * detalle.cantidad;
    }, 0);
  };

  useEffect(() => {
    const loadCompras = async () => {
      if (params.id) {
        const compra = await getCompra(params.id)
        const detalle = await getDetalle(compra.idCom)
        setCompra({
          fecha: compra.fecha,
          imagen: compra.imagen,
          total_compra: compra.total_compra,
          detalle: [
            setDetalle({
              ...detalle,
              idMat: detalle.idMat,
              idCat: detalle.idCat,
              precio: detalle.precio,
              cantidad: detalle.cantidad,
              subtotal: detalle.subtotal,
            }
            )
          ]
        })
      }
      axios.get(`http://localhost:4000/materiales`)
        .then((response) => {
          setMaterial(response.data)
        })
        .catch((error) => {
          console.error(error)
        })
      axios.get(`http://localhost:4000/categorias`)
        .then((response) => {
          setCategoria(response.data)
        })
        .catch((error) => {
          console.error(error)
        })
    }
    loadCompras()
  }, [getCompra, getDetalle, params.id])


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Formik initialValues={compra}
            enableReinitialize={true}
            // validationSchema={comprasSchema}
            onSubmit={async (values) => {
              console.log(values);
              await createCompra(values)
              navigate("/compras")
              setCompra({
                fecha: '',
                imagen: '',
                total_compra: '',
                detalle: []
              })

            }}
          >
            {({ handleChange, handleSubmit, values, isSubmitting, errors, touched }) => (

              <Form onSubmit={handleSubmit} className="user">
                <div className="card text-center w-100">

                  <h2>Agregar compra</h2>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6 mt-3">
                        <input type="date" className="form-control hasDatepicker form-control-user" id="fecha" onChange={handleChange} value={values.fecha} />
                        {errors.fecha && touched.fecha ? (
                          <div className="alert alert-danger" role="alert">{errors.fecha}</div>
                        ) : null}
                      </div>
                      <div className="col-6 mt-3">

                        <input type="file" className="form-control form-control-user" id="imagen" onChange={handleChange} value={values.imagen} placeholder="Seleccione la imagen de la factura de esta compra" />
                        {errors.imagen && touched.imagen ? (
                          <div className="alert alert-danger" role="alert">{errors.imagen}</div>
                        ) : null}
                      </div>
                      <hr className="mt-4" />

                      {detalle.map((detalle, index) => (
                        <div key={index} className="row mt-3">
                          <div className="col-md-3">
                            <label>
                              <select
                                className="form-select form-control-user"
                                id={`categoria-${index}`}
                                value={detalle.idCat = values.idCat}
                                onChange={handleChange}
                              >
                                <option>Seleccione una categoria*</option>
                                {categoria.map((categoriaItem, e) => (
                                  <option key={e} value={categoriaItem.idcat}>{categoriaItem.nombre}</option>
                                ))}
                              </select>
                            </label>
                          </div>
                          <div className="col-md-3">
                            <label>
                              <select
                                className="form-select form-control-user"
                                id={`material-${index}`}
                                value={detalle.idMat = values.idMat}
                                onChange={handleChange}
                              >
                                <option>Seleccione un material</option>
                                {material.map((materialItem, e) => (
                                  <option key={e} value={materialItem.idMat}>{materialItem.nombre}</option>
                                ))}
                              </select>
                            </label>
                          </div>
                          <div className="col-md-2">
                            <label>
                              Precio unitario
                              <input
                                type="text"
                                className="form-control form-control-user"
                                value={formatNumber(detalle.precio)}
                                onChange={(e) => handleInputChange(index, 'precio', e.target.value)}
                              />
                            </label>
                          </div>
                          <div className="col-md-2">
                            <label>
                              Cantidad
                              <input
                                type="number"
                                className="form-control form-control-user"
                                value={formatNumber(detalle.cantidad)}
                                onChange={(e) => handleInputChange(index, 'cantidad', e.target.value)}
                              />
                            </label>
                          </div>
                          <div className="col-md-2">
                            <label>
                              Subtotal
                              <input
                                disabled
                                type="text"
                                className="form-control form-control-user"
                                value={formatNumber(detalle.precio * detalle.cantidad)}
                              />
                            </label>
                          </div>
                          <div className="col-md-1 text-right">
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => removeMaterial(index)}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                      <div className="col-md-12 my-4">
                        <a id="" onClick={addMaterial} className="btn btn-success">Agregar fila <i className="fa fa-plus"></i></a>
                      </div>
                      <p
                      >Total:{values.total_compra = formatNumber(calculateSubtotal())}</p>
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
      </div>
    </div>
  )
}
