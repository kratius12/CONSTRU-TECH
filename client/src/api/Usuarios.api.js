import axios from "axios";

export const GetUsuariosRequest = async () =>{
    return await axios.get('http://localhost:4000/usuarios')
}

export const CreateUsuarioRequest = async (usuario) => {
    return await axios.post('http://localhost:4000/usuarios', usuario)
}

export const DeleteUsuarioRequest = async (idUsu) =>{
    return await axios.delete(`http://localhost:4000/usuarios/${idUsu}`)
}

export const GetUsuarioRequest = async (idUsu) => {
    return await axios.get(`http://localhost:4000/usuarios/${idUsu}`)
}

export const UpdateUsuarioRequest = async (idUsu, newFields) =>{
    return await axios.put(`http://localhost:4000/usuarios/${idUsu}`, newFields)
}

export const ToggleUsuarioStatusRequest = async (idUsu, status) =>{
    return await axios.put(`http://localhost:4000/usuarios/${idUsu}`, status)
}
