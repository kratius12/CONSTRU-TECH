import axios from "axios";

export const GetObrasRequest = async () =>{
    return await axios.get('apismovilconstru.onrender.com/obras')
}

export const CreateObraRequest = async (obra) => {
    return await axios.post('apismovilconstru.onrender.com/obras', obra)
}

export const DeleteObraRequest = async (idObra) =>{
    return await axios.delete(`apismovilconstru.onrender.com/obra/${idObra}`)
}

export const GetObraRequest = async (idObra) => {
    return await axios.get(`apismovilconstru.onrender.com/obra/${idObra}`)
}

export const UpdateObraRequest = async (idObra, newFields) =>{
    return await axios.put(`apismovilconstru.onrender.com/obra/${idObra}`, newFields,{timeout:500})
}

export const ToggleObraStatusRequest = async (idObra, status) =>{
    return await axios.put(`apismovilconstru.onrender.com/obra/${idObra}`, status)
}

export const GetActividadesRequest = async (idObra)=>{
    return await axios.get(`apismovilconstru.onrender.com/actividades/${idObra}`)
}

export const CreateActividadRequest = async (idObra,actividad) =>{
    return await axios.post(`apismovilconstru.onrender.com/guardarActividad/${idObra}`, actividad)
}

export const SearchActividadRequest = async (idObra, actividad) =>{
    return await axios.put(`apismovilconstru.onrender.com/searchActividad/${idObra}`, actividad)
}