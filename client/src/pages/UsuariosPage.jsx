import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../context/UsuariosProvider";
import TableInfo from "../components/TableInfo";

function UsuariosPage() {

    const dataHeader = [
        {
           header: "ID",
           accessorKey: 'idUsu'

        },
        {
            header: "Empleado",
            accessorKey: 'idEmp'
        },
        {
            header: "Rol",
            accessorKey: 'idRol'
        },
        {
            header: "Estado",
            accessorKey: 'estado',
            idProperty: 'idUsu'
        },
        {
            header: "Accion",
            accessorKey: 'accion',
            idProperty: 'idUsu'
        }
    ]

    const {usuarios, Usuarios} = useUsuario()
    const navigate = useNavigate()
    useEffect(() =>{
    Usuarios()  
    }, [])

    function renderMain() {
        if (usuarios.length === 0) {
            return <h1>Sin usuarios</h1>
            
        }else{
            return <TableInfo dataHeader={dataHeader} dataBody={usuarios} routeEdit={'editarUsuario'} viewDetail/>
        }
        // return <RolTable usuarios={usuarios}/>
    }

    return(
        <>
        <h1 className="h3 mb-2 text-gray-800">Gestión de usuarios</h1>        
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Listado de usuarios</h6>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="col-md-6 mb-3">
                                        <button className="btn btn-primary" onClick={ ()=> navigate(`/agregarUsuario`)}>
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

export default UsuariosPage