import axios from "axios";

export const GetProveedoresRequest = async () =>{
    return await axios.get('http://localhost:4000/provs')
}

export const CreateProveedorRequest = async (proveedor) => {
    return await axios.post('http://localhost:4000/newprov', proveedor)
}

export const DeleteProveedorRequest = async (idProv) =>{
    return await axios.delete(`http://localhost:4000/prov/${idProv}`)
}

export const GetProveedorRequest = async (idProv) => {
    return await axios.get(`http://localhost:4000/prov/${idProv}`)
}

export const UpdateProveedorRequest = async (idProv, newFields) =>{
    return await axios.put(`http://localhost:4000/prov/${idProv}`, newFields)
}
export const ToggleProveedorStatusRequest = async (idProv, status) =>{
    return await axios.put(`http://localhost:4000/material/${idProv}`, status)
}
