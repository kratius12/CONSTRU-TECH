import { Link } from "react-router-dom";
import Logo from "../assets/img/logo.png";
import { useLocation } from "react-router-dom";
export default function Sidebar() {
  function HeaderView() {
    const location = useLocation();
    console.log(location.pathname);
    return "active"
  }
  return (
    <>    <ul className="navbar-nav bg-gradient-dark sidebar sidebar-dark accordion" id="accordionSidebar">
      <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
        <div className="sidebar-brand-text mx-3">
          <img
            src={Logo}
            className="d-inline-block align-text-top w-100"
          />
        </div>
      </Link>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item">
        <Link className="nav-link" to="/">
          <i className="fa-solid fa-gauge-high" />
          Inicio
        </Link>
      </li>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item">
        <Link className="nav-link" to="/usuarios">
          <i className="fa-solid fa-users" />
          Usuarios
        </Link>
      </li>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item">
        <Link className="nav-link" to="/roles">
          <i className="fa-solid fa-user-tie" />
          Roles
        </Link>
      </li>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item">
        <Link className="nav-link" to="/empleados">
          <i className="fa-solid fa-user-group" />
          Empleados
        </Link>
      </li>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item">
        <Link className="nav-link" to="/especialidades">
          <i className="fa-solid fa-screwdriver-wrench" />
          Especialidades
        </Link>
      </li>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item">
        <Link className="nav-link" to="/proveedores">
          <i className="fa-solid fa-truck" />
          Proveedores
        </Link>
      </li>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item">
        <Link className="nav-link" to="/materiales">
          <i className="fa-solid fa-box-open" />
          Materiales
        </Link>
      </li>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item">
        <Link className="nav-link" to="/categorias">
          <i className="fa-solid fa-book" />
          Categorias
        </Link>
      </li>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item">
        <Link className="nav-link" to="/compras">
          <i className="fa-solid fa-cart-shopping" />
          Compras
        </Link>
      </li>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item">
        <Link className="nav-link" to="/obras">
          <i className="fa-solid fa-map-location-dot" />
          Obras y tiempos
        </Link>
      </li>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item">
        <Link className="nav-link" to="/clientes">
          <i className="fa-solid fa-id-card" />
          Clientes
        </Link>
      </li>      
    </ul>
      
    </>

  )
}