import { useContext, useState } from "react";
import { GetDashboardClienteObrasRequest,
         GetDashboardClientesRequest,
         GetDashboardEspecialidadesRequest,
         GetDashboardObrasRequest,
         GetDashboardEmpleadosCountRequest,
         GetTotalComprasRequest,
         GetObrasEstadosRequest
} from "../../api/Dashboard.api";
import { DashboardContext } from "./DashboardContext";


export const useDashboard = () => {
    const context = useContext(DashboardContext)
    if (!context) {
        throw new Error("UseDashboard debe estar en contexto con DashboardContext Provider")
    }   
    return context
}


export const DashboardContextProvider = ({children}) => {

    const [dashboard, setDashboard] = useState([])

    async function Dashboard() {
        const response = await GetDashboardClientesRequest()
        setDashboard(response.data)          
    }  



    const getDashboardClientes = async (id) =>{
        try {
            const result = await GetDashboardClientesRequest(id)
            return result.data
        } catch (error) {
            console.error(error)
        }
    }

    const getDashboardObras = async (id) =>{
        try {
            const result = await GetDashboardObrasRequest(id)
            return result.data
        } catch (error) {
            console.error(error)
        }
    }

    const getDashboardClienteObras = async (id) =>{
        try {
            const result = await GetDashboardClienteObrasRequest(id)
            return result.data
        } catch (error) {
            console.error(error)
        }
    }

    const getDashboardEspecialidades = async (id) =>{
        try {
            const result = await GetDashboardEspecialidadesRequest(id)
            return result.data
        } catch (error) {
            console.error(error)
        }
    }

    const getDashboardEmpleadosCount = async (id) =>{
        try {
            const result = await GetDashboardEmpleadosCountRequest(id)
            return result.data
        } catch (error) {
            console.error(error)
        }
    }

    const getTotalCompras = async () =>{
        try {
            const result = await GetTotalComprasRequest()
            return result.data
        } catch (error) {
            console.error(error);
        }
    }

    const getObrasEstados = async () =>{
        try {
            const result = await GetObrasEstadosRequest()
            return result.data
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <DashboardContext.Provider value={{dashboard, Dashboard, getDashboardClientes, getDashboardObras, getDashboardClienteObras, getDashboardEspecialidades, getDashboardEmpleadosCount, getTotalCompras, getObrasEstados}}>
            {children}
        </DashboardContext.Provider>
    )
}

