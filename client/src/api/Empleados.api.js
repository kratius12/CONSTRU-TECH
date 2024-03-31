import axios from "axios";

export const GetEmpleadosRequest = async () =>{
    return await axios.get('https://apismovilconstru-production-be9a.up.railway.app/empleados')
}

export const GetEmpleadosEspecialidadesRequest = async () =>{
    return await axios.get('https://apismovilconstru-production-be9a.up.railway.app/empleadosEsp')
}

export const GetEspecialidadesRequest = async () =>{
    return await axios.get('https://apismovilconstru-production-be9a.up.railway.app/especialidades')
}

export const CreateEspecialidadesRequest = async (especialidad) =>{
    return await axios.post('https://apismovilconstru-production-be9a.up.railway.app/especialidades', especialidad)
}

export const CreateEmpleadoRequest = async (empleado) => {
    return await axios.post('https://apismovilconstru-production-be9a.up.railway.app/empleados', empleado)
}

export const DeleteEmpleadoRequest = async (idEmp) =>{
    return await axios.delete(`https://apismovilconstru-production-be9a.up.railway.app/empleado/${idEmp}`)
}

export const GetEmpleadoRequest = async (idEmp) => {
    return await axios.get(`https://apismovilconstru-production-be9a.up.railway.app/empleado/${idEmp}`)
}

export const UpdateEmpleadoRequest = async (idEmp, newFields) =>{
    return await axios.put(`https://apismovilconstru-production-be9a.up.railway.app/empleado/${idEmp}`, newFields)
}

export const ToggleEmpleadoStatusRequest = async (idEmp, status) =>{
    return await axios.put(`https://apismovilconstru-production-be9a.up.railway.app/empleadoStatus/${idEmp}`, status)
}

export const SearchDocRequest = async (fields) =>{
    return await axios.put(`https://apismovilconstru-production-be9a.up.railway.app/empleados/searchDoc`, fields)
}
export const SearchDocRequestid = async (idEmp,fields) =>{
    return await axios.put(`https://apismovilconstru-production-be9a.up.railway.app/empleados/searchDoc/${idEmp}`, fields)
}

export const SearchEmailRequest = async (fields)=>{
    return await axios.put(`https://apismovilconstru-production-be9a.up.railway.app/empleados/searchEmail`,fields)
}
export const SearchEmailIdRequest = async (idEmp,fields)=>{
    return await axios.put(`https://apismovilconstru-production-be9a.up.railway.app/empleados/searchEmail/${idEmp}`,fields)
}