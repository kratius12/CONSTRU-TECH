import axios from "axios";

export const GetProveedoresRequest = async () =>{
    return await axios.get('apismovilconstru.onrender.com/provs')
}

export const CreateProveedorRequest = async (proveedor) => {
    return await axios.post('apismovilconstru.onrender.com/newprov', proveedor)
}

export const DeleteProveedorRequest = async (idProv) =>{
    return await axios.delete(`apismovilconstru.onrender.com/prov/${idProv}`)
}

export const GetProveedorRequest = async (idProv) => {
    return await axios.get(`apismovilconstru.onrender.com/prov/${idProv}`)
}

export const UpdateProveedorRequest = async (idProv, newFields) =>{
    return await axios.put(`apismovilconstru.onrender.com/prov/${idProv}`, newFields)
}
export const ToggleProveedorStatusRequest = async (idProv, estado) =>{
    return await axios.put(`apismovilconstru.onrender.com/proveedorEstado/${idProv}`, estado)
}

export const SearchNitRequest = async (fields)=>{
    return await axios.put(`apismovilconstru.onrender.com/documentoProv`,fields)
}