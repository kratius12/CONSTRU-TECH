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
import { Table as BTable, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import StatusToggle from '../togglEstado/StatusToggle';
import StatusToggleEmpleados from '../togglEstado/StatusToggleEmpleados';
import AlertDetail from '../togglEstado/AlertDetail';
import "./Tableinfo.css"

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
    setEstado((prevState) => ({ ...prevState, [id]: { id, estado: nuevoEstado } }))
    onChangeStatus(id, nuevoEstado)

  }
  const isDisabled = (id) => estado[id] == true ? 'enabled' : 'disabled'
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
      <div className='d-none d-md-block'>
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
                      {/* <Link
                        className={`btn bg-secondary text-white ${cell.row.original.estado === 0 ? 'disabled' : ''}`}
                        to={`/${routeEdit}/${cell.row.original[cell.column.columnDef.idProperty]}`}
                      >
                        Editar <i className="fa-solid fa-pencil" />
                      </Link> */}
                      {entity === 'Rol' && cell.row.original[cell.column.columnDef.idProperty] === 1 || entity === 'Empleado' && cell.row.original[cell.column.columnDef.idProperty] === 1 ? (
                        <button className='btn btn-default'><i className="fa-solid fa-lock fs-1"></i></button>
                      ): <Link
                      className={`btn bg-secondary text-white ${cell.row.original.estado === 0 ? 'disabled' : ''}`}
                      to={`/${routeEdit}/${cell.row.original[cell.column.columnDef.idProperty]}`}
                    >
                      Editar <i className="fa-solid fa-pencil" />
                    </Link>}
                    </>
                  ) : cell.column.id === 'estado' ? (
                    entity === 'Rol' && cell.row.original[cell.column.columnDef.idProperty] === 1 || entity === 'Empleado' && cell.row.original[cell.column.columnDef.idProperty] === 1 ? (
                      <button className='btn btn-default'><i className="fa-solid fa-lock fs-1"></i></button>
                    ): entity === 'Empleado' ? (
                      <StatusToggleEmpleados
                    onCambioEstado={handleCambioEstado}
                    id={cell.row.original[cell.column.columnDef.idProperty]}
                    initialStatus={cell.row.original.estado}
                    toggleApi={toggleApi}
                    entity={entity}
                  >
                    <Link
                      to={`/${routeEdit}/${cell.row.original[cell.column.columnDef.idProperty]}`}
                    ></Link>
                  </StatusToggleEmpleados>
                    ):
                    <StatusToggle
                    onCambioEstado={handleCambioEstado}
                    id={cell.row.original[cell.column.columnDef.idProperty]}
                    initialStatus={cell.row.original.estado}
                    toggleApi={toggleApi}
                    entity={entity}
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
      </div>
      <div className="d-md-none">
        {table.getRowModel().rows.map((row) => (
          <Card key={row.id} className="mb-3">
            <Card.Body>
              {row.getVisibleCells().map((cell) => (
                <div key={cell.id} className="mb-2">
                  <strong>{cell.column.columnDef.header}:</strong>&nbsp;
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
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
                </div>
              ))}
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
            &nbsp;
          </a>
        </div>
      </div>
    </>
  );
}

export default TableInfo;
