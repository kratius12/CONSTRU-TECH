import axios from "axios";

export const GetComprasRequest = async()=>{
    return await axios.get('http://localhost:4000/compras')
}

export const GetCompraRequest = async(idCom)=>{
    return await axios.get(`http://localhost:4000/compra/${idCom}`)
}

export const CreateCompraRequest = async(compra)=>{
    return await axios.post('http://localhost:4000/compra',compra,{
        headers:{"Content-Type":"multipart/form-data"}
    })
}

export const UpdateCompraRequest = async(idCom,newCom)=>{
    return await axios.put(`http://localhost:4000/compra/${idCom}`,newCom)
}

export const DeleteCompraRequest = async(idCom)=>{
    return await axios.delete(`http://localhost:4000/compra/${idCom}`)
}


export const GetDetalleReques = async(idCom)=>{
    return await axios.get(`http://localhost:4000/detalle/${idCom}`)
}

export const SearchFacturaRequest = async (fields) =>{
    return await axios.put(`http://localhost:4000/compraFactura`, fields)
}