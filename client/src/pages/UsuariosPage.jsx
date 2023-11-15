import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UsuarioTable  from "../components/UsuariosTable"
import { useUsuario } from "../context/UsuariosProvider";
import TableInfo from "../components/TableInfo";
function UsuariosPage() {

    const dataHeader = [
        {
           header: "ID",
           accessorKey: 'idUsu'

        },
        {
            header: "Rol",
            accessorKey: 'idRol'
        },
        {
            header: "Empleado",
            accessorKey: 'idEmp'
        },
        {
            header: "Estado",
            accessorKey: 'estado'
        }
    ]


    const {usuarios, Usuarios} = useUsuario()
    const navigate = useNavigate()
    useEffect(() =>{
    Usuarios()  
    }, [])

    function renderMain() {
        if (usuarios.length === 0) {
            return <h1>Sin Usuarios</h1>
            
        }else{
            return <TableInfo dataHeader={dataHeader} dataBody={usuarios}/>
        }
    }

    return(
        <div>
            <h1 className="text5-xl text-black font-bold text-left my-3">Usuarios</h1>
                <button className="btn btn-primary" onClick={ ()=> navigate(`/agregarUsuario`)}>
                    Agregar usuario
                </button>
            <div className="table-responsive">
                {renderMain()}
            </div>
        </div>
    )
}

export default UsuariosPage