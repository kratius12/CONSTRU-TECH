import axios from "axios";

export const GetPermisosRequest = async () =>{
    return await axios.get('http://localhost:4000/permisos')
}

export const CreatePermisoRequest = async (permiso) => {
    return await axios.post('http://localhost:4000/permisos', permiso)
}

export const DeletePermisoRequest = async (idPer) =>{
    return await axios.delete(`http://localhost:4000/permisos/${idPer}`)
}

export const GetPermisoRequest = async (idPer) => {
    return await axios.get(`http://localhost:4000/permisos/${idPer}`)
}

export const UpdatePermisoRequest = async (idPer, newFields) =>{
    return await axios.put(`http://localhost:4000/permisos/${idPer}`, newFields)
}

export const TogglePermisoStatusRequest = async (idPer, status) =>{
    return await axios.put(`http://localhost:4000/permisos/${idPer}`, status)
}