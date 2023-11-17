import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ObraCard from "../components/ObraCard";
import { useObras } from "../context/ObrasProvider";
function ObrasPage() {

    const {obras, Obras} = useObras()
    const navigate = useNavigate()
    useEffect(() =>{
    Obras()  
    }, [])

    function renderMain() {
        if (obras.length === 0) {
            return <h1>Sin Obras</h1>
            
        }
        return obras.map((obra) =><ObraCard obra={obra} key={obra.idObra} />)
    }

    return(
        <div>
<<<<<<< Updated upstream
            <h1 className="text5-xl text-white font-bold text-center">Obras</h1>
                <button className="block my-3 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={ ()=> navigate(`/formTemplate`)}>
                    Agregar obra
                </button>
            <div className="grid grid-cols-3 gap-2">
                {renderMain()}
=======
            <h1 className=" font-bold text-left">Obras</h1>

            <div className="table-responsive">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <button className="btn btn-primary" onClick={ ()=> navigate(`/agregarObra`)}>
                            Agregar obra
                        </button>                      
                    </div>
                    {renderMain()}
                </div>
>>>>>>> Stashed changes
            </div>

        </div>
    )
}

export default ObrasPage