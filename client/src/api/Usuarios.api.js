import axios from "axios";

export const GetUsuariosRequest = async()=>{
    return await  axios.get(`https://apismovilconstru.onrender.com/usuarios`)
}

export const GetUsuarioRequest = async(idUsu)=>{
    return await axios.get(`https://apismovilconstru.onrender.com/usuario/${idUsu}`)
}

export const UpdateUsuarioRequest = async(idUsu,newFields)=>{
    return await axios.put(`https://apismovilconstru.onrender.com/usuario/${idUsu}`,newFields, {timeout:500})
}

export const CreateUsuarioRequest = async(usuario)=>{
    return await axios.post(`https://apismovilconstru.onrender.com/usuario/`,usuario,{timeout:500})
}

export const ToggleUsuarioStatusRequest = async(idUsu,estado)=>{
    return await axios.put(`https://apismovilconstru.onrender.com/estadoUsuario/${idUsu}`,estado)
}

export const GetRolesRequest = async()=>{
    return await axios.get(`https://apismovilconstru.onrender.com/roles`)
}

export const GetEmpleadosRequest = async()=>{
    return await axios.get(`https://apismovilconstru.onrender.com/empleados`)
}
