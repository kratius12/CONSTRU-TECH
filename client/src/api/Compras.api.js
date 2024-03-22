import axios from "axios";

export const GetComprasRequest = async()=>{
    return await axios.get('https://apismovilconstru.onrender.com/compras')
}

export const GetCompraRequest = async(idCom)=>{
    return await axios.get(`https://apismovilconstru.onrender.com/compra/${idCom}`)
}

export const CreateCompraRequest = async(compra)=>{
    return await axios.post('https://apismovilconstru.onrender.com/compra',compra,{
        headers:{"Content-Type":"multipart/form-data"}
    },{timeout:500})
}

export const UpdateCompraRequest = async(idCom,newCom)=>{
    return await axios.put(`https://apismovilconstru.onrender.com/compra/${idCom}`,newCom)
}

export const DeleteCompraRequest = async(idCom)=>{
    return await axios.delete(`https://apismovilconstru.onrender.com/compra/${idCom}`)
}


export const GetDetalleReques = async(idCom)=>{
    return await axios.get(`https://apismovilconstru.onrender.com/detalle/${idCom}`)
}

export const SearchFacturaRequest = async (fields) =>{
    return await axios.put(`https://apismovilconstru.onrender.com/compraFactura`, fields)
}