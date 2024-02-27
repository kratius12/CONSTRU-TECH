import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ComprasTable from "../../components/compras/ComprasTable"
import { useProveedores } from "../../context/proveedores/ProveedorProvider";
import TableInfo from "../../components/table/TableInfo";
function ProveedoresPage() {
    const dataHeader = [
        {
            header: "Nombre",
            accessorKey: 'nombre'
        },
        {
            header: "Teléfono",
            accessorKey: 'telefono'
        },
        {
            header: "Correo electronico",
            accessorKey: 'email'
        },
        {
            header: "Tipo de proveedor",
            accessorKey: 'tipo'
        },
        {
            header:"Documento",
            accessorKey:'nit'
        },
        {
            header: "Estado",
            accessorKey: 'estado',
            idProperty:"idProv"
        },
        {
            header: "Acciones",
            accessorKey: 'accion',
            idProperty: "idProv"
        },
    ]
    const [tableStatus, setTableStatus] = useState(0)
    const handleChangeStatus = (newStatus) => {
        setTableStatus(newStatus)
    }
    const { proveedores, Proveedores, toggleStado, getProveedor } = useProveedores()
    const navigate = useNavigate()
    useEffect(() => {
        Proveedores()
    }, [])

    function renderMain() {
        if (proveedores.length === 0) {
            return <h1>Sin proveedores</h1>

        }
        return <TableInfo dataHeader={dataHeader} dataBody={proveedores} routeEdit={'editarProveedor'} viewDetail
            toggleApi={toggleStado} getApi={getProveedor} entity={"proveedor"} onChangeStatus={handleChangeStatus}
        />

    }
    console.clear()
    return (
        <>
            <h1 className="h3 mb-2 text-gray-800">Gestión de proveedores</h1>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Listado de proveedores</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="col-md-6 mb-3">
                                    <button className="btn btn-primary" onClick={() => navigate(`/agregarProveedor`)}>
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

export default ProveedoresPage

