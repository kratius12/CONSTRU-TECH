import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import CategoriaTable  from "../components/CategoriaTable"
import { useCategorias } from "../../context/categorias/CategoriasProvider";

import TableInfo from "../../components/table/TableInfo";
function CategoriasPage() {
    const dataHeader = [
        {
            header: "Nombre",
            accessorKey: 'nombre'
        },
        {
            header: "Estado",
            accessorKey: 'estado',
            idProperty: 'idcat'
        },
        {
            header: "Acción",
            accessorKey: 'accion',
            idProperty: 'idcat'
        }
    ]
    const [tableStatus, setTableStatus] = useState(0)
    const handleChangeStatus = (newStatus) => {
        setTableStatus(newStatus)
    }
    const {categorias, Categorias, getCategoria,toggleCategoriaStatus} = useCategorias()
    const navigate = useNavigate()
    useEffect(() =>{
    Categorias()  
    }, [])

    function renderMain() {
        if (categorias.length === 0) {
            return <h1>Sin Categorias</h1>
            
        }
        return <TableInfo dataHeader={dataHeader} dataBody={categorias} routeEdit={'editarCategoria'} onChangeStatus={handleChangeStatus} getApi={getCategoria} toggleApi={toggleCategoriaStatus} entity={"categoria"}/>
        
    }

    return(
        <>
            <h1 className="h3 mb-2 text-gray-800">Gestión de categorías</h1>        
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Listado de categorias</h6>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="col-md-6 mb-3">
                                            <button className="btn btn-primary" onClick={ ()=> navigate(`/agregarCategoria`)}>
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

export default CategoriasPage