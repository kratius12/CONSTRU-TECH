import { useContext, useState } from "react";
import { CreateCategoriaRequest,
        GetCategoriaRequest,
        UpdateCategoriaRequest,
        GetCategoriasRequest,
        DeleteCategoriaRequest,
        ToggleCategoriaStatusRequest
} from "../../api/Categorias.api";
import { CategoriaContext } from "./CategoriasContext";


export const useCategorias = () => {
    const context = useContext(CategoriaContext)
    if (!context) {
        throw new Error("UseCategorias debe estar en contexto con CategoriaContext Provider")
    }   
    return context
}


export const CategoriaContextProvider = ({children}) => {

    const [categorias, setCategorias] = useState([])

    async function Categorias() {
        const response = await GetCategoriasRequest()
        console.log(response.data)  
        setCategorias(response.data)          
    }

    const createCategoria = async (categoria) => {
        try {
            const response = await CreateCategoriaRequest(categoria)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    const getCategoria = async (idcat) =>{
        try {
            const result = await GetCategoriaRequest(idcat)
            return result.data
        } catch (error) {
            console.error(error)
        }
    }

    const deleteCategoria = async (idcat) => {
        try {
            const response = await DeleteCategoriaRequest(idcat)
            setCategorias(categorias.filter(categoria => categoria.idcat !== idcat))
            console.log(response);
        } catch (error) {
            console.error(error)
        }
    }

    const updateCategoria = async (idcat, newfields) =>{
        try {
            const response = await UpdateCategoriaRequest(idcat, newfields)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

     const toggleCategoriaStatus = async (idcat,estado) =>{
        try {
            if (estado == 1) {
                estado = 0
            } else {
                estado = 1
            }
            await ToggleCategoriaStatusRequest(idcat, { estado })
            
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <CategoriaContext.Provider value={{categorias, Categorias, deleteCategoria, createCategoria, getCategoria, updateCategoria, toggleCategoriaStatus}}>
            {children}
        </CategoriaContext.Provider>
    )
}

