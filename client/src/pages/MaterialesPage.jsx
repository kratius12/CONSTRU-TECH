import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MaterialCard from "../components/MaterialCard";
import { useMateriales } from "../context/MaterialesProvider";
function MaterialesPage() {

    const {materiales, Materiales} = useMateriales()
    const navigate = useNavigate()
    useEffect(() =>{
    Materiales()  
    }, [])

    function renderMain() {
        if (materiales.length === 0) {
            return <h1>Sin Materiales</h1>
            
        }
        return materiales.map((material) =><MaterialCard material={material} key={material.idMat} />)
    }

    return(
        <div>
            <h1 className="text5-xl text-white font-bold text-center">Obras</h1>
                <button className="block my-3 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={ ()=> navigate(`/formMaterial`)}>
                    Agregar material
                </button>
            <div className="grid grid-cols-3 gap-2">
                {renderMain()}
            </div>

        </div>
    )
}

export default MaterialesPage