import axios from "axios";

export const GetEspecialidadesRequest = async () =>{
    return await axios.get('apismovilconstru.onrender.com/especialidades')
}

export const CreateEspecialidadRequest = async (especialidad) => {
    return await axios.post('apismovilconstru.onrender.com/especialidades', especialidad)
}

export const DeleteEspecialidadRequest = async (id) =>{
    return await axios.delete(`apismovilconstru.onrender.com/especialidad/${id}`)
}

export const GetEspecialidadRequest = async (id) => {
    return await axios.get(`apismovilconstru.onrender.com/especialidad/${id}`)
}

export const UpdateEspecialidadRequest = async (id, newFields) =>{
    return await axios.put(`apismovilconstru.onrender.com/especialidad/${id}`, newFields)
}

export const ToggleEspecialidadStatusRequest = async (id, status) =>{
    return await axios.put(`apismovilconstru.onrender.com/especialidadStatus/${id}`, status)
}