import { useContext, useState } from "react";
import {
    CreateUsuarioRequest,
    GetEmpleadosRequest,
    GetRolesRequest,
    GetUsuarioRequest,
    GetUsuariosRequest,
    ToggleUsuarioStatusRequest,
    UpdateUsuarioRequest
} from '../../api/Usuarios.api'
import { UsuarioContext } from "./UsuariosContext";

export const useUsuarios = ()=>{
    const context = useContext(UsuarioContext)
    if(!context){
        throw new Error("useUsuarios no esta en el usuariosContextProvider")
    }
    return context
}

export const UsuariosContextProvider = ({children})=>{
    
    const [roles, setRoles] = useState([])
    const [empleados,setEmpleados] = useState([])
    const [usuarios,setUsuarios] = useState([])

    async function Usuarios(){
        const response = await GetUsuariosRequest()
        console.log(response.data)
        setUsuarios(response.data)
    }
    const createUsuario = async(usuario)=>{
        try{
            const response = await CreateUsuarioRequest(usuario)
            console.log(response.data)
        }catch(error){
            console.error(error)
        }
    }

    const getUsuario = async(idUsu)=>{
        try{
            const response = await GetUsuarioRequest(idUsu)
            return response.data
        }catch(error){
            console.error(error)
        }
    }

    const updateUsuario = async(idUsu,newfields)=>{
        try{
            const response = await UpdateUsuarioRequest(idUsu,newfields)
            console.log(response.data)
        }catch(error){
            console.error(error)
        }
    }

    async function getRoles(){
        try{
            const response = await GetRolesRequest()
            console.log(response.data)
            setRoles(response.data)
        }catch(error){
            console.error(error)
        }
    }

    async function getEmpleados(){
        try{
            const response = await GetEmpleadosRequest()
            console.log(response.data)
            setEmpleados(response.data)
        }catch(error){
            console.error(error)
        }
    }

    const ToggleUsuarioStatus = async(idUsu,estado)=>{
        try {
            if (estado == 1) {
                estado = 0
            } else {
                estado = 1
            }
            await ToggleUsuarioStatusRequest(idUsu,{estado})
        }catch(error){
            console.error(error)
        }
    }
    return(
        <UsuarioContext.Provider value={{usuarios,Usuarios,getEmpleados,getRoles,createUsuario,updateUsuario,ToggleUsuarioStatus,getUsuario,roles,empleados}}>
            {children}
        </UsuarioContext.Provider> 
    )
}