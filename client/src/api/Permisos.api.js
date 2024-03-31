import axios from "axios";

export const GetPermisosRequest = async () =>{
    return await axios.get('https://apismovilconstru-production-be9a.up.railway.app/permisos')
}

export const CreatePermisoRequest = async (permiso) => {
    return await axios.post('https://apismovilconstru-production-be9a.up.railway.app/permisos', permiso)
}

export const DeletePermisoRequest = async (idPer) =>{
    return await axios.delete(`https://apismovilconstru-production-be9a.up.railway.app/permisos/${idPer}`)
}

export const GetPermisoRequest = async (idPer) => {
    return await axios.get(`https://apismovilconstru-production-be9a.up.railway.app/permisos/${idPer}`)
}

export const UpdatePermisoRequest = async (idPer, newFields) =>{
    return await axios.put(`https://apismovilconstru-production-be9a.up.railway.app/permisos/${idPer}`, newFields)
}

export const TogglePermisoStatusRequest = async (idPer, estado) =>{
    return await axios.put(`https://apismovilconstru-production-be9a.up.railway.app/permisos/${idPer}`, estado)
}