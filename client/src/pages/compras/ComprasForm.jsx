import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useCompras } from "../../context/compras/ComprasProvider";
import comprasSchema from './ComprasSchema'
export default function ComprasForm() {
  //   const [agreed, setAgreed] = useState(false)
  const { createCompra, getCompra, Compras, createDetalle, getDetalle } = useCompras()
  useEffect(() => {
    Compras()
  }, [])
  const [formSections, setFormSections] = useState([
    { categoria: '', precio: '', material: '', cantidad: ''},
  ]);

  const params = useParams()
  const navigate = useNavigate()
  const [compra, setCompra] = useState({
    fecha: '',
    imagen: '',
    total_compra: ''
  })
  const [detalle, setDetalle] = useState({
    idCompra: '',
    idMat: '',
    cantidad: '',
    subtotal: ''
  })
  useEffect(() => {
    const loadCompras = async () => {
      if (params.id) {
        const compra = await getCompra(params.id)
        setCompra({
          fecha: compra.fecha,
          imagen: compra.imagen,
          total_compra: compra.total_compra
        })
      }
    }
    loadCompras()
  }, [getCompra, params.id])

  useEffect(() => {
    const loadDetalle = async () => {
      if (params.id) {
        const detalle = await getDetalle(params.id)

        setDetalle({
          idCompra: detalle.idCompra,
          idMat: detalle.idMat,
          cantidad: detalle.cantidad,
          subtotal: detalle.subtotal
        })
      }
    }
    loadDetalle()
  }, [getDetalle, params.id]
  )
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Formik initialValues={compra}
            enableReinitialize={true}
      
            onSubmit={async (values) => {
              console.log(values);
              await createCompra(values)
              navigate("/compras")
              setCompra({
                fecha: '',
                imagen: '',
                total_compra: ''
              })
              await createDetalle(values)
              setDetalle({
                idCompra: '',
                idMat: '',
                cantidad: '',
                subtotal: '',
                precio:''
              })
            }}
          >
            {({ handleChange, handleSubmit, values, isSubmitting, errors, touched }) => (

              <Form onSubmit={handleSubmit}>
                <div className="card text-center w-100">
                  <div className="card-header bg-primary text-white">
                    <h2>Agregar compra</h2>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6 mt-3">
                        <label htmlFor="fecha" className="form-label">Fecha de compra <span className="text-danger">*</span></label>
                        <input type="date" className="form-control hasDatepicker" id="fecha" onChange={handleChange} value={values.fecha} />
                        {errors.fecha && touched.fecha ? (
                          <div className="alert alert-danger" role="alert">{errors.fecha}</div>
                        ) : null}
                      </div>
                      <div className="col-6 mt-3">
                        <label htmlFor="imagen" className="form-label">Factura <span className="text-danger">*</span></label>
                        <input type="file" className="form-control" id="imagen" onChange={handleChange} value={values.imagen} />
                        {errors.imagen && touched.imagen ? (
                          <div className="alert alert-danger" role="alert">{errors.imagen}</div>
                        ) : null}
                      </div>
                      <hr className="mt-4" />

                      <div className="col-3 mt-3">
                        <label htmlFor="categoria" className="form-label">Categoria <span className="text-danger">*</span></label>
                        <select id="categoria" className="form-select" onChange={handleChange} value={values.categoria} >
                          <option value="">Seleccione categoria</option>
                          <option value="6000">Ceramica</option>
                          <option value="6001">Tuberia</option>
                        </select>
                        {errors.categoria && touched.categoria ? (
                          <div className="alert alert-danger" role="alert">{errors.categoria}</div>
                        ) : null}
                      </div>
                      <div className="col-3 mt-3">
                        <label htmlFor="estado" className="form-label">Material <span className="text-danger">*</span></label>
                        <select id="estado" className="form-select" onChange={handleChange} value={values.estado} >
                          <option value="">Seleccione el nombre del material</option>
                          <option value="504">Cemento</option>
                        </select>
                        {errors.estado && touched.estado ? (
                          <div className="alert alert-danger" role="alert">{errors.estado}</div>
                        ) : null}
                      </div>
                      <div className="col-3 mt-3">
                        <label htmlFor="subtotal" className="form-label">Subtotal<span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="subtotal" onChange={handleChange} value={values.subtotal} />
                        {errors.subtotal && touched.subtotal ? (
                          <div className="alert alert-danger" role="alert">{errors.subtotal}</div>
                        ) : null}
                      </div>
                      <div className="col-3 mt-3">
                        <label htmlFor="precio" className="form-label">Valor  unitario <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="precio" onChange={handleChange} value={values.precio} />
                        {errors.precio && touched.precio ? (
                          <div className="alert alert-danger" role="alert">{errors.precio}</div>
                        ) : null}
                      </div>
                      <div className="col-md-12 my-4">
                        <button id="" className="btn btn-success duplicate">Agregar fila <i className="fa fa-plus"></i></button>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer text-center">
                    <div className="row">
                      <div className="col-md-6">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary w-50">
                          <h4>{params.id ? "Editar" : "Agregar"}</h4>
                        </button>
                      </div>
                      <div className="col-md-6">
                        <a type="button" href="" className="btn btn-danger w-50" onClick={() => navigate(`/compras`)}>
                          <h4>Cancelar</h4>
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
