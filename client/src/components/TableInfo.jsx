import {useReactTable, 
    getCoreRowModel, 
    flexRender, 
    getPaginationRowModel, 
    getSortedRowModel,
    getFilteredRowModel} from '@tanstack/react-table';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table as BTable} from 'react-bootstrap';
function TableInfo({dataHeader, dataBody}) {
    const data = dataBody
    const header = dataHeader
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
        <div className="p-2">
            <input type="text" name="" id=""  value={filtering} onChange={e => setFiltering(e.target.value)}/>
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
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    } 
                </tbody>
                {/* <tfoot>
                    <tr>
                        <td></td>
                    </tr>
                </tfoot> */}
            </BTable>
            <button onClick={() => table.setPageIndex(0)}>
                Primer Pagina
            </button>
            <button onClick={() => table.previousPage()}>
                Pagina Anterior
            </button>
            <button onClick={() => table.nextPage()}>
                Pagina siguiente
            </button>                        
            <button onClick={()=> table.setPageIndex(table.getPageCount() - 1)}>
                Ultima pagina
            </button>
        </div>
    )
}
export default TableInfo