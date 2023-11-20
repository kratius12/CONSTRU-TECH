import { useEffect, useState } from "react";
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
            accessorKey: 'estado',
            idProperty: 'idEmp'
        },
        {
            header: "Accion",
            accessorKey: 'accion',
            idProperty: 'idEmp'
        }
    ]
    const [tableStatus, setTableStatus] = useState(0)
    const handleChangeStatus = (newStatus) => {
        setTableStatus(newStatus)

    }
    const {empleados, Empleados, toggleEmpleadoStatus} = useEmpleados()
    const navigate = useNavigate()
    useEffect(() =>{
    Empleados()  
    }, [])

    function renderMain() {

        if (empleados.length === 0) {
            return <h1>Sin Empleados</h1>
            
        }else{
            return <TableInfo dataHeader={dataHeader} dataBody={empleados} routeEdit={'editarEmpleado'} viewDetail toggleApi={toggleEmpleadoStatus} onChangeStatus={handleChangeStatus}/>
            //return <EmpleadoTable empleados={empleados}/>
        }
    }

    return(
        <div>
            <h1 className="text-black font-bold text-left my-3">Empleados</h1>
                
            <div className="table-responsive">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <button className="btn btn-primary" onClick={ ()=> navigate(`/agregarEmpleado`)}>
                            Agregar empleado
                        </button>                        
                    </div>
                    {renderMain()}
                </div>
            </div>

        </div>
    )
}

export default EmpleadosPage