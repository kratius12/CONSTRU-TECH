import { useContext, useState } from "react";
import { GetDashboardRequest
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
        const response = await GetDashboardRequest()
        setDashboard(response.data)          
    }  



    const getDashboard = async (id) =>{
        try {
            const result = await GetDashboardRequest(id)
            return result.data
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <DashboardContext.Provider value={{dashboard, Dashboard, getDashboard}}>
            {children}
        </DashboardContext.Provider>
    )
}

