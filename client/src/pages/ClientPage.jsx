import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClienteTable from "../components/ClienteTable";
import { useClients } from "../context/ClientesProvider";

function ClientPage() {

    const {clientes, Clients} = useClients()
    const navigate = useNavigate()
    useEffect(() =>{
    Clients()
    }, [])

    function renderMain() {
        if (clientes.length === 0) {
            return <h1>Sin clientes</h1>
            
        }
        return <ClienteTable clientes={clientes}/>
    }

    return(
        <div>
            <h1 className="text5-xl text-black font-bold text-left my-3">Clientes</h1>
                <button className="btn btn-primary" onClick={ ()=> navigate(`/agregarCliente`)}>
                    Agregar cliente
                </button>
            <div className="table-responsive">
                {renderMain()}
            </div>

        </div>
    )
}

export default ClientPage