import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Card, Typography } from "@material-tailwind/react";
 
export default function RolTable({roles}) {
    const rolesData = roles
    const navigate = useNavigate()
    const [estado, setStatus] = useState()
    const handleClick = (idRol, estado) => {
    const newStatus = estado === 1 ? 0 : 1
    console.log(idRol+"-"+estado+"-"+newStatus)
    setStatus(newStatus)
  }
  // const toggleStatus = (idRol, status) => {
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
            <th scope="col">Estado</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          {rolesData.map(({ idRol, nombre, estado }) => {
            return (
              <tr key={idRol}>
                <td>{idRol}</td>
                <td>{nombre}</td>
                <td>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault" 
                      value={estado} 
                      checked
                      onChange={() => handleClick(idRol, estado)}
                    />
                  </div>
                </td>
                <td>
                  <a
                    className="btn bg-secondary text-white"
                    onClick={ ()=> navigate(`/editarRol/${idRol}`)}
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