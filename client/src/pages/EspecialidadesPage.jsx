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
        <div>
            <h1 className="text5-xl text-black font-bold text-left my-3">Especialidades</h1>
            <div className="table-responsive">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <button className="btn btn-primary" onClick={ ()=> navigate(`/agregarEspecialidad`)}>
                            Agregar especialidad
                        </button>                      
                    </div>
                    {renderMain()}
                </div>
            </div>

        </div>
    )
}

export default EspecialidadesPage