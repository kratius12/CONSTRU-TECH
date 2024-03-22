import axios from "axios";

export const GetMaterialesRequest = async () =>{
    return await axios.get('apismovilconstru.onrender.com/materiales')
}

export const CreateMaterialRequest = async (materiales) => {
    return await axios.post('apismovilconstru.onrender.com/materiales', materiales,{timeout:500})
}

export const DeleteMaterialRequest = async (idMat) =>{
    return await axios.delete(`apismovilconstru.onrender.com/material/${idMat}`)
}

export const GetMaterialRequest = async (idMat) => {
    return await axios.get(`apismovilconstru.onrender.com/material/${idMat}`)
}

export const UpdateMaterialRequest = async (idMat, newFields) =>{
    return await axios.put(`apismovilconstru.onrender.com/material/${idMat}`, newFields,{timeout:5000})
}

export const ToggleMaterialStatusRequest = async (idMat, estado) =>{
    return await axios.put(`apismovilconstru.onrender.com/materialEstado/${idMat}`, estado,{timeout:5000})
}

export const GetProveedoresRequest = async()=>{
    return await axios.get("apismovilconstru.onrender.com/provsAc")
}

export const GetCategoriasRequest = async()=>{
    return await axios.get("apismovilconstru.onrender.com/categoriasAct")
}