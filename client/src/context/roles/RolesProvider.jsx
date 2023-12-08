import { useContext, useState } from "react";
import { CreateRolRequest,
        GetRolRequest,
        UpdateRolRequest,
        GetRolesRequest,
        DeleteRolRequest,
        ToggleRolStatusRequest
} from "../../api/Roles.api";
import{ GetPermisosRequest } from "../../api/Permisos.api"
import { RolesContext } from "./RolesContext";


export const useRol = () => {
    const context = useContext(RolesContext)
    if (!context) {
        throw new Error("UseRoles debe estar en contexto con RolesContext Provider")
    }   
    return context
}


export const RolContextProvider = ({children}) => {

    const [roles, setRoles] = useState([])
    const[permisos, setPermisos] = useState([])

    async function Roles() {
        const response = await GetRolesRequest()
        console.log(response.data)  
        setRoles(response.data)          
    }

    async function Permisos() {
        const response = await GetPermisosRequest()
        console.log(response.data)
        setPermisos(response.data)
    }

    const createRol = async (rol) => {
        try {
            const response = await CreateRolRequest(rol)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    const getRol = async (idRol) =>{
        try {
            const result = await GetRolRequest(idRol)
            return result.data
        } catch (error) {
            console.error(error)
        }
    }

    const deleteRol = async (idRol) => {
        try {
            const response = await DeleteRolRequest(idRol)
            setRoles(roles.filter(rol => rol.idRol !== idRol))
            console.log(response);
        } catch (error) {
            console.error(error)
        }
    }

    const updateRol = async (idRol, newfields) =>{
        try {
            const response = await UpdateRolRequest(idRol, newfields)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

     const toggleRolStatus = async (idRol) =>{
        try {
            const rolFound = roles.find((rol) => rol.idRol === idRol)
            let status  = ''
            if (rolFound.estado === 1) {
                status = 0
            }else{
                status = 1
            }
            await ToggleRolStatusRequest(idRol, status)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <RolesContext.Provider value={{roles, permisos, Permisos, Roles, deleteRol, createRol, getRol, updateRol, toggleRolStatus}}>
            {children}
        </RolesContext.Provider>
    )
}

