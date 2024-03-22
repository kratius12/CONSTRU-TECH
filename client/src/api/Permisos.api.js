import axios from "axios";

export const GetPermisosRequest = async () =>{
    return await axios.get('https://apismovilconstru.onrender.com/permisos')
}

export const CreatePermisoRequest = async (permiso) => {
    return await axios.post('https://apismovilconstru.onrender.com/permisos', permiso)
}

export const DeletePermisoRequest = async (idPer) =>{
    return await axios.delete(`https://apismovilconstru.onrender.com/permisos/${idPer}`)
}

export const GetPermisoRequest = async (idPer) => {
    return await axios.get(`https://apismovilconstru.onrender.com/permisos/${idPer}`)
}

export const UpdatePermisoRequest = async (idPer, newFields) =>{
    return await axios.put(`https://apismovilconstru.onrender.com/permisos/${idPer}`, newFields)
}

export const TogglePermisoStatusRequest = async (idPer, estado) =>{
    return await axios.put(`https://apismovilconstru.onrender.com/permisos/${idPer}`, estado)
}