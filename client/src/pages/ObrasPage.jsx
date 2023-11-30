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
            </div>

        </div>
    )
}

export default ObrasPage