import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EspecialidadTable  from "../components/EspecialidadTable"
import { useEspecialidades } from "../context/EspecialidadesProvider";
function EspecialidadesPage() {

    const {especialidades, Especialidades} = useEspecialidades()
    const navigate = useNavigate()
    useEffect(() =>{
    Especialidades()  
    }, [])

    function renderMain() {
        if (especialidades.length === 0) {
            return <h1>Sin Especialidades</h1>
            
        }
        return <EspecialidadTable especialidades={especialidades}/>
    }

    return(
        <div>
            <h1 className="text5-xl text-black font-bold text-left my-3">Especialidades</h1>
                <button className="btn btn-primary" onClick={ ()=> navigate(`/agregarEspecialidad`)}>
                    Agregar especialidad
                </button>
            <div className="table-responsive">
                {renderMain()}
            </div>

        </div>
    )
}

export default EspecialidadesPage