import { useNavigate } from "react-router-dom";

export default function ComprasTable({compras}){
    const comprasData = compras
    const navigate = useNavigate()
    
    return(
        <div>
            <table id="table" className="table table-striped table.sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Fecha de compra</th>
                        <th scope="col">Imagen</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {comprasData.map(({idCom,fecha,imagen,total_compra})=>{
                        return(
                            <tr key={idCom}>
                                <td>{idCom}</td>
                                <td>{fecha}</td>
                                <td>{imagen}</td>
                                <td>{total_compra}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}