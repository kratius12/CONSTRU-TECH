import { useContext, useState } from "react";
import { GetObrasRequest, 
    CreateObraRequest, 
    GetObraRequest, 
    DeleteObraRequest, 
    UpdateObraRequest, 
    ToggleObraStatusRequest
} from "../api/Obras.api";
import { ObraContext } from "./ObrasContext";


export const useObras = () => {
    const context = useContext(ObraContext)
    if (!context) {
        throw new Error("Usebras debe estar en contexto con ObraContext Provider")
    }   
    return context
}


export const ObraContextProvider = ({children}) => {

    const [obras, setObras] = useState([])

    async function Obras() {
        const response = await GetObrasRequest()
        console.log(response.data)  
        setObras(response.data)          
    }  

    const createObra = async (obra) => {
        try {
            const response = await CreateObraRequest(obra)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    const getObra = async (idObra) =>{
        try {
            const result = await GetObraRequest(idObra)
            return result.data
        } catch (error) {
            console.error(error)
        }
    }

    const deleteObra = async (idObra) => {
        try {
            const response = await DeleteObraRequest(idObra)
            setObras(obras.filter(obra => obra.idObra !== idObra))
        } catch (error) {
            console.error(error)
        }
    }

    const updateObra = async (idObra, newfields) =>{
        try {
            const response = await UpdateObraRequest(idObra, newfields)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

     const toggleObraStatus = async (idObra) =>{
        try {
            const obraFound = obras.find((obra) => obra.idObra === idObra)
            let status  = ''
            if (obraFound.estado === 1) {
                status = 0
            }else{
                status = 1
            }
            await ToggleObraStatusRequest(idObra, status)
            // setObras(
            //     obras.map(obra => obra.idObra === idObra ? obra.estado = obra.estado === 0 ? 1 : 0 : obra.estado)
            // )
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <ObraContext.Provider value={{obras, Obras, deleteObra, createObra, getObra, updateObra, toggleObraStatus}}>
            {children}
        </ObraContext.Provider>
    )
}

