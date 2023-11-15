import axios from "axios";

export const GetUsuariosRequest = async () =>{
    return await axios.get('http://localhost:4000/Usuarios')
}

export const CreateUsuarioRequest = async (usuario) => {
    return await axios.post('http://localhost:4000/Usuarios', usuario)
}

export const DeleteUsuarioRequest = async (idUsu) =>{
    return await axios.delete(`http://localhost:4000/Usuarios/${idUsu}`)
}

export const GetUsuarioRequest = async (idUsu) => {
    return await axios.get(`http://localhost:4000/Usuarios/${idUsu}`)
}

export const UpdateUsuarioRequest = async (idUsu, newFields) =>{
    return await axios.put(`http://localhost:4000/Usuarios/${idUsu}`, newFields)
}

export const ToggleUsuarioStatusRequest = async (idUsu, status) =>{
    return await axios.put(`http://localhost:4000/Usuarios/${idUsu}`, status)
}