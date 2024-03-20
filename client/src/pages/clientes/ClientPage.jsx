import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useClients } from "../../context/clientes/ClientesProvider";
import TableInfo from "../../components/table/TableInfo";

function ClientPage() {

    const dataHeader = [
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
            header:"Tipo documento",
            accessorKey: 'tipoDoc'
        },
        {
            header: "Cédula",
            accessorKey: 'cedula'
        },
        {
            header: "Estado",
            accessorKey: 'estado',
            idProperty:'idCli'
        },  
        {
            header: "Acción",
            accessorKey: 'accion',
            idProperty: 'idCli'
        }
    ]
    const handleChangeStatus = (status) => {
        console.log(status)
    }
    const { clientes, Clients, toggleClientStatus,getClient } = useClients()
    const navigate = useNavigate()
    useEffect(() => {
        Clients()
    }, [])

    function renderMain() {

        if (clientes.length === 0) {
            return <h1>Sin Clientes</h1>

        } else {
            return <TableInfo dataHeader={dataHeader} dataBody={clientes} routeEdit={"editarCliente"} viewDetail toggleApi={toggleClientStatus} getApi={getClient} entity={'Cliente'} onChangeStatus={handleChangeStatus} />
        }
    }
    console.clear()
    return (
        <>
            <h1 className="h3 mb-2 text-gray-800">Gestión de clientes</h1>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Listado de clientes</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="col-md-6 mb-3">
                                    <button className="btn btn-primary" onClick={() => navigate(`/agregarCliente`)}>
                                        Agregar
                                    </button>
                                </div>
                            </div>
                            {renderMain()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClientPage