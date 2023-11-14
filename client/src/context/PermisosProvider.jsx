import { useContext, useState } from "react";
import { CreatePermisoRequest,
        GetPermisoRequest,
        UpdatePermisoRequest,
        GetPermisosRequest,
        DeletePermisoRequest,
        TogglePermisoStatusRequest
} from "../api/Permisos.api";
import { PermisoContext } from "./PermisosContext";


export const usePermiso = () => {
    const context = useContext(PermisoContext)
    if (!context) {
        throw new Error("UsePermisos debe estar en contexto con PermisosContext Provider")
    }   
    return context
}


export const PermisoContextProvider = ({children}) => {

    const [permisos, setPermisos] = useState([])

    async function Permisos() {
        const response = await GetPermisosRequest()
        console.log(response.data)  
        setPermisos(response.data)          
    }

    const createPermiso = async (permiso) => {
        try {
            const response = await CreatePermisoRequest(permiso)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    const getRol = async (idPer) =>{
        try {
            const result = await GetPermisoRequest(idPer)
            return result.data
        } catch (error) {
            console.error(error)
        }
    }

    const deleteRol = async (idPer) => {
        try {
            const response = await DeleteRolRequest(idPer)
            setRoles(roles.filter(permiso => permiso.idPer !== idPer))
            console.log(response);
        } catch (error) {
            console.error(error)
        }
    }

    const updateRol = async (idPer, newfields) =>{
        try {
            const response = await UpdateRolRequest(idPer, newfields)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

     const toggleRolStatus = async (idPer) =>{
        try {
            const rolFound = roles.find((permiso) => permiso.idPer === idPer)
            let status  = ''
            if (rolFound.estado === 1) {
                status = 0
            }else{
                status = 1
            }
            await ToggleRolStatusRequest(idPer, status)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <PermisosContext.Provider value={{roles, Roles, deleteRol, createRol, getRol, updateRol, toggleRolStatus}}>
            {children}
        </PermisosContext.Provider>
    )
}