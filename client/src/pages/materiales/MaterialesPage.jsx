import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMateriales } from "../../context/materiales/MaterialesProvider";
import MaterialTable from "../../components/materiales/MaterialesTable";
import TableInfo from "../../components/TableInfo";
function MaterialesPage() {

    const dataHeader = [
        {
            header: "#",
            accessorKey: 'idMat'

        },
        {
            header: "Nombre",
            accessorKey: 'nombre'
        },
        {
            header: "Cantidad",
            accessorKey: 'cantidad'
        },
        {
            header: "Categoria",
            accessorKey: 'categoria.nombre',
        }, {
            header: "Proveedor",
            accessorKey: "proveedor.nombre"
        }, {
            header: "Acciones",
            accessorKey: "accion",
            idProperty: "idMat"
        }
    ]





    const { materiales, Materiales } = useMateriales()
    const navigate = useNavigate()
    useEffect(() => {
        Materiales()
    }, [])

    console.log(location)
    function renderMain() {
        if (materiales.length === 0) {
            return <h1>Sin materiales</h1>

        }
        else {
            return <TableInfo dataHeader={dataHeader} dataBody={materiales} routeEdit={"editarMaterial"} />
        }
    }

    return (
        <>
            <h1 className="h3 mb-2 text-gray-800">Gestión de materiales</h1>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Listado de materiales</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="col-md-6 mb-3">
                                    <button className="btn btn-primary" onClick={() => navigate(`/agregarMaterial`)}>
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

export default MaterialesPage