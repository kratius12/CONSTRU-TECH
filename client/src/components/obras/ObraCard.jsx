import { useObras } from "../context/ObrasProvider";
import { useNavigate } from "react-router-dom";
function ObraCard({obra}) {

    const {deleteObra, toggleObraStatus} = useObras()
    const navigate = useNavigate()
    const handleStatus = async () =>{
      await toggleObraStatus(obra.idObra)
    }
    return (
        <div className="bg-zinc-300 rounded-md p-4">
            <header className="flex justify-between ">
                <h2 className="text-sm font-bold">{obra.descripcion}</h2>
                <span>{obra.estado === 1 ? 'Activo' : 'Inactivo'}</span>
            </header>
            <span>{obra.cantidad}</span>
            <div className="flex gap-x-1 ">
                <button className="bg-slate-800 px-2 py-1 text-white" onClick={ ()=> navigate(`/edit/${obra.idObra}`)}>
                    Edit
                </button>
                <button className="bg-slate-800 px-2 py-1 text-white" onClick={ ()=> navigate(`/formTemplateEdit/${obra.idObra}`)}>
                    Edit New template
                </button>                
                <button className="bg-red-500 px-2 py-1 text-white" onClick={()=> deleteObra(obra.idObra)}>
                    Delete
                </button>                
            </div>
        </div>
    )
}

export default ObraCard