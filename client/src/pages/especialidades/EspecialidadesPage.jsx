import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEspecialidades } from "../../context/especialidades/EspecialidadesProvider";

import TableInfo from "../../components/table/TableInfo";
function EspecialidadesPage() {

    const dataHeader = [
        {
            header: "Especialidad",
            accessorKey: 'especialidad'
        },
        {
            header: "Estado",
            accessorKey: 'estado',
            idProperty: 'id'
        },
        {
            header: "Acción",
            accessorKey: 'accion',
            idProperty: 'id'
        }
    ]
    const [tableStatus, setTableStatus] = useState(0)
    const handleChangeStatus = (newStatus) => {
        setTableStatus(newStatus)

    }
    const {especialidades, Especialidades, toggleEspecialidadStatus, getEspecialidad} = useEspecialidades()
    const navigate = useNavigate()
    useEffect(() =>{
    Especialidades()  
    }, [])

    function renderMain() {
        if (especialidades.length === 0) {
            return <h1>Sin Especialidades</h1>
            
        }

        return <TableInfo dataHeader={dataHeader} dataBody={especialidades} routeEdit={'editarEspecialidad'} toggleApi={toggleEspecialidadStatus} getApi={getEspecialidad} entity={'Especialidad'} onChangeStatus={handleChangeStatus}/>
        // return <EspecialidadTable especialidades={especialidades}/>
    }
    console.clear()
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