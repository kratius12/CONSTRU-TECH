import { Link } from "react-router-dom";
export default function Sidebar() {

  return (
    <nav
    id="sidebarMenu"
    className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
  >
    <div className="position-sticky pt-3">
      <ul className="nav flex-column">
        <li className="nav-item">
        <Link className="nav-link" to="/"> 
          <i className="fa-solid fa-gauge-high" />
             Inicio
        </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" aria-current="page" href="usuarios.html">
            <i className="fa-solid fa-users" />
            Usuarios
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="roles.html">
            <i className="fa-solid fa-user-tie" />
            Roles
          </a>
        </li>
        <li className="nav-item">
        <Link className="nav-link active" to="/empleados">
            <i className="fa-solid fa-user-group" />
            Empleados
        </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="especialidad.html">
            <i className="fa-solid fa-screwdriver-wrench" />
            Especialidades
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="proveedores.html">
            <i className="fa-solid fa-truck" />
            Proveedores
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="materiales.html">
            <i className="fa-solid fa-box-open" />
            Materiales
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="categorias.html">
            <i className="fa-solid fa-book" />
            Categorias
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="compras.html">
            <i className="fa-solid fa-cart-shopping" />
            Compras
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="obras.html">
            <i className="fa-solid fa-map-location-dot" />
            Obras y tiempos
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="clientes.html">
            <i className="fa-solid fa-id-card" />
            Clientes
          </a>
        </li>
      </ul>
    </div>
  </nav>
  )
}
