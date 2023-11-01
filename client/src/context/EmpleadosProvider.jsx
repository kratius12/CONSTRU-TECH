import { useContext, useState } from "react";
import { CreateEmpleadoRequest,
    GetEmpleadoRequest,
    UpdateEmpleadoRequest,
    DeleteEmpleadoRequest,
    GetEmpleadosRequest,
    ToggleEmpleadoStatusRequest,
    GetEspecialidadesRequest,
    CreateEspecialidadesRequest
} from "../api/Empleados.api";
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
        const response = await GetEmpleadosRequest()
        console.log(response.data)  
        setEmpleados(response.data)          
    }  

    async function Especialidades(){
        const response = await GetEspecialidadesRequest()
        setEspecialidades(response.data)     
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

     const toggleEmpleadoStatus = async (idEmp) =>{
        try {
            const empleadoFound = empleados.find((empleado) => empleado.idEmp === idEmp)
            let status  = ''
            if (empleadoFound.estado === 1) {
                status = 0
            }else{
                status = 1
            }
            await ToggleEmpleadoStatusRequest(idEmp, status)
            // setObras(
            //     obras.map(obra => obra.idObra === idObra ? obra.estado = obra.estado === 0 ? 1 : 0 : obra.estado)
            // )
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <EmpleadoContext.Provider value={{empleados, Empleados, deleteEmpleado, createEmpleado, getEmpleado, updateEmpleado, toggleEmpleadoStatus, especialidades, Especialidades, createEspecialidad}}>
            {children}
        </EmpleadoContext.Provider>
    )
}

