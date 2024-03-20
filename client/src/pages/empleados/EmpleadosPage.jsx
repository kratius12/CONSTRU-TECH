import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEmpleados } from "../../context/empleados/EmpleadosProvider";
import TableInfo from "../../components/table/TableInfo";
function EmpleadosPage() {

    const dataHeader = [
        {
            header: "Nombre",
            accessorKey: 'nombre'
        },
        {
            header: "Teléfono",
            accessorKey: 'telefono'
        },
        {
            header: "Tipo documento",
            accessorKey:'tipoDoc'
        },
        {
            header: "Cédula",
            accessorKey: 'cedula'
        },
        {
            header: "Estado",
            accessorKey: 'estado',
            idProperty: 'idEmp'
        },
        {
            header: "Acción",
            accessorKey: 'accion',
            idProperty: 'idEmp'
        }
    ]
    const [tableStatus, setTableStatus] = useState(0)
    const handleChangeStatus = (newStatus) => {
        setTableStatus(newStatus)

    }
    // console.clear()
    const {empleados, Empleados, toggleEmpleadoStatus, getEmpleado} = useEmpleados()
    const navigate = useNavigate()
    useEffect(() =>{
    Empleados()  
    }, [])
    console.clear()
    function renderMain() {

        if (empleados.length === 0) {
            return <h1>Sin Empleados</h1>
            
        }else{
            return <TableInfo dataHeader={dataHeader} dataBody={empleados} routeEdit={'editarEmpleado'} viewDetail toggleApi={toggleEmpleadoStatus} getApi={getEmpleado} entity={'Empleado'} onChangeStatus={handleChangeStatus}/>
        }
    }

    return(
        <>
            <h1 className="h3 mb-2 text-gray-800">Gestión de empleados</h1>        
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Listado de empleados</h6>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="col-md-6 mb-3">
                                            <button className="btn btn-primary" onClick={ ()=> navigate(`/agregarEmpleado`)}>
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

export default EmpleadosPage