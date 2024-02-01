import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const ObraDetalle = ()=>{
    const {id} = useParams()
    const [obra, setObra] = useState(null);
    const navigate = useNavigate()
    const [showForm, setShowForm] = useState(false)
    const handleOpenForm = ()=> setShowForm(true)
    const handleCloseForm = ()=> setShowForm(false)

    useEffect(()=>{
        const fetchObraDetalle = async()=>{
            try {
                const response = await axios.get(`http://localhost:4000/obra/${id}`);
                setObra(response.data)
            } catch (error) {
                console.error("Ocurrio un error al obtener la información de la obra")
            }
        }
        fetchObraDetalle()
    }, [id]);
    if(!obra){
        return <div>Error al cargar la información de la obra</div>
    }
    return(
        <div>
            <div className="card text-center w-100">
                <h2>Detalle de obra</h2>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-2 ">
                            <h1>{obra.descripcion}</h1>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ObraDetalle