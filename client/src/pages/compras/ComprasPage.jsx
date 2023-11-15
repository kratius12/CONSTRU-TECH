import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ComprasTable from "../../components/compras/ComprasTable"
import { useCompras } from "../../context/compras/ComprasProvider";
import TableInfo from "../../components/TableInfo";
function ComprasPage() {
    const dataHeader = [
        {
            header: "ID",
            accessorKey: 'idCom'

        },
        {
            header: "Fecha",
            accessorKey: 'fecha'
        },
        {
            header: "Factura",
            accessorKey: 'imagen'
        },
        {
            header:"Ver detalle",
            accessorKey: 'accion',
            idProperty:"idMat"
        }
    ]
    const { compras, Compras } = useCompras()
    const navigate = useNavigate()
    useEffect(() => {
        Compras()
    }, [])

    function renderMain() {
        if (compras.length === 0) {
            return <h1>Sin compras</h1>

        }
        else{
        return <TableInfo dataHeader={dataHeader} dataBody={compras}  viewDetail/>
        }
    }

    return (
        <div>
            <h1 className="text5-xl text-black font-bold text-left my-3">Compras</h1>

            <div className="table-responsive">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <button className="btn btn-primary" onClick={() => navigate(`/agregarCompra`)}>
                            Agregar compra
                        </button>
                    </div>
                    {renderMain()}
                </div>

            </div>

        </div>
    )
}

export default ComprasPage

