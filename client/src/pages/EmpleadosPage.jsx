import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmpleadoTable from "../components/EmpleadoTable";
import { useEmpleados } from "../context/EmpleadosProvider";
import TableInfo from "../components/TableInfo";
function EmpleadosPage() {

    const dataHeader = [
        {
           header: "ID",
           accessorKey: 'idEmp'

        },
        {
            header: "Nombre",
            accessorKey: 'nombre'
        },
        {
            header: "Correo",
            accessorKey: 'email'
        },
        {
            header: "Telefono",
            accessorKey: 'telefono'
        },
        {
            header: "Cedula",
            accessorKey: 'cedula'
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
    const {empleados, Empleados} = useEmpleados()
    const navigate = useNavigate()
    useEffect(() =>{
    Empleados()  
    }, [])

    function renderMain() {

        if (empleados.length === 0) {
            return <h1>Sin Empleados</h1>
            
        }else{
            return <TableInfo dataHeader={dataHeader} dataBody={empleados}/>
            //return <EmpleadoTable empleados={empleados}/>
        }
    }

    return(
        <div>
            <h1 className="text-black font-bold text-left my-3">Empleados</h1>
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