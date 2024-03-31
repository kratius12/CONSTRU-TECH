
import axios from "axios";

export const getClientsRequest = async () =>
    await axios.get("https://apismovilconstru-production-be9a.up.railway.app/clientes");

export const createClientRequest = async (client) =>
    await axios.post('https://apismovilconstru-production-be9a.up.railway.app/cliente', client);

export const deleteClientRequest = async (id) =>
    await axios.delete(`https://apismovilconstru-production-be9a.up.railway.app/cliente/${id}`)

export const getClientRequest = async (id) =>
    await axios.get(`https://apismovilconstru-production-be9a.up.railway.app/cliente/${id}`)

export const updateClientRequest = async (id, newFields) => {
    await axios.put(`https://apismovilconstru-production-be9a.up.railway.app/cliente/${id}`, newFields);
}
export const ToggleClientStatusRequest = async (idCli, status) => {
    return await axios.put(`https://apismovilconstru-production-be9a.up.railway.app/clientStatus/${idCli}`, status)
}