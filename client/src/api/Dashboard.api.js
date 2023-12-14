import axios from "axios";

export const GetDashboardClientesRequest = async () =>{
    return await axios.get('http://localhost:4000/dashboard/clientes')
}

export const GetDashboardObrasRequest = async () =>{
    return await axios.get('http://localhost:4000/dashboard/obras')
}

export const GetDashboardClienteObrasRequest = async () =>{
    return await axios.get('http://localhost:4000/dashboard/clienteObras')
}

export const GetDashboardEspecialidadesRequest = async () =>{
    return await axios.get('http://localhost:4000/dashboard/especialidades')
}

export const GetDashboardEmpleadosCountRequest = async () =>{
    return await axios.get('http://localhost:4000/dashboard/empleadosCount')
}