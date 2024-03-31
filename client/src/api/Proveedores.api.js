import axios from "axios";

export const GetProveedoresRequest = async () =>{
    return await axios.get('https://apismovilconstru-production-be9a.up.railway.app/provs')
}

export const CreateProveedorRequest = async (proveedor) => {
    return await axios.post('https://apismovilconstru-production-be9a.up.railway.app/newprov', proveedor)
}

export const DeleteProveedorRequest = async (idProv) =>{
    return await axios.delete(`https://apismovilconstru-production-be9a.up.railway.app/prov/${idProv}`)
}

export const GetProveedorRequest = async (idProv) => {
    return await axios.get(`https://apismovilconstru-production-be9a.up.railway.app/prov/${idProv}`)
}

export const UpdateProveedorRequest = async (idProv, newFields) =>{
    return await axios.put(`https://apismovilconstru-production-be9a.up.railway.app/prov/${idProv}`, newFields)
}
export const ToggleProveedorStatusRequest = async (idProv, estado) =>{
    return await axios.put(`https://apismovilconstru-production-be9a.up.railway.app/proveedorEstado/${idProv}`, estado)
}

export const SearchNitRequest = async (fields)=>{
    return await axios.put(`https://apismovilconstru-production-be9a.up.railway.app/documentoProv`,fields)
}