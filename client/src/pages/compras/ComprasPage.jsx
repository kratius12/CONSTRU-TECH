import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useCompras } from "../../context/compras/ComprasProvider";
import ComprasTable from "../../components/compras/ComprasTable";
function ComprasPage() {

    const { compras, Compras } = useCompras()
    const navigate = useNavigate()
    useEffect(() => {
        Compras()
    }, [])
    function HeaderView() {
        const location = useLocation();
        console.log(location.pathname);
        return <span>Path : {location.pathname}</span>
    }
    console.log(location)
    function renderMain() {
        if (compras.length === 0) {
            return <h1>Sin compras</h1>

        }
        return <ComprasTable compras={compras} />
    }

    return (
        <div>
            <h1 className="text5-xl text-black font-bold text-left my-3">Compras</h1>
            <button className="btn btn-primary" onClick={() => navigate(`/agregarCompras`)}>
                Agregar compras
            </button>
            <div className="table-responsive">
                {renderMain()}
            </div>

        </div>
    )
}

export default ComprasPage