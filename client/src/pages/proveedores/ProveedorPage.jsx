import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ComprasTable from "../../components/compras/ComprasTable"
import { useProveedores } from "../../context/proveedores/ProveedorProvider";
import TableInfo from "../../components/TableInfo";
function ProveedoresPage() {
    const dataHeader = [
        {
            header: "ID",
            accessorKey: 'idProv'

        },
        {
            header: "Nombre",
            accessorKey: 'nombre'
        },
        {
            header: "Telefono",
            accessorKey: 'telefono'
        },
        {
            header: "Nombre contacto",
            accessorKey: 'nombreContacto'
        },
        {
            header: "Telefono contacto",
            accessorKey: 'telefonoContacto'
        },
        {
            header: "Estado",
            accessorKey: 'estado'
        },
        {
            header: "Acciones",
            accessorKey: 'accion',
            idProperty: "idProv"
        },
    ]
    const { proveedores, Proveedores } = useProveedores()
    const navigate = useNavigate()
    useEffect(() => {
        Proveedores()
    }, [])

    function renderMain() {
        if (proveedores.length === 0) {
            return <h1>Sin proveedores</h1>

        }
        return <TableInfo dataHeader={dataHeader} dataBody={proveedores} routeEdit={'editarProveedor'} viewDetail />

    }

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
                                    <button className="btn btn-primary" onClick={() => navigate(`/agregarEmpleado`)}>
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
