import axios from "axios";

export const GetObrasRequest = async () =>{
    return await axios.get('https://apismovilconstru-production-be9a.up.railway.app/obras')
}

export const CreateObraRequest = async (obra) => {
    return await axios.post('https://apismovilconstru-production-be9a.up.railway.app/obras', obra)
}

export const DeleteObraRequest = async (idObra) =>{
    return await axios.delete(`https://apismovilconstru-production-be9a.up.railway.app/obra/${idObra}`)
}

export const GetObraRequest = async (idObra) => {
    return await axios.get(`https://apismovilconstru-production-be9a.up.railway.app/obra/${idObra}`)
}

export const UpdateObraRequest = async (idObra, newFields) =>{
    return await axios.put(`https://apismovilconstru-production-be9a.up.railway.app/obra/${idObra}`, newFields,{timeout:500})
}

export const ToggleObraStatusRequest = async (idObra, status) =>{
    return await axios.put(`https://apismovilconstru-production-be9a.up.railway.app/obra/${idObra}`, status)
}

export const GetActividadesRequest = async (idObra)=>{
    return await axios.get(`https://apismovilconstru-production-be9a.up.railway.app/actividades/${idObra}`)
}

export const CreateActividadRequest = async (idObra,actividad) =>{
    return await axios.post(`https://apismovilconstru-production-be9a.up.railway.app/guardarActividad/${idObra}`, actividad)
}

export const SearchActividadRequest = async (idObra, actividad) =>{
    return await axios.put(`https://apismovilconstru-production-be9a.up.railway.app/searchActividad/${idObra}`, actividad)
}