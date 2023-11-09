import { useEffect, useState } from "react";
import { useCompras } from "../../context/compras/ComprasProvider";
import { useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'

const compraSchema = Yup.object().shape({
    fecha: Yup.date()
        .required('La fecha es requerida'),
    imagen: Yup.string()
        .required('La imagen es requerida'),
})

export default function ComprasForm() {
    const { createCompra, getCompra, Compras } = useCompras()
    useEffect(() => {
        Compras()
    }, [])
    const [compra, setCompra] = useState({
        fecha: '',
        imagen: '',
        total_compra: ''
    })
    const params = useParams()
    const navigate = useNavigate()
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
    }, [getCompra, params.id]
    )
    return (
        <div className="container">
            <div className="row">
                <Formik initialValues={compra}
                    enableReinitialize={true}
                    validationSchema={compraSchema}
                    onSubmit={async (values) => {
                        console.log(values)
                        await createCompra(values)
                        navigate('/compras')
                        setCompra({
                            fecha: '',
                            imagen: '',
                            total_compra: ''
                        })
                    }}
                >
                    {({ handleChange, handleSubmit, values, isSubmitting, errors, touched }) => {
                        <Form onSubmit={handleSubmit}>
                            <div className="card text-center w-100">
                                <div className="card-header bg-primary text-white">
                                    <h2>Agregar Proveedor</h2>
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
                                            <label htmlFor="number" className="form-label">Precio <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" id="precio" onChange={handleChange} value={values.precio} />
                                            {errors.precio && touched.precio ? (
                                                <div className="alert alert-danger" role="alert">{errors.precio}</div>
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

                                        </div>
                                        <div className="col-6 mt-3">
                                            <label htmlFor="idProveedor" className="form-label">proveedores <span className="text-danger">*</span></label>

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
                                                <h4>Agregar</h4>
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
                    }}

                </Formik>
            </div>
        </div>
    )
}