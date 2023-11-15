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
        <div>
            <h1 className="text5-xl text-black font-bold text-left my-3">Categorias</h1>

            <div className="table-responsive">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <button className="btn btn-primary" onClick={ ()=> navigate(`/agregarCategoria`)}>
                            Agregar categoria
                        </button>
                    </div>
                    {renderMain()}
                </div>

            </div>

        </div>
    )
}

export default CategoriasPage