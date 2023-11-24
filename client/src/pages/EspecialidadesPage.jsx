import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EspecialidadTable  from "../components/EspecialidadTable"
import { useEspecialidades } from "../context/EspecialidadesProvider";

import TableInfo from "../components/TableInfo";
function EspecialidadesPage() {

    const dataHeader = [
        {
           header: "ID",
           accessorKey: 'id'

        },
        {
            header: "Especialidad",
            accessorKey: 'especialidad'
        },
        {
            header: "Estado",
            accessorKey: 'estado'
        },
        {
            header: "Accion",
            accessorKey: 'accion',
            idProperty: 'id'
        }
    ]

    const {especialidades, Especialidades} = useEspecialidades()
    const navigate = useNavigate()
    useEffect(() =>{
    Especialidades()  
    }, [])

    function renderMain() {
        if (especialidades.length === 0) {
            return <h1>Sin Especialidades</h1>
            
        }

        return <TableInfo dataHeader={dataHeader} dataBody={especialidades} routeEdit={'editarEspecialidad'}/>
        // return <EspecialidadTable especialidades={especialidades}/>
    }

    return(
        <>
        <h1 className="h3 mb-2 text-gray-800">Gestión de especialidades</h1>        
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Listado de especialidades</h6>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="col-md-6 mb-3">
                                        <button className="btn btn-primary" onClick={ ()=> navigate(`/agregarEspecialidad`)}>
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

export default EspecialidadesPage