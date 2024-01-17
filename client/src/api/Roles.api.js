import axios from "axios";

export const GetRolesRequest = async () =>{
    return await axios.get('http://localhost:4000/roles')
}


export const CreateRolRequest = async (rol) => {
    return await axios.post('http://localhost:4000/rol', rol,{timeout:500})
}


export const GetRolRequest = async (idRol) => {
    return await axios.get(`http://localhost:4000/rol/${idRol}`)
}

export const UpdateRolRequest = async (idRol, newFields) =>{
    return await axios.put(`http://localhost:4000/rol/${idRol}`, newFields)
}

export const ToggleRolStatusRequest = async (idRol, estado) =>{
    return await axios.put(`http://localhost:4000/rol/${idRol}`, estado)
}