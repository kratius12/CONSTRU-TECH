import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableInfo from "../components/TableInfo";
import { useObras } from "../context/ObrasProvider";
function ObrasPage() {

    const dataHeader = [
        {
            header: "ID",
            accessorKey: 'idObra'

        },
        {
            header: "Descripcion",
            accessorKey: 'descripcion'
        },
        {
            header: "Fecha inicio",
            accessorKey: 'fechaini'
        },
        {
            header: "Fecha Fin",
            accessorKey: 'fechafin'
        },
        {
            header: "Cliente",
            accessorKey: 'idCliente'
        },
        {
            header: "Estado",
            accessorKey: 'estado',
            idProperty: 'idCliente'
        },
        {
            header: "Accion",
            accessorKey: 'accion',
            idProperty: 'idCliente'
        }
    ]

    const { obras, Obras } = useObras()
    const navigate = useNavigate()
    useEffect(() => {
        Obras()
    }, [])

    function renderMain() {
        if (obras.length === 0) {
            return <h1>Sin Obras</h1>

        } else {
            return <TableInfo dataHeader={dataHeader} dataBody={obras} routeEdit={'editarObra'} />
            //return <EmpleadoTable empleados={empleados}/>
        }
    }

    return (
        <>
            <h1 className="h3 mb-2 text-gray-800">Gestión de obras y tiempos</h1>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Listado de obras y tiempos</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="col-md-6 mb-3">
                                    <button className="btn btn-primary" onClick={() => navigate(`/agregarObra`)}>
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

export default ObrasPage