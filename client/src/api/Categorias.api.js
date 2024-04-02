import axios from "axios";

export const GetCategoriasRequest = async () =>{
    return await axios.get('https://apismovilconstru-production-be9a.up.railway.app/categorias')
}

export const CreateCategoriaRequest = async (categoria) => {
    return await axios.post('https://apismovilconstru-production-be9a.up.railway.app/categorias', categoria)
}

export const DeleteCategoriaRequest = async (idcat) =>{
    return await axios.delete(`https://apismovilconstru-production-be9a.up.railway.app/categoria/${idcat}`)
}

export const GetCategoriaRequest = async (idcat) => {
    return await axios.get(`https://apismovilconstru-production-be9a.up.railway.app/categoria/${idcat}`)
}

export const UpdateCategoriaRequest = async (idcat, newFields) =>{
    return await axios.put(`https://apismovilconstru-production-be9a.up.railway.app/categoria/${idcat}`, newFields)
}

export const ToggleCategoriaStatusRequest = async (idcat, estado) =>{
    return await axios.put(`https://apismovilconstru-production-be9a.up.railway.app/estadoCategoria/${idcat}`, estado)
}