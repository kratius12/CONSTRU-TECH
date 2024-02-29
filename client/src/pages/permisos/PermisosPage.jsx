import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePermiso } from "../../context/permisos/PermisosProvider";
import TableInfo from "../../components/table/TableInfo";

function PermisosPage() {

    const dataHeader = [
        {
           header: "ID",
           accessorKey: 'idPer'

        },
        {
            header: "Nombre",
            accessorKey: 'permiso'
        }
    ]

    const [tableStatus, setTableStatus] = useState(0)
    const handleChangeStatus = (newStatus) => {
        setTableStatus(newStatus)

    }

    const {permisos, Permisos} = usePermiso()
    const navigate = useNavigate()
    useEffect(() =>{
    Permisos()  
    }, [])

    function renderMain() {
        if (permisos.length === 0) {
            return <h1>Sin Permisos</h1>
            
        }else{
            return <TableInfo dataHeader={dataHeader} dataBody={permisos}   entity={"Permiso"} />
        }
        // return <RolTable permisos={permisos}/>
    }

    return(
        <>
        <h1 className="h3 mb-2 text-gray-800">Gestión de permisos</h1>        
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Listado de permisos</h6>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="col-md-6 mb-3">
                                        <button className="btn btn-secondary" onClick={ ()=> navigate(`/roles`)}>
                                            Regresar 
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

export default PermisosPage