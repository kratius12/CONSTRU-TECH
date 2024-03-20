import { useNavigate } from "react-router-dom";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
} from '@tanstack/react-table';

import { Table as BTable, Card } from 'react-bootstrap';
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
            <div className='d-none d-md-block'>
                <BTable striped bordered hover responsive size="sm">
                    <thead>
                        <tr>
                            <th scope="col">Fecha de compra</th>
                            <th scope="col">Total de la compra</th>
                            <th scope="col">Codigo de factura</th>
                            <th scope="col">Ver detalle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comprasData.map(({ idCom, fecha, total_compra, codigoFactura }) => {
                            return (
                                <tr key={idCom}>
                                    <td>{fecha}</td>
                                    <td>${total_compra.toLocaleString()}</td>
                                    <td>{codigoFactura}</td>
                                    <td>
                                        <button className="btn btn-secondary" onClick={() => navigate(`/compra/${idCom}`)}>
                                            Ver <i className="fa-solid fa-eye"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </BTable>
            </div>
            <div className="d-md-none">
                {comprasData.map(({ idCom, fecha, total_compra, codigoFactura }) => (
                    <Card key={idCom} className="mb-3">
                        <Card.Body>
                            <Card.Title>ID: {idCom}</Card.Title>
                            <Card.Text>Fecha de compra: {fecha}</Card.Text>
                            <Card.Text>Total de la compra: {total_compra}</Card.Text>
                            <Card.Text>Codigo de factura: {codigoFactura}</Card.Text>
                            <button className="btn btn-secondary" onClick={() => navigate(`/compra/${idCom}`)}>
                                Ver <i className="fa-solid fa-eye"></i>
                            </button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
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
                        <i className="fa-solid fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    )
}