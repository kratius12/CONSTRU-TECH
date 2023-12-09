import { useNavigate } from "react-router-dom";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
  } from '@tanstack/react-table';
import { Table as BTable } from 'react-bootstrap';
export default function ComprasTable({ compras }) {
    const comprasData = compras
    const navigate = useNavigate()
    const table = useReactTable({
        
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        
      });
    return (
        <div>
            <BTable striped bordered hover responsive size="sm">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Fecha de compra</th>
                        <th scope="col">Total de la compra</th>
                        <th scope="col">Ver detalle</th>
                    </tr>
                </thead>
                <tbody>
                    {comprasData.map(({ idCom, fecha, total_compra }) => {
                        return (
                            <tr key={idCom}>
                                <td>{idCom}</td>
                                <td>{fecha}</td>
                                <td>{total_compra}</td>
                                <td>
                                    <button className="btn btn-secondary" onClick={()=>navigate(`/verDetalle/${idCom}`)}>
                                        Ver <i className="fa-solid fa-eye"></i>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </BTable>
            <div className="row">
                <div className="col-md-2 offset-md-4">
                    <a
                        className="btn bg-transparent"
                        onClick={() => table.previousPage()}
                    >

                        <i className="fa-solid fa-arrow-left"></i>
                        &nbsp; Anterior
                    </a>
                </div>
                <div className="col-md-2">
                    <a
                        className="btn bg-transparent"
                        onClick={() => table.nextPage()}
                    >

                        Siguiente &nbsp;
                        <i class="fa-solid fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    )
}