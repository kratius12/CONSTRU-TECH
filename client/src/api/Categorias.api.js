import axios from "axios";

export const GetCategoriasRequest = async () =>{
    return await axios.get('apismovilconstru.onrender.com//categorias')
}

export const CreateCategoriaRequest = async (categoria) => {
    return await axios.post('apismovilconstru.onrender.com//categorias', categoria)
}

export const DeleteCategoriaRequest = async (idcat) =>{
    return await axios.delete(`apismovilconstru.onrender.com//categoria/${idcat}`)
}

export const GetCategoriaRequest = async (idcat) => {
    return await axios.get(`apismovilconstru.onrender.com//categoria/${idcat}`)
}

export const UpdateCategoriaRequest = async (idcat, newFields) =>{
    return await axios.put(`apismovilconstru.onrender.com//categoria/${idcat}`, newFields)
}

export const ToggleCategoriaStatusRequest = async (idcat, estado) =>{
    return await axios.put(`apismovilconstru.onrender.com//estadoCategoria/${idcat}`, estado)
}