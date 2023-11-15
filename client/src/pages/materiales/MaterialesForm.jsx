import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useMateriales } from "../../context/materiales/MaterialesProvider";
import * as Yup from 'yup';
import axios from "axios";
const materialSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(3, 'El nombre debe contener al menos 3 caracteres')
    .max(50, 'El nombre no puede contener mas de 50 caracteres')
    .required('El nombre es requerido'),
  idProveedor: Yup.string()
    .required('El proveedor es requerido'),
  idCategoria: Yup.string()
    .required('La categoria es requerida'),
  cantidad: Yup.string()
    .min(1)
    .required("La cantidad es requerida"),
  estado: Yup.string()
    .required('El estado es requerido')
});



export default function MaterialesForm() {
  //   const [agreed, setAgreed] = useState(false)
  const { createMaterial, getMaterial, updateMaterial, getProveedores, getCategorias,proveedores,categorias } = useMateriales()
  useEffect(() => {
    getCategorias()
    getProveedores()
  }, [])

 
  const alertConfirm = (type) => {
    var message = ""
    if (type == "update") {
      message = "Actualizado"
    } else {
      message = "Agregado"
    }
    // eslint-disable-next-line no-undef
    $.confirm({
      title: `material ` + message + ` con exito!`,
      content: "Redirecionando a listado de materiales...",
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
  const params = useParams()
  const navigate = useNavigate()
  const [material, setMaterial] = useState({
    nombre: "",
    idProveedor: "",
    cantidad: "",
    idCategoria: "",
    estado: ""
  })

  useEffect(() => {
    const loadMateriales = async () => {
      if (params.id) {
        const material = await getMaterial(params.id)
        setMaterial({
          nombre: material.nombre,
          idProveedor: material.idProveedor,
          cantidad: material.cantidad,
          idCategoria: material.idCategoria,
          estado: material.estado
        })
      }
    }

    loadMateriales()

  }, [getMaterial, params.id])

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Formik initialValues={material}
            enableReinitialize={true}
            validationSchema={materialSchema}
            onSubmit={async (values) => {
              console.log(values);
              if (params.id) {
                await updateMaterial(params.id, values)
                alertConfirm()
                setTimeout(
                  navigate("/materiales"),
                  500
                )
              } else {
                await createMaterial(values)
                alertConfirm()
                setTimeout(
                  navigate("/materiales"),
                  500
                )
              }
              setMaterial({
                nombre: "",
                idProveedor: "",
                cantidad: "",
                idCategoria: "",
                estado: ""
              })
            }}
          >
            {({ handleChange, handleSubmit, values, isSubmitting, errors, touched }) => (
              <Form onSubmit={handleSubmit} >
                <div className="card text-center w-100">
                  <div className="card-header bg-primary text-white">
                    <h2>{params.id ? "Editar" : "Agregar"} material</h2>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6 mt-3">
                        <label htmlFor="nombre" className="form-label">Nombre <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="nombre" onChange={handleChange} value={values.nombre} />
                        {errors.nombre && touched.nombre ? (
                          <div className="alert alert-danger" role="alert">{errors.nombre}</div>
                        ) : null}
                      </div>
                      <div className="col-6 mt-3">
                        <label htmlFor="cantidad" className="form-label">Cantidad <span className="text-danger">*</span></label>
                        <input type="number" className="form-control" id="cantidad" onChange={handleChange} value={values.cantidad} />
                        {errors.cantidad && touched.cantidad ? (
                          <div className="alert alert-danger" role="alert">{errors.cantidad}</div>
                        ) : null}
                      </div>
                      <div className="col-6 mt-3">
                        <label htmlFor="idCategoria" className="form-label">categorias <span className="text-danger">*</span></label>
                        <select className="form-select" id="idCategoria" value={values.idCategoria } onChange={handleChange}>
                          <option >Seleccione una categoria</option>
                          {categorias.map((categoria, e) => (
                            <option key={e} value={categoria.idcat}>{categoria.nombre}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-6 mt-3">
                        <label htmlFor="idProveedor" className="form-label">Proveedor <span className="text-danger">*</span></label>
                        <select className="form-select" id="idProveedor" value={values.idProveedor } onChange={handleChange}>
                          <option value="">Seleccione un proveedor</option>
                          {proveedores.map((proveedor, i) => (
                            <option key={i} value={proveedor.idProv}>{proveedor.nombre}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-6 mt-3">
                        <label htmlFor="estado" className="form-label">Estado <span className="text-danger">*</span></label>
                        <select id="estado" className="form-select" onChange={handleChange} value={values.estado} >
                          <option value="">Seleccione estado</option>
                          <option value="1">Activo</option>
                          <option value="0">Inactivo</option>
                        </select>
                        {errors.estado && touched.estado ? (
                          <div className="alert alert-danger" role="alert">{errors.estado}</div>
                        ) : null}
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
                        <a type="button" className="btn btn-danger w-50" onClick={() => navigate(`/materiales`)}>
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
