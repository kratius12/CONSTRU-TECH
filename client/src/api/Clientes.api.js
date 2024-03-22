
import axios from "axios";

export const getClientsRequest = async () =>
    await axios.get("https://apismovilconstru.onrender.com/clientes");

export const createClientRequest = async (client) =>
    await axios.post('https://apismovilconstru.onrender.com/cliente', client);

export const deleteClientRequest = async (id) =>
    await axios.delete(`https://apismovilconstru.onrender.com/cliente/${id}`)

export const getClientRequest = async (id) =>
    await axios.get(`https://apismovilconstru.onrender.com/cliente/${id}`)

export const updateClientRequest = async (id, newFields) => {
    await axios.put(`https://apismovilconstru.onrender.com/cliente/${id}`, newFields);
}
export const ToggleClientStatusRequest = async (idCli, status) => {
    return await axios.put(`https://apismovilconstru.onrender.com/clientStatus/${idCli}`, status)
}