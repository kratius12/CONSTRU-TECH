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
            header: "Apellidos",
            accessorKey: 'apellidos'
        },
        {
            header: "Dirección",
            accessorKey: 'direccion'
        },
        {
            header: "Teléfono",
            accessorKey: 'telefono'
        },
        {
            header: "Cédula",
            accessorKey: 'cedula'
        },
        {
            header: "Estado",
            accessorKey: 'estado'
        },
        {
            header: "Acción",
            accessorKey: 'accion',
            idProperty: 'idCli'
        }
    ]
    const { clientes, Clients } = useClients()
    const navigate = useNavigate()
    useEffect(() => {
        Clients()
    }, [])

    function renderMain() {

        if (clientes.length === 0) {
            return <h1>Sin Clientes</h1>

        } else {
            return <TableInfo dataHeader={dataHeader} dataBody={clientes} routeEdit={"editarCliente"} viewDetail/>
        }
    }

    return (
        <div>
            <h1 className="text-black font-bold text-left my-3">Clientes</h1>
            <div className="table-responsive">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <button className="btn btn-primary" onClick={() => navigate(`/agregarCliente`)}>
                            Agregar cliente
                        </button>
                    </div>
                    {renderMain()}
                </div>
            </div>
        </div>
    )
}

export default ClientPage