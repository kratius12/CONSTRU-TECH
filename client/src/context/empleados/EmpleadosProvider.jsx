import { useContext, useState } from "react";
import { CreateEmpleadoRequest,
    GetEmpleadoRequest,
    UpdateEmpleadoRequest,
    DeleteEmpleadoRequest,
    GetEmpleadosRequest,
    GetEmpleadosEspecialidadesRequest,
    ToggleEmpleadoStatusRequest,
    GetEspecialidadesRequest,
    CreateEspecialidadesRequest,
    SearchDocRequest,
    SearchEmailRequest
} from "../../api/Empleados.api";
import { EmpleadoContext } from "./EmpleadosContext";


export const useEmpleados = () => {
    const context = useContext(EmpleadoContext)
    if (!context) {
        throw new Error("UseEmpleados debe estar en contexto con EmpleadoContext Provider")
    }   
    return context
}


export const EmpleadoContextProvider = ({children}) => {

    const [empleados, setEmpleados] = useState([])
    const [especialidades, setEspecialidades] = useState([])
    async function Empleados() {
        const response = await GetEmpleadosEspecialidadesRequest()
        // console.log(response.data)  
        setEmpleados(response.data)          
    }  

    async function Especialidades(){
        const response = await GetEspecialidadesRequest()
        setEspecialidades(response.data) 
        return response.data    
    }

    const createEmpleado = async (empleado) => {
        try {
            const response = await CreateEmpleadoRequest(empleado)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    const createEspecialidad = async (especialidad) => {
        try {
            const response = await CreateEspecialidadesRequest(especialidad)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    const getEmpleado = async (idEmp) =>{
        try {
            const result = await GetEmpleadoRequest(idEmp)
            return result.data
        } catch (error) {
            console.error(error)
        }
    }

    const deleteEmpleado = async (idEmp) => {
        try {
            const response = await DeleteEmpleadoRequest(idEmp)
            setEmpleados(empleados.filter(empleado => empleado.idEmp !== idEmp))
            console.log(response);
        } catch (error) {
            console.error(error)
        }
    }

    const updateEmpleado = async (idEmp, newfields) =>{
        try {
            const response = await UpdateEmpleadoRequest(idEmp, newfields)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

     const toggleEmpleadoStatus = async (idEmp, status) =>{
        try {
            // const empleadoFound = empleados.find((empleado) => empleado.idEmp === idEmp)
            if (status == 1) {
                status = 0
            }else{
                status = 1
            }
            return await ToggleEmpleadoStatusRequest(idEmp, {status})
        } catch (error) {
            console.error(error)
        }
    }

    const searchDoc = async (empleado) => {
        try {
            const response = await SearchDocRequest(empleado)
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
    const searchDocid = async (idEmp,empleado) => {
        try {
            const response = await SearchDocRequest(idEmp,empleado)
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
    const searchEmail = async (empleado) => {
        try {
            const response = await SearchEmailRequest(empleado)
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
    const searchEmailid = async (idEmp,empleado) => {
        try {
            const response = await SearchEmailRequest(idEmp,empleado)
            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <EmpleadoContext.Provider value={{empleados, Empleados, deleteEmpleado, createEmpleado, getEmpleado, updateEmpleado, toggleEmpleadoStatus, especialidades, Especialidades, createEspecialidad, searchDoc, searchEmail,searchDocid,searchEmailid}}>
            {children}
        </EmpleadoContext.Provider>
    )
}

