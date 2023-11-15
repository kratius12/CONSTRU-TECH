import { useNavigate } from "react-router-dom";
export default function MaterialTable({ materiales }) {
    const materialesData = materiales
    const navigate = useNavigate()

    const handleClick = (idMat, estado) => {
        const newStatus = estado === 1 ? 0 : 1
        console.log(idMat + "-" + estado + "-" + newStatus)
    }
    return (
        <div>
            <table id="table" className="table table-striped table.sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Proveedor</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {materialesData.map(({ idMat, nombre, proveedor, cantidad,categoria,  estado }) => {
                        return (
                            <tr key={idMat}>
                                <td>{idMat}</td>
                                <td>{nombre}</td>
                                <td>{proveedor.nombre}</td>
                                <td>{cantidad}</td>
                                <td>{categoria.nombre}</td>
                                <td>
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="flexSwitchCheckDefault"
                                            value={estado}
                                            onChange={() => handleClick(materialesData.idMat, materialesData.estado)}
                                        />
                                    </div>
                                    {estado}
                                </td>
                                <td>
                                    <a
                                        className="btn bg-secondary text-white"
                                        onClick={() => navigate(`/editarMaterial/${idMat}`)}
                                    >
                                        Editar <span data-feather="edit-3" />
                                    </a>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}