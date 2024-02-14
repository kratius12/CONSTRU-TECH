import { useContext, useState } from "react";
import { GetObrasRequest, 
    CreateObraRequest, 
    GetObraRequest, 
    DeleteObraRequest, 
    UpdateObraRequest, 
    ToggleObraStatusRequest,
    GetActividadesRequest,
    CreateActividadRequest,
    SearchActividadRequest
} from "../../api/Obras.api";
import {getClientsRequest} from "../../api/Clientes.api";
import {GetEmpleadosRequest} from "../../api/Empleados.api";
import {GetMaterialesRequest} from "../../api/Materiales.api"
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
    const [clientes, setClientes] = useState([])
    const [empleados, setEmpleados] = useState([])
    const [materiales, setMateriales] = useState([])
    async function Obras() {
        const response = await GetObrasRequest()
        setObras(response.data)          
    }  

    async function Clientes(){
        const response = await getClientsRequest()
        setClientes(response.data)
        return response.data
    }
    async function Empleados(){
        const response = await GetEmpleadosRequest()
        setEmpleados(response.data)
        return response.data
    }
    async function Materiales(){
        const response = await GetMaterialesRequest()
        setMateriales(response.data)
        return response.data
    }
    const createObra = async (obra) => {
        try {
            const response = await CreateObraRequest(obra)
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

    const getActividades = async (idObra)=>{
        try {
            const result = await GetActividadesRequest(idObra)
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

    const createActividad = async(idObra,actividad)=>{
        try {
            const response = await CreateActividadRequest(idObra,actividad)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }
    const searchAct = async (idObra, actividad)=>{
        try {
            const response = await SearchActividadRequest(idObra, actividad)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }
  
    return (
        <ObraContext.Provider value={{obras, Obras, clientes, Clientes, empleados, Empleados, materiales, Materiales, deleteObra, createObra, getObra, updateObra, toggleObraStatus, getActividades, createActividad, searchAct}}>
            {children}
        </ObraContext.Provider>
    )
}

