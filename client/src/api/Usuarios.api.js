import axios from "axios";

export const GetUsuariosRequest = async () =>{
    return await axios.get('http://localhost:4000/usuarios')
}

export const CreateUsuarioRequest = async (usuario) => {
    return await axios.post('http://localhost:4000/usuarios', usuario)
}

export const GetRolesRequest = async () => {
    return await axios.get('http://localhost:4000/roles')
}

export const GetEmpleadosRequest = async () => {
    return await axios.get('http://localhost:4000/empleados')
}

// export const CreateRolesRequest = async (rol) =>{
//     return await axios.post('http://localhost:4000/roles', rol, {timeout: 5000})
// }
// export const CreateEmpleadosRequest = async (empleado) =>{
//     return await axios.post('http://localhost:4000/empleados', empleado, {timeout: 5000})
// }

export const DeleteUsuarioRequest = async (idUsu) =>{
    return await axios.delete(`http://localhost:4000/usuarios/${idUsu}`)
}

export const GetUsuarioRequest = async (idUsu) => {
    return await axios.get(`http://localhost:4000/usuarios/${idUsu}`, {timeout: 5000}   )
}

export const UpdateUsuarioRequest = async (idUsu, newFields) =>{
    return await axios.put(`http://localhost:4000/usuarios/${idUsu}`, newFields)
}

export const ToggleUsuarioStatusRequest = async (idUsu, status) =>{
    return await axios.put(`http://localhost:4000/usuarios/${idUsu}`, status)
}