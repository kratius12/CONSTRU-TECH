import { useState } from "react";
import { useNavigate } from "react-router-dom";

 
export default function ProveedorTable({proveedores}) {
  const proveedoresData = proveedores
  const navigate = useNavigate()
  const [estadoProv, setStatus] = useState()
  const handleClick = (idProv, estado) => {
    const newStatus = estado === 1 ? 0 : 1
    console.log(idProv+"-"+estado+"-"+newStatus)
    setStatus(newStatus)
  }
  // const toggleStatus = (idProv, status) => {
  //   const newStatus = status === 1 ? 0 : 1
  //   setStatus(newStatus)
  // }
  return (
    <div>
      <table id="table" className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Telefono</th>
            <th scope="col">Tipo</th>
            <th scope="col">Contacto</th>
            <th scope="col">Dirección</th>
            <th scope="col">Estado</th>
            <th scope="col">Acción</th>
          </tr>
        </thead>
        <tbody>
          {proveedoresData.map(({ idProv, nombre, direccion, nit, tipo, email,telefono,estado,nombreContacto,telefonoContacto }) => {
            return (
              <tr key={idProv}>
                <td>{nombre}</td>
                <td>{email}</td>
                <td>{telefono}</td>
                <td>{nit}/{"\n"+tipo}</td>
                <td>{nombreContacto}/{"\n"+telefonoContacto}</td>
                <td>{direccion}</td>
                <td>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault" 
                      value={estado} 
                      checked
                      onChange={() => handleClick(idProv, estado)}
                    />
                  </div>
                </td>
                <td>
                  <a
                    className="btn bg-secondary text-white"
                    onClick={ ()=> navigate(`/editarProveedor/${idProv}`)}
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