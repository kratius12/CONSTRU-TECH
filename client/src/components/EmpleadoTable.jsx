//import { useEmpleados } from "../context/EmpleadosProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import { Card, Typography } from "@material-tailwind/react";
 
export default function EmpleadoTable({empleados}) {
  const empleadosData = empleados
  const navigate = useNavigate()
  const [estadoEpm, setStatus] = useState()
  const handleClick = (idEmp, estado) => {
    const newStatus = estado === 1 ? 0 : 1
    console.log(idEmp+"-"+estado+"-"+newStatus)
    setStatus(newStatus)
  }
  // const toggleStatus = (idEmp, status) => {
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
            <th scope="col">Telófono</th>
            <th scope="col">Cédula</th>
            <th scope="col">Especialidad</th>
            <th scope="col">Estado</th>
            <th scope="col">Acción</th>
          </tr>
        </thead>
        <tbody>
          {empleadosData.map(({ idEmp, nombre, email, telefono, cedula, estado }) => {
            return (
              <tr key={idEmp}>
                <td>{idEmp}</td>
                <td>{nombre}</td>
                <td>{email}</td>
                <td>{telefono}</td>
                <td>{cedula}</td>
                <td>...</td>
                <td>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault" 
                      value={estado} 
                      checked
                      onChange={() => handleClick(idEmp, estado)}
                    />
                  </div>
                </td>
                <td>
                  <a
                    className="btn bg-secondary text-white"
                    onClick={ ()=> navigate(`/editarEmpleado/${idEmp}`)}
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