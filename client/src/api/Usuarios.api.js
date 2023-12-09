import axios from "axios";

export const GetUsuariosRequest = async()=>{
    return await  axios.get(`http://localhost:4000/usuarios`)
}

export const GetUsuarioRequest = async(idUsu)=>{
    return await axios.get(`http://localhost:4000/usuario/${idUsu}`)
}

export const UpdateUsuarioRequest = async(idUsu,newFields)=>{
    return await axios.put(`http://localhost:4000/usuario/${idUsu}`,newFields)
}

export const CreateUsuarioRequest = async(usuario)=>{
    return await axios.post(`http://localhost:4000/usuario/`,usuario,{timeout:500})
}

export const ToggleUsuarioStatusRequest = async(idUsu,estado)=>{
    return await axios.put(`http://localhost:4000/estadoUsuario/${idUsu}`,estado)
}

export const GetRolesRequest = async()=>{
    return await axios.get(`http://localhost:4000/roles`)
}

export const GetEmpleadosRequest = async()=>{
    return await axios.get(`http://localhost:4000/empleados`)
}
