import axios from "axios";

export const GetEspecialidadesRequest = async () =>{
    return await axios.get('https://apismovilconstru-production-be9a.up.railway.app/especialidades')
}

export const CreateEspecialidadRequest = async (especialidad) => {
    return await axios.post('https://apismovilconstru-production-be9a.up.railway.app/especialidades', especialidad)
}

export const DeleteEspecialidadRequest = async (id) =>{
    return await axios.delete(`https://apismovilconstru-production-be9a.up.railway.app/especialidad/${id}`)
}

export const GetEspecialidadRequest = async (id) => {
    return await axios.get(`https://apismovilconstru-production-be9a.up.railway.app/especialidad/${id}`)
}

export const UpdateEspecialidadRequest = async (id, newFields) =>{
    return await axios.put(`https://apismovilconstru-production-be9a.up.railway.app/especialidad/${id}`, newFields)
}

export const ToggleEspecialidadStatusRequest = async (id, status) =>{
    return await axios.put(`https://apismovilconstru-production-be9a.up.railway.app/especialidadStatus/${id}`, status)
}