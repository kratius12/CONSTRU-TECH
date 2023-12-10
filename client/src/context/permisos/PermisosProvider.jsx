import { useContext, useState } from "react";
import { CreatePermisoRequest,
        GetPermisoRequest,
        GetPermisosRequest,
        DeletePermisoRequest,
        UpdatePermisoRequest,
        TogglePermisoStatusRequest
} from "../../api/Permisos.api";
import { PermisosContext } from "./PermisosContext";


export const usePermiso = () => {
    const context = useContext(PermisosContext)
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

    const getPermiso = async (idPer) =>{
        try {
            const result = await GetPermisoRequest(idPer)
            return result.data
        } catch (error) {
            console.error(error)
        }
    }

    const deletePermiso = async (idPer) => {
        try {
            const response = await DeletePermisoRequest(idPer)
            setPermisos(permisos.filter(permiso => permiso.idPer !== idPer))
            console.log(response);
        } catch (error) {
            console.error(error)
        }
    }

    const updatePermiso = async (idPer, newfields) =>{
        try {
            const response = await UpdatePermisoRequest(idPer, newfields)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

     const togglePermisoStatus = async (idPer) =>{
        try {
            const permisoFound = permisos.find((permiso) => permiso.idPer === idPer)
            let status  = ''
            if (permisoFound.estado === 1) {
                status = 0
            }else{
                status = 1
            }
            await TogglePermisoStatusRequest(idPer, status)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <PermisosContext.Provider value={{permisos, Permisos, createPermiso, getPermiso, togglePermisoStatus, deletePermiso, updatePermiso}}>
            {children}
        </PermisosContext.Provider>
    )
}