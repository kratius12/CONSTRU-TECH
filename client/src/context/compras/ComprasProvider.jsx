import { useContext, useState } from "react";
import {
    CreateCompraRequest,
    DeleteCompraRequest,
    GetCompraRequest,
    GetComprasRequest,
    UpdateCompraRequest,
    DetalleCompraRequest,
    GetDetalleReques
} from '../../api/Compras.api'
import { ComprasContext } from './ComprasContext'

export const useCompras = () => {
    const context = useContext(ComprasContext)
    if (!context) {
        throw new Error('useCompras must be used within a ComprasProvider')
    }
    return context;
}
export const CompraContextProvider = ({ children }) => {
    const [compras, setCompras] = useState([])

    async function Compras() {
        const response = await GetComprasRequest()
        console.log(response.data)
        setCompras(response.data)
    }

    const createCompra = async (compra) => {
        try {
            const response = await CreateCompraRequest(compra)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }
    const getCompra = async (idCom) => {
        try {
            const response = await GetCompraRequest(idCom)
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
    const deleteCompra = async (idCom) => {
        try {
            const result = await DeleteCompraRequest(idCom)
            console.log(result);
        } catch (error) {
            console.log(error)
        }
    }
    const updateCompra = async (idCom, newFields) => {
        try {
            const response = await UpdateCompraRequest(idCom, newFields)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }
    const createDetalle = async(detalle)=>{
        try{
            const response = await DetalleCompraRequest(detalle)
            console.log(response)
        }catch(error){
            console.error(error)
        }
    }
    const getDetalle = async(idCom)=>{
        try{
            const response = await GetDetalleReques(idCom)
            console.log(response)
        }catch(error){
            console.error(error)
        }
    }
    return (
        <ComprasContext.Provider value={{ compras, Compras, deleteCompra, createCompra, updateCompra, getCompra,createDetalle,getDetalle }}
        >
            {children}
        </ComprasContext.Provider>
    )
}
