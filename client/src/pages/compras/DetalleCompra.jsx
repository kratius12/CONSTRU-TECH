import { useEffect, useState } from "react"
import { useCompras } from "../../context/compras/ComprasProvider"
import { useNavigate, useParams } from "react-router-dom"

export default function DetalleCompra(){
    const {getCompra,Compras,getDetalle} = useCompras()
    useEffect(()=>{
        Compras()
        getDetalle()
    })
    const [compra,setCompra] = useState({
        idCom : "",
        fecha : "",
        imagen : "",
        total_compra : ""
    })
    const [detalle,setDetalle] = useState({
        idCompra: "",
        idMat: "",
        cantidad:"",
        precio:"",
        subtotal:""
    })
    const params = useParams()
    const navigate = useNavigate()
    useState(()=>{
        const loadCompra = async()=>{
            if(params.id){
                const compra = await getCompra(params.id)
                setCompra({
                    fecha : compra.fecha,
                    imagen : compra.imagen,
                    total_compra: compra.total_compra
                })
            }
        }
    })
}