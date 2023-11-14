import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useClients } from "../context/ClientesProvider";
import TableInfo from "../components/TableInfo";
function ClientPage() {

    const dataHeader = [
        {
           header: "ID",
           accessorKey: 'idCli'

        },
        {
            header: "Nombre",
            accessorKey: 'nombre'
        },
        {
            header:"Apellidos",
            accessorKey: 'apellidos'
        },
        {
            header: "Direcion",
            accessorKey: 'direccion'
        },
        {
            header: "Telefono",
            accessorKey: 'telefono'
        },
        {
            header: "Cedula",
            accessorKey: 'cedula'
        },
        {
            header: "Estado",
            accessorKey: 'estado'
        },
        {
            header: "Accion",
            accessorKey: 'accion'
        }
    ]
    const {clientes, Clients} = useClients()
    const navigate = useNavigate()
    useEffect(() =>{
    Clients()  
    }, [])

    function renderMain() {

        if (clientes.length === 0) {
            return <h1>Sin Clientes</h1>
            
        }else{
            return <TableInfo dataHeader={dataHeader} dataBody={clientes}/>
        }
    }

    return(
        <div>
            <h1 className="text-black font-bold text-left my-3">Clientes</h1>
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