import axios from "axios";

export const GetRolesRequest = async () =>{
    return await axios.get('http://localhost:4000/roles')
}

export const CreateRolRequest = async (rol) => {
    return await axios.post('http://localhost:4000/roles', rol)
}

export const DeleteRolRequest = async (idRol) =>{
    return await axios.delete(`http://localhost:4000/roles/${idRol}`)
}

export const GetRolRequest = async (idRol) => {
    return await axios.get(`http://localhost:4000/roles/${idRol}`)
}

export const UpdateRolRequest = async (idRol, newFields) =>{
    return await axios.put(`http://localhost:4000/roles/${idRol}`, newFields)
}

export const ToggleRolStatusRequest = async (idRol, status) =>{
    return await axios.put(`http://localhost:4000/roles/${idRol}`, status)
}