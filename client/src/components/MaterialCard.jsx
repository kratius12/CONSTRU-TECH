import { useMateriales } from "../context/MaterialesProvider";
import { useNavigate } from "react-router-dom";
function MaterialCard({material}) {

    const {deleteMaterial, toggleObraStatus} = useMateriales()
    const navigate = useNavigate()
    const handleStatus = async () =>{
      await toggleObraStatus(material.idMat)
    }
    return (
        <div className="bg-zinc-300 rounded-md p-4">
            <header className="flex justify-between ">
                <h2 className="text-sm font-bold">{material.nombre}</h2>
                <span>{material.estado === 1 ? 'Activo' : 'Inactivo'}</span>
            </header>
            <span>{material.precio}</span>
            <div className="flex gap-x-1 ">
                <button className="bg-slate-800 px-2 py-1 text-white" onClick={ ()=> navigate(`/formMaterialEdit/${material.idMat}`)}>
                    Edit New template
                </button>                
                <button className="bg-red-500 px-2 py-1 text-white" onClick={()=> deleteMaterial(material.idMat)}>
                    Delete
                </button>                
            </div>
        </div>
    )
}

export default MaterialCard