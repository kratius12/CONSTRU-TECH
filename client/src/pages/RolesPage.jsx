import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RolTable  from "../components/RolesTable"
import { useRol } from "../context/RolesProvider";
import TableInfo from "../components/TableInfo";

function RolesPage() {

    const dataHeader = [
        {
           header: "ID",
           accessorKey: 'idRol'

        },
        {
            header: "Nombre",
            accessorKey: 'nombre'
        },
        {
            header: "Estado",
            accessorKey: 'estado'
        },
        {
            header: "Accion",
            accessorKey: 'accion'
        }
    ]

    const {roles, Roles} = useRol()
    const navigate = useNavigate()
    useEffect(() =>{
    Roles()  
    }, [])

    function renderMain() {
        if (roles.length === 0) {
            return <h1>Sin Roles</h1>
            
        }else{
            return <TableInfo dataHeader={dataHeader} dataBody={roles}/>
        }
        // return <RolTable roles={roles}/>
    }

    return(
        <div>
            <h1 className="text5-xl text-black font-bold text-left my-3">Roles</h1>
                <button className="btn btn-primary" onClick={ ()=> navigate(`/agregarRol`)}>
                    Agregar rol
                </button>
            <div>
                <button className="btn btn-secondary" onClick={ () => navigate(`/permisos`)}>
                    Permisos
                </button>
            </div>
            <div className="table-responsive">
                {renderMain()}
            </div>
        </div>
    )
}

export default RolesPage