import axios from "axios";

export const GetProveedoresRequest = async () =>{
    return await axios.get('https://apismovilconstru.onrender.com/provs')
}

export const CreateProveedorRequest = async (proveedor) => {
    return await axios.post('https://apismovilconstru.onrender.com/newprov', proveedor)
}

export const DeleteProveedorRequest = async (idProv) =>{
    return await axios.delete(`https://apismovilconstru.onrender.com/prov/${idProv}`)
}

export const GetProveedorRequest = async (idProv) => {
    return await axios.get(`https://apismovilconstru.onrender.com/prov/${idProv}`)
}

export const UpdateProveedorRequest = async (idProv, newFields) =>{
    return await axios.put(`https://apismovilconstru.onrender.com/prov/${idProv}`, newFields)
}
export const ToggleProveedorStatusRequest = async (idProv, estado) =>{
    return await axios.put(`https://apismovilconstru.onrender.com/proveedorEstado/${idProv}`, estado)
}

export const SearchNitRequest = async (fields)=>{
    return await axios.put(`https://apismovilconstru.onrender.com/documentoProv`,fields)
}