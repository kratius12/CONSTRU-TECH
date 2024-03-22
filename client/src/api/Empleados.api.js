import axios from "axios";

export const GetEmpleadosRequest = async () =>{
    return await axios.get('https://apismovilconstru.onrender.com/empleados')
}

export const GetEmpleadosEspecialidadesRequest = async () =>{
    return await axios.get('https://apismovilconstru.onrender.com/empleadosEsp')
}

export const GetEspecialidadesRequest = async () =>{
    return await axios.get('https://apismovilconstru.onrender.com/especialidades')
}

export const CreateEspecialidadesRequest = async (especialidad) =>{
    return await axios.post('https://apismovilconstru.onrender.com/especialidades', especialidad)
}

export const CreateEmpleadoRequest = async (empleado) => {
    return await axios.post('https://apismovilconstru.onrender.com/empleados', empleado)
}

export const DeleteEmpleadoRequest = async (idEmp) =>{
    return await axios.delete(`https://apismovilconstru.onrender.com/empleado/${idEmp}`)
}

export const GetEmpleadoRequest = async (idEmp) => {
    return await axios.get(`https://apismovilconstru.onrender.com/empleado/${idEmp}`)
}

export const UpdateEmpleadoRequest = async (idEmp, newFields) =>{
    return await axios.put(`https://apismovilconstru.onrender.com/empleado/${idEmp}`, newFields)
}

export const ToggleEmpleadoStatusRequest = async (idEmp, status) =>{
    return await axios.put(`https://apismovilconstru.onrender.com/empleadoStatus/${idEmp}`, status)
}

export const SearchDocRequest = async (fields) =>{
    return await axios.put(`https://apismovilconstru.onrender.com/empleados/searchDoc`, fields)
}
export const SearchDocRequestid = async (idEmp,fields) =>{
    return await axios.put(`https://apismovilconstru.onrender.com/empleados/searchDoc/${idEmp}`, fields)
}

export const SearchEmailRequest = async (fields)=>{
    return await axios.put(`https://apismovilconstru.onrender.com/empleados/searchEmail`,fields)
}
export const SearchEmailIdRequest = async (idEmp,fields)=>{
    return await axios.put(`https://apismovilconstru.onrender.com/empleados/searchEmail/${idEmp}`,fields)
}