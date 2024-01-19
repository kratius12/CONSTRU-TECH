
import axios from "axios";

export const getClientsRequest = async () =>
    await axios.get("http://localhost:4000/clientes");

export const createClientRequest = async (cliente) =>
    await axios.post('http://localhost:4000/cliente', cliente);

export const deleteClientRequest = async (id) =>
    await axios.delete(`http://localhost:4000/cliente/${id}`)

export const getClientRequest = async (id) =>
    await axios.get(`http://localhost:4000/cliente/${id}`)

export const updateClientRequest = async (id, newFields) => {
    await axios.put(`http://localhost:4000/cliente/${id}`, newFields);
}
export const ToggleClientStatusRequest = async (idCli, status) => {
    return await axios.put(`http://localhost:4000/clientStatus/${idCli}`, status)
}