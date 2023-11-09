import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useMateriales } from "../../context/materiales/MaterialesProvider";
import MaterialTable from "../../components/materiales/MaterialesTable";
function MaterialesPage() {

    const { materiales, Materiales } = useMateriales()
    const navigate = useNavigate()
    useEffect(() => {
        Materiales()
    }, [])
    function HeaderView() {
        const location = useLocation();
        console.log(location.pathname);
        return <span>Path : {location.pathname}</span>
    }
    console.log(location)
    function renderMain() {
        if (materiales.length === 0) {
            return <h1>Sin materiales</h1>

        }
        return <MaterialTable materiales={materiales} />
    }

    return (
        <div>
            <h1 className="text5-xl text-black font-bold text-left my-3">Materiales</h1>
            <button className="btn btn-primary" onClick={() => navigate(`/agregarMaterial`)}>
                Agregar material
            </button>
            <div className="table-responsive">
                {renderMain()}
            </div>

        </div>
    )
}

export default MaterialesPage