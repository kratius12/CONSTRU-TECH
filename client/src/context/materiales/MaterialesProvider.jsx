import { useContext, useState } from "react";
import { 
    GetMaterialesRequest,
    GetMaterialRequest,
    CreateMaterialRequest,
    DeleteMaterialRequest,
    UpdateMaterialRequest,
    GetProveedoresRequest,
    GetCategoriasRequest,
    ToggleMaterialStatusRequest,

} from "../../api/Materiales.api";
import { MaterialContext } from "./MaterialesContext";


export const useMateriales = () => {
    const context = useContext(MaterialContext)
    if (!context) {
        throw new Error("Usebras debe estar en contexto con ObraContext Provider")
    }   
    return context
}


export const MaterialContextProvider = ({children}) => {


    const [proveedores,setProveedores] = useState([])
    const [categorias,setCategorias] = useState([])
    const [materiales, setMateriales] = useState([])
    async function Materiales() {
        const response = await GetMaterialesRequest()
        setMateriales(response.data)          
    }  

    const createMaterial = async (material) => {
        try {
            const response = await CreateMaterialRequest(material)
        } catch (error) {
            console.error(error)
        }
    }

    const getMaterial = async (idMat) =>{
        try {
            const result = await GetMaterialRequest(idMat)
            return result.data
        } catch (error) {
            console.error(error)
        }
    }


    const deleteMaterial = async (idMat) => {
        try {
            const response = await DeleteMaterialRequest(idMat)
            setMateriales(materiales.filter(material => material.idMat !== idMat))
        } catch (error) {
            console.error(error)
        }
    }

    const updateMaterial = async (idMat, newfields) =>{
        try {
            const response = await UpdateMaterialRequest(idMat, newfields)
        } catch (error) {
            console.error(error)
        }
    }

    async function getProveedores(){
        try{
            const response = await GetProveedoresRequest()
            setProveedores(response.data)
        }catch(error){
            console.error(error)
        }
    }

    async function getCategorias(){
        try{
            const response = await GetCategoriasRequest()
            setCategorias(response.data)
        }catch(error){
            console.error(error)
        }
    }
    const toggleMaterialEstado = async (idProv, estado) => {
        try {
            if (estado == 1) {
                estado = 0
            } else {
                estado = 1
            }
            return await ToggleMaterialStatusRequest(idProv, { estado })
            
        } catch (error) {
            console.error(error)
        }
    }



    
    return (
        <MaterialContext.Provider value={{materiales, Materiales, deleteMaterial, createMaterial, getMaterial, updateMaterial,getCategorias,getProveedores,proveedores,categorias,setProveedores,setCategorias,toggleMaterialEstado}}>
            {children}
        </MaterialContext.Provider>
    )
}

