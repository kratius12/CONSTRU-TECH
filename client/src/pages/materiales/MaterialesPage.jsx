import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMateriales } from "../../context/materiales/MaterialesProvider";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table as BTable } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
  } from '@tanstack/react-table';
  import StatusToggle from '../../components/togglEstado/StatusToggleMateriales';
function MaterialesPage() {

    const dataHeader = [
        {
            header: "Nombre",
            accessorKey: 'nombre'
        },
        {
            header: "Categoría",
            accessorKey: 'categoria.nombre',
        },{
            header: "Cantidad",
            accessorKey: "cantidad"
        },
        {
            header:"Estado",
            accessorKey:"estado",
            idProperty:"idMat"
        }
        
        ,{
            header: "Acciones",
            accessorKey: "accion",
            idProperty: "idMat"
        }
    ]
    const [tableStatus, setTableStatus] = useState(0)
    const handleChangeStatus = (newStatus) => {
        setTableStatus(newStatus)
    }
    const { materiales, Materiales,toggleMaterialEstado,getMaterial } = useMateriales()
    const navigate = useNavigate()
    useEffect(() => {
        Materiales()
    }, [])
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState('');
    const table = useReactTable({
      data: materiales,
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
    // console.clear()
    return (
        <>
            <h1 className="h3 mb-2 text-gray-800">Gestión de materiales</h1>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Listado de materiales</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="col-md-6 mb-3">
                                    <button className="btn btn-primary" onClick={() => navigate(`/agregarMaterial`)}>
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
                                                to={`/editarMaterial/${cell.row.original[cell.column.columnDef.idProperty]}`}
                                            >
                                                Editar <i className="fa-solid fa-pencil" />
                                            </Link>
                                            </>
                                        ):cell.column.id === 'estado' ? (
                                            <>
                                                <StatusToggle
                                                    id={cell.row.original[cell.column.columnDef.idProperty]}
                                                    initialStatus={cell.row.original.estado}
                                                />                                                
                                            </>
                                        ): (
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
                            {/* {renderMain()} */}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MaterialesPage