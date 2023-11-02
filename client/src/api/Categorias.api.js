import axios from "axios";

export const GetCategoriasRequest = async () =>{
    return await axios.get('http://localhost:4000/categorias')
}

export const CreateCategoriaRequest = async (categoria) => {
    return await axios.post('http://localhost:4000/categorias', categoria)
}

export const DeleteCategoriaRequest = async (idcat) =>{
    return await axios.delete(`http://localhost:4000/categoria/${idcat}`)
}

export const GetCategoriaRequest = async (idcat) => {
    return await axios.get(`http://localhost:4000/categoria/${idcat}`)
}

export const UpdateCategoriaRequest = async (idcat, newFields) =>{
    return await axios.put(`http://localhost:4000/categoria/${idcat}`, newFields)
}

export const ToggleCategoriaStatusRequest = async (idcat, status) =>{
    return await axios.put(`http://localhost:4000/categoria/${idcat}`, status)
}