import axios from "axios";

export const GetRolesRequest = async () =>{
    return await axios.get('https://apismovilconstru-production-be9a.up.railway.app/roles')
}


export const CreateRolRequest = async (rol) => {
    return await axios.post('https://apismovilconstru-production-be9a.up.railway.app/rol', rol,{timeout:500})
}


export const GetRolRequest = async (idRol) => {
    return await axios.get(`https://apismovilconstru-production-be9a.up.railway.app/rol/${idRol}`)
}

export const UpdateRolRequest = async (idRol, newFields) =>{
    return await axios.put(`https://apismovilconstru-production-be9a.up.railway.app/rol/${idRol}`, newFields,{timeout:5000})
}

export const ToggleRolStatusRequest = async (idRol, estado) =>{
    return await axios.put(`https://apismovilconstru-production-be9a.up.railway.app/estadoRol/${idRol}`, estado)
}