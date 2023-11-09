import { useNavigate, useParams } from "react-router-dom"
import { useProveedores } from "../../context/proveedores/ProveedorProvider"
import { useEffect, useState } from "react"
import '../../components/proveedores/ProveedorDetalle.css'

export default function ProveedorDetalle() {
    const { getProveedor, Proveedores } = useProveedores()
    useEffect(() => {
        Proveedores()
    }, [])
    const [proveedor, setProveedor] = useState({
        nombre: "",
        direccion: "",
        nit: "",
        tipo: "",
        estado: "",
        email: "",
        telefono: "",
        nombreContacto: "",
        telefonoContacto: "",
        emailContacto: ""
    })
    const params = useParams()
    const navigate = useNavigate()
    useState(() => {
        const loadProveedor = async () => {
            if (params.id) {
                const proveedor = await getProveedor(params.id)
                setProveedor({
                    nombre: proveedor.nombre,
                    direccion: proveedor.direccion,
                    nit: proveedor.nit,
                    tipo: proveedor.tipo,
                    estado: proveedor.estado,
                    email: proveedor.email,
                    telefono: proveedor.telefono,
                    nombreContacto: proveedor.nombreContacto,
                    telefonoContacto: proveedor.telefonoContacto,
                    emailContacto: proveedor.emailContacto
                })
            }
        }
        loadProveedor()
    }), [getProveedor, params.id]

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card" id="card">
                        <h1 >INFORMACIÓN DEL PROVEEDOR</h1>
                        <p> Nombre: {proveedor.nombre}</p>
                        <p> Email: {proveedor.email}</p>
                        <p> Dirección: {proveedor.direccion}</p>
                        <p> Telefono: {proveedor.telefono}</p>
                        <p> Nit: {proveedor.nit}</p>
                        <p> Tipo de proveedor: Persona {proveedor.tipo}</p>
                        <hr></hr>
                        <h4>INFORMACIÓN DEL CONTACTO</h4>
                        <p>Nombre del contacto: {proveedor.nombreContacto}</p>
                        <p>Email del contacto: {proveedor.emailContacto}</p>
                        <p>Telefono del contacto: {proveedor.telefonoContacto}</p>
                        <div className="col-md-6">
                            <a type="button" href="" className="btn btn-danger w-50" onClick={() => navigate(`/proveedores`)}>
                                <h4>Regresar</h4>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}