import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmpleadoTable from "../components/EmpleadoTable";
import { useEmpleados } from "../context/EmpleadosProvider";
function EmpleadosPage() {

    const {empleados, Empleados} = useEmpleados()
    const navigate = useNavigate()
    useEffect(() =>{
    Empleados()  
    }, [])

    function renderMain() {
        if (empleados.length === 0) {
            return <h1>Sin Empleados</h1>
            
        }
        return <EmpleadoTable empleados={empleados}/>
    }

    return(
        <div>
            <h1 className="text5-xl text-black font-bold text-left my-3">Empleados</h1>
                <button className="btn btn-primary" onClick={ ()=> navigate(`/agregarEmpleado`)}>
                    Agregar empleado
                </button>
            <div className="table-responsive">
                {renderMain()}
            </div>

        </div>
    )
}

export default EmpleadosPage