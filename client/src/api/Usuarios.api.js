import axios from "axios";

export const GetUsuariosRequest = async()=>{
    return await  axios.get(`apismovilconstru.onrender.com/usuarios`)
}

export const GetUsuarioRequest = async(idUsu)=>{
    return await axios.get(`apismovilconstru.onrender.com/usuario/${idUsu}`)
}

export const UpdateUsuarioRequest = async(idUsu,newFields)=>{
    return await axios.put(`apismovilconstru.onrender.com/usuario/${idUsu}`,newFields, {timeout:500})
}

export const CreateUsuarioRequest = async(usuario)=>{
    return await axios.post(`apismovilconstru.onrender.com/usuario/`,usuario,{timeout:500})
}

export const ToggleUsuarioStatusRequest = async(idUsu,estado)=>{
    return await axios.put(`apismovilconstru.onrender.com/estadoUsuario/${idUsu}`,estado)
}

export const GetRolesRequest = async()=>{
    return await axios.get(`apismovilconstru.onrender.com/roles`)
}

export const GetEmpleadosRequest = async()=>{
    return await axios.get(`apismovilconstru.onrender.com/empleados`)
}
