import axios from "axios";

export const GetMaterialesRequest = async () =>{
    return await axios.get('https://apismovilconstru-production-be9a.up.railway.app/materiales')
}

export const CreateMaterialRequest = async (materiales) => {
    return await axios.post('https://apismovilconstru-production-be9a.up.railway.app/materiales', materiales,{timeout:500})
}

export const DeleteMaterialRequest = async (idMat) =>{
    return await axios.delete(`https://apismovilconstru-production-be9a.up.railway.app/material/${idMat}`)
}

export const GetMaterialRequest = async (idMat) => {
    return await axios.get(`https://apismovilconstru-production-be9a.up.railway.app/material/${idMat}`)
}

export const UpdateMaterialRequest = async (idMat, newFields) =>{
    return await axios.put(`https://apismovilconstru-production-be9a.up.railway.app/material/${idMat}`, newFields,{timeout:5000})
}

export const ToggleMaterialStatusRequest = async (idMat, estado) =>{
    return await axios.put(`https://apismovilconstru-production-be9a.up.railway.app/materialEstado/${idMat}`, estado,{timeout:5000})
}

export const GetProveedoresRequest = async()=>{
    return await axios.get("https://apismovilconstru-production-be9a.up.railway.app/provsAc")
}

export const GetCategoriasRequest = async()=>{
    return await axios.get("https://apismovilconstru-production-be9a.up.railway.app/categoriasAct")
}