import { useEmpleados } from "../context/EmpleadosProvider";
import { useNavigate } from "react-router-dom";
function EmpleadoCard({empleado}) {

    const {deleteEmpleado, toggleEmpleadoStatus} = useEmpleados()
    const navigate = useNavigate()
    const handleStatus = async () =>{
      await toggleEmpleadoStatus(empleado.idEmp)
    }
    return (
        <div className="bg-zinc-300 rounded-md p-4">
            <header className="flex justify-between ">
                <h2 className="text-sm font-bold">{empleado.nombre}</h2>
                <span>{empleado.estado === 1 ? 'Activo' : 'Inactivo'}</span>
            </header>
            <span>{empleado.direccion}</span>
            <div className="flex gap-x-1 ">
                <button className="bg-slate-800 px-2 py-1 text-white" onClick={ ()=> navigate(`/editarEmpleado/${empleado.idEmp}`)}>
                    Editar
                </button>                
                <button className="bg-red-500 px-2 py-1 text-white" onClick={()=> deleteEmpleado(empleado.idEmp)}>
                    Eliminar
                </button>                
            </div>
        </div>
    )
}

export default EmpleadoCard