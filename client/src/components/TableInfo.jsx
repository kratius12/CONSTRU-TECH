import {useReactTable, 
    getCoreRowModel, 
    flexRender, 
    getPaginationRowModel, 
    getSortedRowModel,
    getFilteredRowModel} from '@tanstack/react-table';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table as BTable} from 'react-bootstrap';
import { Link } from 'react-router-dom';
function TableInfo({dataHeader, dataBody, routeEdit}) {
    const data = dataBody
    const header = dataHeader
    const columnNumber = dataHeader.length
    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState()
    const table = useReactTable({
        data: data, 
        columns: header, 
        getCoreRowModel:getCoreRowModel(), 
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel:getSortedRowModel(),
        getFilteredRowModel:getFilteredRowModel(),
        state:{
            sorting,
            globalFilter:filtering
        },
        onSortingChange:setSorting,
        onGlobalFilterChange: setFiltering,
    })
    return(
        <>
            <div className="col-md-6">
            <input placeholder='Filtrar por busqueda' className='form-control border-primary' type="text" name="" id=""  value={filtering} onChange={e => setFiltering(e.target.value)}/>
            </div>
            <BTable striped bordered hover responsive size='sm'>
                <thead>
                    {
                        table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {
                                    headerGroup.headers.map(header => (
                                        <th key={header.id}
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {
                                            header.isPlaceholder ? null : (
                                                <div>
                                                    {flexRender(
                                                            header.column.columnDef.header, 
                                                            header.getContext()
                                                        )}
                                                        {
                                                            {'asc':"⬆️", 'desc':"⬇️"}[
                                                                header.column.getIsSorted() ?? null
                                                            ]
                                                        }                                                        
                                                </div>
                                            )}
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody>
                    {
                        table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {
                                    row.getVisibleCells().map(cell => (
                                        <td key={cell.id}>
                                            {

                                            cell.column.id === 'accion' 
                                            ?<Link className="btn bg-secondary text-white" to={`/${routeEdit}/${cell.row.original[cell.column.columnDef.idProperty]}`}>
                                                Editar <i className="fa-solid fa-pencil" />
                                            </Link>
                                            :flexRender(cell.column.columnDef.cell, cell.getContext())
                                            }
                                            {
                                                console.log(cell.row.original)
                                            }
                                        </td>
                                    ))
                                }
                            </tr>
                            
                        ))
                    } 
                </tbody>
                <tfoot>
                    <tr className='border-0'>
                        <td colSpan={columnNumber} className='border-0'>
                            <div className="row">
                                <div className="col-md-3">
                                    <button className='btn btn-primary' onClick={() => table.setPageIndex(0)}>
                                        Primer Pagina
                                    </button>
                                </div>
                                <div className="col-md-3">
                                    <button className='btn btn-secondary' onClick={() => table.previousPage()}>
                                        Pagina Anterior
                                    </button>
                                </div>
                                <div className="col-md-3">
                                    <button className='btn btn-secondary' onClick={() => table.nextPage()}>
                                        Pagina siguiente
                                    </button>
                                </div>                        
                                <div className="col-md-3">
                                    <button className='btn btn-primary' onClick={()=> table.setPageIndex(table.getPageCount() - 1)}>
                                        Ultima pagina
                                    </button>
                                </div>    
                            </div>                           
                        </td>
                    </tr>
                </tfoot>
            </BTable>
        </>
    )
}
export default TableInfo
