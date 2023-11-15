
import { useNavigate } from "react-router-dom";

 
export default function CategoriaTable({categorias}) {
  const bodyData = categorias
  const navigate = useNavigate()

  return (
    <div>
      <table id="table" className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Categoria</th>
            <th scope="col">Medida</th>
            <th scope="col">Estado</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          {bodyData.map(({ idcat, nombre, medida, estado }) => {
            return (
              <tr key={idcat}>
                <td>{idcat}</td>
                <td>{nombre}</td>
                <td>{medida}</td>
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
                    onClick={ ()=> navigate(`/editarCategoria/${idcat}`)}
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