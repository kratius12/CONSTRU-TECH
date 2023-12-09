import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table as BTable } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import StatusToggle from '../components/StatusToggle';
import AlertDetail from '../components/AlertDetail';

function TableInfo({ dataHeader, dataBody, routeEdit, viewDetail, entity, toggleApi, onChangeStatus, getApi }) {

  const data = dataBody;
  const header = dataHeader;
  const columnNumber = dataHeader.length;

  const dataHead = [
    {
      header: 'idEmp',
    },
    {
      header: 'Nombre',
    },
    {
      header: 'Correo',
    },
    {
      header: 'Telefono',
    },
    {
      header: 'Cedula',
    },
    {
      header: 'Estado',
    },
  ];
  const [estado, setEstado] = useState([]);
  const handleCambioEstado = (id, nuevoEstado) => {
    console.log(id, nuevoEstado);
    setEstado((prevState) => ({ ...prevState, [id]: { id, estado: nuevoEstado } }))
    onChangeStatus(id, nuevoEstado)

  }
  console.log(estado);
  const isDisabled = (id) => estado[id] == true ? 'enabled' : 'disabled'
  console.log(isDisabled());
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState('');
  const table = useReactTable({
    data: data,
    columns: header,
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

  return (
    <>
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
                      {viewDetail ? (

                        <AlertDetail
                          id={cell.row.original[cell.column.columnDef.idProperty]}
                          entity={entity}
                          getApi={getApi}
                        />
                      ) : (
                        ''
                      )}
                      <Link
                        className={`btn bg-secondary text-white ${cell.row.original.estado === 0 ? 'disabled' : ''}`}
                        to={`/${routeEdit}/${cell.row.original[cell.column.columnDef.idProperty]}`}
                      >
                        Editar <i className="fa-solid fa-pencil" />
                      </Link>
                    </>
                  ) : cell.column.id === 'estado' ? (
                    <StatusToggle
                      onCambioEstado={handleCambioEstado}
                      id={cell.row.original[cell.column.columnDef.idProperty]}
                      initialStatus={cell.row.original.estado}
                      toggleApi={toggleApi}
                    >
                      <Link
                        to={`/${routeEdit}/${cell.row.original[cell.column.columnDef.idProperty]}`}
                      ></Link>
                    </StatusToggle>
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
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </>
  );
}

export default TableInfo;
