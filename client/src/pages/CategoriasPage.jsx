import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoriaTable  from "../components/CategoriaTable"
import { useCategorias } from "../context/CategoriasProvider";

import TableInfo from "../components/TableInfo";
function CategoriasPage() {
    const dataHeader = [
        {
           header: "ID",
           accessorKey: 'idcat'

        },
        {
            header: "Nombre",
            accessorKey: 'nombre'
        },
        {
            header: "Medida",
            accessorKey: 'medida'
        },
        {
            header: "Estado",
            accessorKey: 'estado'
        },
        {
            header: "Accion",
            accessorKey: 'accion',
            idProperty: 'idcat'
        }
    ]

    const {categorias, Categorias} = useCategorias()
    const navigate = useNavigate()
    useEffect(() =>{
    Categorias()  
    }, [])

    function renderMain() {
        if (categorias.length === 0) {
            return <h1>Sin Categorias</h1>
            
        }
        return <TableInfo dataHeader={dataHeader} dataBody={categorias} routeEdit={'editarCategoria'}/>
        // return <CategoriaTable categorias={categorias}/>
    }

    return(
        <>
            <h1 className="h3 mb-2 text-gray-800">Gestión de categorias</h1>        
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