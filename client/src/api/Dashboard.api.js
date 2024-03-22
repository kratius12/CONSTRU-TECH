import axios from "axios";

export const GetDashboardClientesRequest = async () =>{
    return await axios.get('https://apismovilconstru.onrender.com/dashboard/clientes')
}

export const GetDashboardObrasRequest = async () =>{
    return await axios.get('https://apismovilconstru.onrender.com/dashboard/obras')
}

export const GetDashboardClienteObrasRequest = async () =>{
    return await axios.get('https://apismovilconstru.onrender.com/dashboard/clienteObras')
}

export const GetDashboardEspecialidadesRequest = async () =>{
    return await axios.get('https://apismovilconstru.onrender.com/dashboard/especialidades')
}

export const GetDashboardEmpleadosCountRequest = async () =>{

    return await axios.get('https://apismovilconstru.onrender.com/dashboard/empleadosCount')
}

export const GetTotalComprasRequest = async () =>{
    return await axios.get('https://apismovilconstru.onrender.com/dashboard/totalCompras')
}

export const GetObrasEstadosRequest = async () =>{
    return await axios.get('https://apismovilconstru.onrender.com/dashboard/obrasEstados')
}