import { useObras } from "../context/ObrasProvider";
import { useNavigate } from "react-router-dom"; 
export default function Relaciones({relaciones}) {
    const dataRelaciones = relaciones

    relaciones.map((item) =>{
        console.log(item);
    })

}