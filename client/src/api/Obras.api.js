import axios from "axios";

export const GetObrasRequest = async () =>{
    return await axios.get('https://apismovilconstru.onrender.com/obras')
}

export const CreateObraRequest = async (obra) => {
    return await axios.post('https://apismovilconstru.onrender.com/obras', obra)
}

export const DeleteObraRequest = async (idObra) =>{
    return await axios.delete(`https://apismovilconstru.onrender.com/obra/${idObra}`)
}

export const GetObraRequest = async (idObra) => {
    return await axios.get(`https://apismovilconstru.onrender.com/obra/${idObra}`)
}

export const UpdateObraRequest = async (idObra, newFields) =>{
    return await axios.put(`https://apismovilconstru.onrender.com/obra/${idObra}`, newFields,{timeout:500})
}

export const ToggleObraStatusRequest = async (idObra, status) =>{
    return await axios.put(`https://apismovilconstru.onrender.com/obra/${idObra}`, status)
}

export const GetActividadesRequest = async (idObra)=>{
    return await axios.get(`https://apismovilconstru.onrender.com/actividades/${idObra}`)
}

export const CreateActividadRequest = async (idObra,actividad) =>{
    return await axios.post(`https://apismovilconstru.onrender.com/guardarActividad/${idObra}`, actividad)
}

export const SearchActividadRequest = async (idObra, actividad) =>{
    return await axios.put(`https://apismovilconstru.onrender.com/searchActividad/${idObra}`, actividad)
}