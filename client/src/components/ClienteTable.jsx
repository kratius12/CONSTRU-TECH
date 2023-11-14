import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function ClienteTable({ clientes }) {
  const clientesData = clientes
  const navigate = useNavigate()
  const [estadoCli, setStatus] = useState()
  const handleClick = (idCli, estado) => {
    const newStatus = estado === 1 ? 0 : 1
    console.log(idCli + "-" + estado + "-" + newStatus)
    setStatus(newStatus)
  }
  return (

    <div>
          <table id="table" className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombres</th>
                <th scope="col">Apellidos</th>
                {/* <th scope="col">Correo</th> */}
                <th scope="col">Direccion</th>
                <th scope="col">Telefono</th>
                <th scope="col">Cedula</th>
                {/* <th scope="col">Fecha de nacimiento</th> */}
                <th scope="col">Estado</th>
                <th scope="col">Ver detalles</th>
                <th scope="col">Accion</th>
              </tr>
            </thead>
            <tbody>
              {clientesData.map(({ idCli, nombre, email, direccion, telefono, cedula, fecha_nac, estado,apellidos,tipoDoc,contrasena }) => {
                return (
                  <tr key={idCli}>
                    <td>{idCli}</td>
                    <td>{nombre}</td>
                    <td>{apellidos}</td>
                    {/* <td>{email}</td> */}
                    <td>{direccion}</td>
                    <td>{telefono}</td>
                    {/* <td>{tipoDoc}</td> */}
                    <td>{cedula}</td>
                    {/* <td>{fecha_nac}</td> */}
                    {/* <td>{contrasena}</td> */}
                    {/* <td>{estado}</td> */}
                    <td>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckDefault" 
                          value={estado} 
                          checked
                          onChange={() => handleClick(idCli, estado)}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="form-redirect form-button">
                        <a 
                        className="btn bg-secondary text-white" 
                        onClick={() => navigate(`/clientes/${idCli}`)}>
                          {""}
                          Ver detalles <span data-feather="edit-3" /> {""}
                        </a>
                      </div>
                    </td>
                    <td>
                      <button id="detalle"
                        className="btn bg-secondary text-white"
                        onClick={ ()=> navigate(`/editarCliente/${idCli}`)}
                      >
                        {" "}
                        Editar <span data-feather="edit-3" />{" "}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
    );
}