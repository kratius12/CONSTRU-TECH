import { useContext, useState } from "react";
import { 
    GetMaterialesRequest,
    GetMaterialRequest,
    CreateMaterialRequest,
    DeleteMaterialRequest,
    UpdateMaterialRequest,
    GetProveedoresRequest,
    GetCategoriasRequest,

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
        console.log(response.data)  
        setMateriales(response.data)          
    }  

    const createMaterial = async (material) => {
        try {
            const response = await CreateMaterialRequest(material)
            console.log(response)
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
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    const updateMaterial = async (idMat, newfields) =>{
        try {
            const response = await UpdateMaterialRequest(idMat, newfields)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    async function getProveedores(){
        try{
            const response = await GetProveedoresRequest()
            console.log(response.data)
            setProveedores(response.data)
        }catch(error){
            console.error(error)
        }
    }

    async function getCategorias(){
        try{
            const response = await GetCategoriasRequest()
            console.log(response.data)
            setCategorias(response.data)
        }catch(error){
            console.error(error)
        }
    }



    //  const toggleObraStatus = async (idObra) =>{
    //     try {
    //         const obraFound = obras.find((obra) => obra.idObra === idObra)
    //         let status  = ''
    //         if (obraFound.estado === 1) {
    //             status = 0
    //         }else{
    //             status = 1
    //         }
    //         await ToggleObraStatusRequest(idObra, status)
    //         // setObras(
    //         //     obras.map(obra => obra.idObra === idObra ? obra.estado = obra.estado === 0 ? 1 : 0 : obra.estado)
    //         // )
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }
    return (
        <MaterialContext.Provider value={{materiales, Materiales, deleteMaterial, createMaterial, getMaterial, updateMaterial,getCategorias,getProveedores,proveedores,categorias,setProveedores,setCategorias}}>
            {children}
        </MaterialContext.Provider>
    )
}

