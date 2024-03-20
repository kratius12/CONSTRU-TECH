import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableInfo from "../../components/table/TableInfo";
import { useObras } from "../../context/obras/ObrasProvider";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
  } from '@tanstack/react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table as BTable } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function ObrasPage() {

    const dataHeader = [
        {
            header: "Descripción",
            accessorKey: 'descripcion'
        },
        {
            header: "Fecha inicio",
            accessorKey: 'fechaini'
        },
        {
            header: "Fecha Fin",
            accessorKey: 'fechafin'
        },
        {
            header: "Cliente",
            accessorKey: 'idCliente'
        },
        {
            header: "Estado",
            accessorKey: 'estado',
        },
        {
            header: "Acción",
            accessorKey: 'accion',
            idProperty: 'idObra'
        }
    ]

    const { obras, Obras, getObra } = useObras()
    const navigate = useNavigate()
    useEffect(() => {
        Obras()
    }, [])

    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState('');
    const table = useReactTable({
      data: obras,
      columns: dataHeader,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: {
        sorting,
        globalFilter: filtering,
      },
      onSortingChange: setSorting,
      onGlobalFilterChange: setFiltering,
    });
    const maxLength = 15;
    console.clear()
    
    return (
        <>
            <h1 className="h3 mb-2 text-gray-800">Gestión de obras y tiempos</h1>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Listado de obras y tiempos</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="col-md-6 mb-3">
                                    <button className="btn btn-primary" onClick={() => navigate('/agregarObra')}>
                                        Agregar
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <input
                                placeholder="Filtrar por búsqueda"
                                className="form-control border-primary"
                                type="text"
                                name=""
                                id=""
                                value={filtering}
                                onChange={(e) => setFiltering(e.target.value)}
                                />
                            </div>
                            <BTable striped bordered hover responsive size="sm">
                                <thead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        >
                                        {header.isPlaceholder ? null : (
                                            <div>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {{
                                                asc: '⬆️',
                                                desc: '⬇️',
                                            }[header.column.getIsSorted() ?? null]}
                                            </div>
                                        )}
                                        </th>
                                    ))}
                                    </tr>
                                ))}
                                </thead>
                                <tbody>
                                {table.getRowModel().rows.map((row) => (
                                    <tr key={row.id}>

                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id}>
                                        {cell.column.id === 'accion' ? (
                                            <>
                                            <Link
                                                className={`btn bg-secondary text-white ${cell.row.original.estado === 0 ? 'disabled' : ''}`}
                                                to={`/detalleObra/${cell.row.original[cell.column.columnDef.idProperty]}`}
                                            >
                                                Editar <i className="fa-solid fa-pencil" />
                                            </Link>
                                            </>
                                        ):cell.column.id === 'idCliente' ? (
                                            <>
                                                {cell.row.original.cliente.nombre.length > maxLength ? cell.row.original.cliente.nombre.substring(0, maxLength)+ '...': cell.row.original.cliente.nombre}
                                            </>
                                        ): cell.column.id === 'descripcion'? (
                                            <>
                                                {cell.row.original.descripcion.length > maxLength ? cell.row.original.descripcion.substring(0, maxLength)+ '...': cell.row.original.descripcion}
                                            </>
                                        ) : (
                                            flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                            )
                                        )}
                                        </td>
                                    ))}
                                    </tr>
                                ))}
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
                                    <i className="fa-solid fa-arrow-right"></i>
                                </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ObrasPage