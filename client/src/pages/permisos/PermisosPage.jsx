import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import RolTable  from "../components/RolesTable"
import { usePermiso } from "../../context/permisos/PermisosProvider";
import TableInfo from "../../components/TableInfo";

function PermisosPage() {

    const dataHeader = [
        {
           header: "ID",
           accessorKey: 'idPer'

        },
        {
            header: "Nombre",
            accessorKey: 'permiso'
        },
        {
            header: "Estado",
            accessorKey: 'estado',
            idProperty: 'idPer'
        },
        {
            header: "Acción",
            accessorKey: 'accion',
            idProperty: 'idPer'
        }
    ]

    const [tableStatus, setTableStatus] = useState(0)
    const handleChangeStatus = (newStatus) => {
        setTableStatus(newStatus)

    }

    const {permisos, Permisos, TogglePermisoStatus, getPermiso} = usePermiso()
    const navigate = useNavigate()
    useEffect(() =>{
    Permisos()  
    }, [])

    function renderMain() {
        if (permisos.length === 0) {
            return <h1>Sin Permisos</h1>
            
        }else{
            return <TableInfo dataHeader={dataHeader} dataBody={permisos} routeEdit={'editarPermiso'} viewDetail toggleApi={TogglePermisoStatus} getApi={getPermiso} entity={"Permiso"} onChangeStatus={handleChangeStatus}/>
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
                                        <button className="btn btn-primary" onClick={ ()=> navigate(`/agregarPermiso`)}>
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

export default PermisosPage