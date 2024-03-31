import axios from "axios";

export const GetComprasRequest = async()=>{
    return await axios.get('https://apismovilconstru-production-be9a.up.railway.app/compras')
}

export const GetCompraRequest = async(idCom)=>{
    return await axios.get(`https://apismovilconstru-production-be9a.up.railway.app/compra/${idCom}`)
}

export const CreateCompraRequest = async(compra)=>{
    return await axios.post('https://apismovilconstru-production-be9a.up.railway.app/compra',compra,{
        headers:{"Content-Type":"multipart/form-data"}
    },{timeout:500})
}

export const UpdateCompraRequest = async(idCom,newCom)=>{
    return await axios.put(`https://apismovilconstru-production-be9a.up.railway.app/compra/${idCom}`,newCom)
}

export const DeleteCompraRequest = async(idCom)=>{
    return await axios.delete(`https://apismovilconstru-production-be9a.up.railway.app/compra/${idCom}`)
}


export const GetDetalleReques = async(idCom)=>{
    return await axios.get(`https://apismovilconstru-production-be9a.up.railway.app/detalle/${idCom}`)
}

export const SearchFacturaRequest = async (fields) =>{
    return await axios.put(`https://apismovilconstru-production-be9a.up.railway.app/compraFactura`, fields)
}