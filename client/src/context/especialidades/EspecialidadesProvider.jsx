import { useContext, useState } from "react";
import { CreateEspecialidadRequest,
    GetEspecialidadRequest,
    UpdateEspecialidadRequest,
    DeleteEspecialidadRequest,
    GetEspecialidadesRequest,
    ToggleEspecialidadStatusRequest
} from "../../api/Especialidades.api";
import { EspecialidadContext } from "./EspecialidadesContext";


export const useEspecialidades = () => {
    const context = useContext(EspecialidadContext)
    if (!context) {
        throw new Error("UseEspecialidades debe estar en contexto con EspecialidadContext Provider")
    }   
    return context
}


export const EspecialidadContextProvider = ({children}) => {

    const [especialidades, setEspecialidades] = useState([])

    async function Especialidades() {
        const response = await GetEspecialidadesRequest()
        console.log(response.data)  
        setEspecialidades(response.data)          
    }  

    const createEspecialidad = async (especialidad) => {
        try {
            const response = await CreateEspecialidadRequest(especialidad)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    const getEspecialidad = async (id) =>{
        try {
            const result = await GetEspecialidadRequest(id)
            return result.data
        } catch (error) {
            console.error(error)
        }
    }

    const deleteEspecialidad = async (id) => {
        try {
            const response = await DeleteEspecialidadRequest(id)
            setEspecialidades(especialidades.filter(especialidad => especialidad.id !== id))
        } catch (error) {
            console.error(error)
        }
    }

    const updateEspecialidad = async (id, newfields) =>{
        try {
            const response = await UpdateEspecialidadRequest(id, newfields)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

     const toggleEspecialidadStatus = async (id) =>{
        try {
            const especialidadFound = especialidades.find((especialidad) => especialidad.id === id)
            let status  = ''
            if (especialidadFound.estado === 1) {
                status = 0
            }else{
                status = 1
            }
            await ToggleEspecialidadStatusRequest(id, status)

        } catch (error) {
            console.error(error)
        }
    }
    return (
        <EspecialidadContext.Provider value={{especialidades, Especialidades, deleteEspecialidad, createEspecialidad, getEspecialidad, updateEspecialidad, toggleEspecialidadStatus}}>
            {children}
        </EspecialidadContext.Provider>
    )
}

