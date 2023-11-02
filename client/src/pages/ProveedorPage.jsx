import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProveedorTable from "../components/ProveedorTable";
import { useProveedores } from "../context/ProveedorProvider";
function ProveedoresPage() {

    const {proveedores, Proveedores} = useProveedores()
    const navigate = useNavigate()
    useEffect(() =>{
    Proveedores()  
    }, [])

    function renderMain() {
        if (proveedores.length === 0) {
            return <h1>Sin proveedores</h1>
            
        }
        return <ProveedorTable proveedores={proveedores}/>
    }

    return(
        <div>
            <h1 className="text5-xl text-black font-bold text-left my-3">Proveedores</h1>
                <button className="btn btn-primary" onClick={ ()=> navigate(`/agregarProveedor`)}>
                    Agregar proveedor
                </button>
            <div className="table-responsive">
                {renderMain()}
            </div>

        </div>
    )
}

export default ProveedoresPage