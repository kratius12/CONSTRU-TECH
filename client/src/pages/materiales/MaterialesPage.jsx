import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMateriales } from "../../context/materiales/MaterialesProvider";
import MaterialTable from "../../components/materiales/MaterialesTable";
import TableInfo from "../../components/TableInfo";
function MaterialesPage() {

    const dataHeader = [
        {
            header: "#",
            accessorKey: 'idMat'

        },
        {
            header: "Nombre",
            accessorKey: 'nombre'
        },
        {
            header: "Cantidad",
            accessorKey: 'cantidad'
        },
        {
            header: "Categoria",
            accessorKey: 'categoria.nombre',
        }, {
            header: "Proveedor",
            accessorKey: "proveedor.nombre"
        },{
            header:"Acciones",
            accessorKey:"accion",
            idProperty:"idMat"
        }
    ]





    const { materiales, Materiales } = useMateriales()
    const navigate = useNavigate()
    useEffect(() => {
        Materiales()
    }, [])

    console.log(location)
    function renderMain() {
        if (materiales.length === 0) {
            return <h1>Sin materiales</h1>

        }
        else {
            return <TableInfo dataHeader={dataHeader} dataBody={materiales} routeEdit={"editarMaterial"} />
        }
    }

    return (
        <div>
            <h1 className="text-black font-bold text-left my-3">Materiales</h1>
                
            <div className="table-responsive">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <button className="btn btn-primary" onClick={ ()=> navigate(`/agregarMaterial`)}>
                            Agregar material
                        </button>                        
                    </div>
                    {renderMain()}
                </div>
            </div>

        </div>
    )
}

export default MaterialesPage