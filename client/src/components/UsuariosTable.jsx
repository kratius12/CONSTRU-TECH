import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Card, Typography } from "@material-tailwind/react";
 
export default function UsuarioTable({usuarios}) {
    const usuariosData = usuarios
    const navigate = useNavigate()
    const [estado, setStatus] = useState()
    const handleClick = (idUsu, estado) => {
    const newStatus = estado === 1 ? 0 : 1
    console.log(idUsu+"-"+estado+"-"+newStatus)
    setStatus(newStatus)
  }
  // const toggleStatus = (idUsu, status) => {
  //   const newStatus = status === 1 ? 0 : 1
  //   setStatus(newStatus)
  // }
  return (
    <div>
      <table id="table" className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Empleado</th>
            <th scope="col">Rol</th>
            <th scope="col">Estado</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          {usuariosData.map(({ idUsu, idEmp, idRol, estado}) => {
            return (
              <tr key={idUsu}>
                <td>{idUsu}</td>
                <td>{idEmp}</td>
                <td>{idRol}</td>
                <td>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault" 
                      value={estado} 
                      checked
                      onChange={() => handleClick(idUsu, estado)}
                    />
                  </div>
                </td>
                <td>
                  <a
                    className="btn bg-secondary text-white"
                    onClick={ ()=> navigate(`/editarUsuario/${idUsu}`)}
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