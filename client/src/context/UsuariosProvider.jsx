import { useContext, useState } from "react";
import { CreateUsuarioRequest,
        GetUsuarioRequest,
        UpdateUsuarioRequest,
        GetUsuariosRequest,
        DeleteUsuarioRequest,
        ToggleUsuarioStatusRequest
} from "../api/Usuarios.api";
import { UsuarioContext } from "./UsuariosContext";


export const useUsuario = () => {
    const context = useContext(UsuarioContext)
    if (!context) {
        throw new Error("UseUsuarios debe estar en contexto con UsuariosContextProvider")
    }   
    return context
}


export const UsuarioContextProvider = ({children}) => {

    const [usuarios, setUsuarios] = useState([])

    async function Usuarios() {
        const response = await GetUsuariosRequest()
        console.log(response.data)  
        setUsuarios(response.data)          
    }

    const createUsuario = async (usuario) => {
        try {
            const response = await CreateUsuarioRequest(usuario)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    const getUsuario = async (idUsu) =>{
        try {
            const result = await GetUsuarioRequest(idUsu)
            return result.data
        } catch (error) {
            console.error(error)
        }
    }

    const deleteUsuario = async (idUsu) => {
        try {
            const response = await DeleteUsuarioRequest(idUsu)
            setUsuarios(usuarios.filter(usuario => usuario.idUsu !== idUsu))
            console.log(response);
        } catch (error) {
            console.error(error)
        }
    }

    const updateUsuario = async (idUsu, newfields) =>{
        try {
            const response = await UpdateUsuarioRequest(idUsu, newfields)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

     const toggleUsuarioStatus = async (idUsu) =>{
        try {
            const usuarioFound = usuarios.find((usuario) => usuario.idUsu === idUsu)
            let status  = ''
            if (usuarioFound.estado === 1) {
                status = 0
            }else{
                status = 1
            }
            await ToggleUsuarioStatusRequest(idUsu, status)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <UsuarioContext.Provider value={{usuarios, Usuarios, deleteUsuario, createUsuario, getUsuario, updateUsuario, toggleUsuarioStatus}}>
            {children}
        </UsuarioContext.Provider>
    )
}