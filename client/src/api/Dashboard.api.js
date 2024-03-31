import axios from "axios";

export const GetDashboardClientesRequest = async () =>{
    return await axios.get('https://apismovilconstru-production-be9a.up.railway.app/dashboard/clientes')
}

export const GetDashboardObrasRequest = async () =>{
    return await axios.get('https://apismovilconstru-production-be9a.up.railway.app/dashboard/obras')
}

export const GetDashboardClienteObrasRequest = async () =>{
    return await axios.get('https://apismovilconstru-production-be9a.up.railway.app/dashboard/clienteObras')
}

export const GetDashboardEspecialidadesRequest = async () =>{
    return await axios.get('https://apismovilconstru-production-be9a.up.railway.app/dashboard/especialidades')
}

export const GetDashboardEmpleadosCountRequest = async () =>{

    return await axios.get('https://apismovilconstru-production-be9a.up.railway.app/dashboard/empleadosCount')
}

export const GetTotalComprasRequest = async () =>{
    return await axios.get('https://apismovilconstru-production-be9a.up.railway.app/dashboard/totalCompras')
}

export const GetObrasEstadosRequest = async () =>{
    return await axios.get('https://apismovilconstru-production-be9a.up.railway.app/dashboard/obrasEstados')
}