import axios from "axios";

export const GetUsuariosRequest = async()=>{
    return await  axios.get(`https://apismovilconstru-production-be9a.up.railway.app/usuarios`)
}

export const GetUsuarioRequest = async(idUsu)=>{
    return await axios.get(`https://apismovilconstru-production-be9a.up.railway.app/usuario/${idUsu}`)
}

export const UpdateUsuarioRequest = async(idUsu,newFields)=>{
    return await axios.put(`https://apismovilconstru-production-be9a.up.railway.app/usuario/${idUsu}`,newFields, {timeout:500})
}

export const CreateUsuarioRequest = async(usuario)=>{
    return await axios.post(`https://apismovilconstru-production-be9a.up.railway.app/usuario/`,usuario,{timeout:500})
}

export const ToggleUsuarioStatusRequest = async(idUsu,estado)=>{
    return await axios.put(`https://apismovilconstru-production-be9a.up.railway.app/estadoUsuario/${idUsu}`,estado)
}

export const GetRolesRequest = async()=>{
    return await axios.get(`https://apismovilconstru-production-be9a.up.railway.app/roles`)
}

export const GetEmpleadosRequest = async()=>{
    return await axios.get(`https://apismovilconstru-production-be9a.up.railway.app/empleados`)
}
