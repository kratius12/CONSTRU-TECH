import axios from "axios";

export const GetRolesRequest = async () =>{
    return await axios.get('https://apismovilconstru.onrender.com/roles')
}


export const CreateRolRequest = async (rol) => {
    return await axios.post('https://apismovilconstru.onrender.com/rol', rol,{timeout:500})
}


export const GetRolRequest = async (idRol) => {
    return await axios.get(`https://apismovilconstru.onrender.com/rol/${idRol}`)
}

export const UpdateRolRequest = async (idRol, newFields) =>{
    return await axios.put(`https://apismovilconstru.onrender.com/rol/${idRol}`, newFields,{timeout:5000})
}

export const ToggleRolStatusRequest = async (idRol, estado) =>{
    return await axios.put(`https://apismovilconstru.onrender.com/estadoRol/${idRol}`, estado)
}