import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ComprasTable from "../../components/compras/ComprasTable"
import { useCompras } from "../../context/compras/ComprasProvider";
function ComprasPage() {
    
    const { compras, Compras } = useCompras()
    const navigate = useNavigate()
    useEffect(() => {
        Compras()
    }, [])

    function renderMain() {
        if (compras.length === 0) {
            return <h1>Sin compras</h1>

        }
        else{
        return <ComprasTable compras={compras}/>
        }
    }

    return (
        <>
            <h1 className="h3 mb-2 text-gray-800">Gestión de compras</h1>        
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Listado de compras</h6>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="col-md-6 mb-3">
                                            <button className="btn btn-primary" onClick={ ()=> navigate(`/agregarCompras`)}>
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

export default ComprasPage

