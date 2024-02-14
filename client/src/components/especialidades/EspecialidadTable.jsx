
import { useNavigate } from "react-router-dom";

 
export default function EspecialidadTable({especialidades}) {
  const bodyData = especialidades
  const navigate = useNavigate()

  return (
    <div>
      <table id="table" className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Especialidad</th>
            <th scope="col">Estado</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          {bodyData.map(({ id, especialidad, estado }) => {
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{especialidad}</td>
                <td>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault" 
                      value={estado} 
                      {...estado == 1 ? "checked":""}
                      // onChange={() => handleClick(idEsp, estado)}
                    />
                  </div>
                </td>
                <td>
                  <a
                    className="btn bg-secondary text-white"
                    onClick={ ()=> navigate(`/editarEspecialidad/${id}`)}
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