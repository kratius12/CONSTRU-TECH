import axios from "axios";

export const GetMaterialesRequest = async () =>{
    return await axios.get('http://localhost:4000/materiales')
}

export const CreateMaterialRequest = async (materiales) => {
    return await axios.post('http://localhost:4000/materiales', materiales)
}

export const DeleteMaterialRequest = async (idMat) =>{
    return await axios.delete(`http://localhost:4000/material/${idMat}`)
}

export const GetMaterialRequest = async (idMat) => {
    return await axios.get(`http://localhost:4000/material/${idMat}`)
}

export const UpdateMaterialRequest = async (idMat, newFields) =>{
    return await axios.put(`http://localhost:4000/material/${idMat}`, newFields)
}

export const ToggleMaterialStatusRequest = async (idMat, status) =>{
    return await axios.put(`http://localhost:4000/material/${idMat}`, status)
}