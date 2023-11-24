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
    total_compra: ''
  })
  const [detalle, setDetalle] = useState({
    idCompra: '',
    idMat: '',
    cantidad: '',
    subtotal: ''
  })

  const [material, setMaterial] = useState([])
  const [categoria, setCategoria] = useState([])
  const [materialSeleccionado, setMaterialSeleccionado] = useState('')
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')
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
            validationSchema={comprasSchema}
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
                precio: ''
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

                      <div className="col-3 mt-3">
                        <select className="form-select form-control-user" id="idCategoria" value={values.idCategoria = categoriaSeleccionada} onChange={(e) => { setCategoriaSeleccionada(e.target.value) }}>
                          <option >Seleccione una categoria*</option>
                          {categoria.map((categoria, e) => (
                            <option key={e} value={categoria.idcat}>{categoria.nombre}</option>
                          ))}
                        </select>

                        {errors.categoria && touched.categoria ? (
                          <div className="alert alert-danger" role="alert">{errors.categoria}</div>
                        ) : null}
                      </div>
                      <div className="col-3 mt-3">
                        <select className="form-select form-control-user" id="idCategoria" value={values.idMat = materialSeleccionado} onChange={(e) => { setMaterialSeleccionado(e.target.value) }}>
                          <option >Seleccione un material</option>
                          {material.map((material, e) => (
                            <option key={e} value={material.idcat}>{material.nombre}</option>
                          ))}
                        </select>
                        {errors.estado && touched.estado ? (
                          <div className="alert alert-danger" role="alert">{errors.estado}</div>
                        ) : null}
                      </div>
                      <div className="col-3 mt-3">
                        <input type="text" className="form-control form-control-user" id="subtotal" onChange={handleChange} value={values.subtotal} placeholder="Cantidad*" />
                        {errors.subtotal && touched.subtotal ? (
                          <div className="alert alert-danger" role="alert">{errors.subtotal}</div>
                        ) : null}
                      </div>
                      <div className="col-3 mt-3">
                        <input type="text" className="form-control form-control-user" id="precio" onChange={handleChange} value={values.precio} placeholder="Valor unitario*" />
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
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-icon-split w-50">
                          <span className="icon text-white-50">
                            <i className="fas fa-plus"></i>
                          </span>
                          <span className="text">{params.id ? "Editar" : "Agregar"}</span>
                        </button>
                      </div>
                      <div className="col-md-6">
                        <a type="button" href="" className="btn btn-danger btn-icon-split w-50" onClick={() => navigate(`/compras`)}>
                          <span className="icon text-white-50">
                            <i className="fas fa-trash"></i>
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
