import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoriaTable  from "../components/CategoriaTable"
import { useCategorias } from "../context/CategoriasProvider";
function CategoriasPage() {

    const {categorias, Categorias} = useCategorias()
    const navigate = useNavigate()
    useEffect(() =>{
    Categorias()  
    }, [])

    function renderMain() {
        if (categorias.length === 0) {
            return <h1>Sin Categorias</h1>
            
        }
        return <CategoriaTable categorias={categorias}/>
    }

    return(
        <div>
            <h1 className="text5-xl text-black font-bold text-left my-3">Categorias</h1>
                <button className="btn btn-primary" onClick={ ()=> navigate(`/agregarCategoria`)}>
                    Agregar categoria
                </button>
            <div className="table-responsive">
                {renderMain()}
            </div>

        </div>
    )
}

export default CategoriasPage