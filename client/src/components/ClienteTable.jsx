import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Card, Typography } from "@material-tailwind/react";
 
export default function ClienteTable({clientes}) {
    const clientesData = clientes
    const navigate = useNavigate()
    const [estado, setStatus] = useState()
    const handleClick = (idCli, estado) => {
    const newStatus = estado === 1 ? 0 : 1
    console.log(idCli+"-"+estado+"-"+newStatus)
    setStatus(newStatus)
  }
  // const toggleStatus = (idCli, status) => {
  //   const newStatus = status === 1 ? 0 : 1
  //   setStatus(newStatus)
  // }
  return (
    <div>
      <table id="table" className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Correo</th>
            <th scope="col">Direccion</th>
            <th scope="col">Telefono</th>
            <th scope="col">Cedula</th>
            <th scope="col">Fecha de nacimiento</th>
            <th scope="col">Estado</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          {clientesData.map(({ idCli, nombre, email, direccion, telefono, cedula, fecha_nac, estado }) => {
            return (
              <tr key={idCli}>
                <td>{idCli}</td>
                <td>{nombre}</td>
                <td>{email}</td>
                <td>{direccion}</td>
                <td>{telefono}</td>
                <td>{cedula}</td>
                <td>{fecha_nac}</td>
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
                  <a
                    className="btn bg-secondary text-white"
                    onClick={ ()=> navigate(`/editarCliente/${idCli}`)}
                  >
                    {" "}
                    Editar <span data-feather="edit-3" />{" "}
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}