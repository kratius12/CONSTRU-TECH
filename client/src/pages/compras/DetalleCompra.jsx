import { useNavigate, useParams } from "react-router-dom"
import { useCompras } from "../../context/compras/ComprasProvider"
import { useEffect, useState } from "react"


export default function ProveedorDetalle() {
    const { getCompra, Compras } = useCompras()
    useEffect(() => {
        Compras()
    }, [])
    const [compra, setCompra] = useState({
        fecha:"",
        total_compra:"",
        imagen:""
    })
    const params = useParams()
    const navigate = useNavigate()
    useState(() => {
        const loadCompra = async () => {
            if (params.id) {
                const compra = await getCompra(params.id)
                setCompra({
                    fecha:compra.fecha,
                    imagen:compra.imagen,
                    total_compra:compra.total_compra
                })
            }
        }
        loadCompra()
    }), [getCompra, params.id]

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card" id="card">
                        <h1 >DETALLE DE COMPRA</h1>
                        
                        <div className="col-md-6">
                            <a type="button" href="" className="btn btn-danger w-50" onClick={() => navigate(`/compras`)}>
                                <h4>Regresar</h4>
                            </a>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    )

}