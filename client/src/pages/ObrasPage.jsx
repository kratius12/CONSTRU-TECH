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

    const {obras, Obras} = useObras()
    const navigate = useNavigate()
    useEffect(() =>{
    Obras()  
    }, [])

    function renderMain() {
        if (obras.length === 0) {
            return <h1>Sin Obras</h1>
            
        }else{
            return <TableInfo dataHeader={dataHeader} dataBody={obras} routeEdit={'editarObra'} />
            //return <EmpleadoTable empleados={empleados}/>
        }
    }

    return(
        <div>
            <h1 className="text-white font-bold text-center">Obras</h1>

            <div className="table-responsive">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <button className="btn btn-primary" onClick={ ()=> navigate(`/agregarObra`)}>
                            Agregar obra
                        </button>                      
                    </div>
                    {renderMain()}
                </div>
            </div>

        </div>
    )
}

export default ObrasPage