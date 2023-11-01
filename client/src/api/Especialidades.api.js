import axios from "axios";

export const GetEspecialidadesRequest = async () =>{
    return await axios.get('http://localhost:4000/especialidades')
}

export const CreateEspecialidadRequest = async (especialidad) => {
    return await axios.post('http://localhost:4000/especialidades', especialidad)
}

export const DeleteEspecialidadRequest = async (id) =>{
    return await axios.delete(`http://localhost:4000/especialidad/${id}`)
}

export const GetEspecialidadRequest = async (id) => {
    return await axios.get(`http://localhost:4000/especialidad/${id}`)
}

export const UpdateEspecialidadRequest = async (id, newFields) =>{
    return await axios.put(`http://localhost:4000/especialidad/${id}`, newFields)
}

export const ToggleEspecialidadStatusRequest = async (id, status) =>{
    return await axios.put(`http://localhost:4000/especialidad/${id}`, status)
}