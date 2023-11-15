import { useContext, useState } from "react";
import {
    CreateProveedorRequest,
    DeleteProveedorRequest,
    GetProveedorRequest,
    GetProveedoresRequest,
    UpdateProveedorRequest,ToggleProveedorStatusRequest

} from "../../api/Proveedores.api";
import { ProveedorContext } from "./ProveedorContext";




export const useProveedores = () => {
    const context = useContext(ProveedorContext)
    if (!context) {
        throw new Error("UseEmpleados debe estar en contexto con EmpleadoContext Provider")
    }   
    return context
}


export const ProveedorContextProvider = ({children}) => {

    const [proveedores, setProveedores] = useState([])

    async function Proveedores() {
        const response = await GetProveedoresRequest()
        setProveedores(response.data)          
    }  

    const createProveedor = async (proveedor) => {
        try {
            const response = await CreateProveedorRequest(proveedor)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    const getProveedor = async (idProv) =>{
        try {
            const result = await GetProveedorRequest(idProv)
            return result.data
        } catch (error) {
            console.error(error)
        }
    }

    const deleteProveedor = async (idProv) => {
        try {
            const response = await DeleteProveedorRequest(idProv)
            setProveedores(proveedores.filter(proveedor => proveedor.idProv !== idProv))
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    const updateProveedor = async (idProv, newfields) =>{
        try {
            const response = await UpdateProveedorRequest(idProv, newfields)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }
    const toggleStado = async(idProv,newEstado)=>{
        try{
            const response = await ToggleProveedorStatusRequest(idProv,newEstado)
            console.log(response)
        }catch(error){
            console.error(error)
        }
    }

    return (
        <ProveedorContext.Provider value={{proveedores, Proveedores, deleteProveedor,toggleStado, createProveedor, getProveedor, updateProveedor}}>
            {children}
        </ProveedorContext.Provider>
    )
}

