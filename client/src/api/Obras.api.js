import axios from "axios";

export const GetObrasRequest = async () =>{
    return await axios.get('http://localhost:4000/obras')
}

export const CreateObraRequest = async (obra) => {
    return await axios.post('http://localhost:4000/obras', obra)
}

export const DeleteObraRequest = async (idObra) =>{
    return await axios.delete(`http://localhost:4000/obra/${idObra}`)
}

export const GetObraRequest = async (idObra) => {
    return await axios.get(`http://localhost:4000/obra/${idObra}`)
}

export const UpdateObraRequest = async (idObra, newFields) =>{
    return await axios.put(`http://localhost:4000/obra/${idObra}`, newFields)
}

export const ToggleObraStatusRequest = async (idObra, status) =>{
    return await axios.put(`http://localhost:4000/obra/${idObra}`, status)
}