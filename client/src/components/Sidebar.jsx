import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function Sidebar() {
  function HeaderView() {
    const location = useLocation();
    console.log(location.pathname);
    return "active"
  }
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
          <Link className="nav-link" to="/empleados">
              <i className="fa-solid fa-user-group" />
              Empleados
          </Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link " to="/especialidades">
              <i className="fa-solid fa-screwdriver-wrench" />
              Especialidades
          </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/proveedores">
              <i className="fa-solid fa-truck" />
              Proveedores
              </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fa-solid fa-box-open" />
              Materiales
            </a>
          </li>
          <li className="nav-item">
          <Link className="nav-link " to="#">
              <i className="fa-solid fa-book" />
              Categorias
          </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fa-solid fa-cart-shopping" />
              Compras
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fa-solid fa-map-location-dot" />
              Obras y tiempos
            </a>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/clientes">
              <i className="fa-solid fa-id-card" />
              Clientes
              </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
