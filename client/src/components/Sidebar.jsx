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
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
          <div className="sidebar-brand-text mx-3">
          <img
              src={Logo}
              className="d-inline-block align-text-top w-100"
            />
          </div>
        </Link>
      <hr className="sidebar-divider my-0"/>  
      <li className="nav-item">
        <Link className="nav-link" to="/">
          <i className="fa-solid fa-gauge-high" />
           Inicio
        </Link>
      </li>
    </ul>
    // <nav
    //   id="sidebarMenu"
    //   className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    // >
    //   <div className="position-sticky pt-3">
    //     <ul className="nav flex-column">
    //       <li className="nav-item">
    //         <Link className="nav-link" to="/">
    //           <i className="fa-solid fa-gauge-high" />
    //           Inicio
    //         </Link>
    //       </li>
    //       <li className="nav-item">
    //         <a className="nav-link" aria-current="page" href="/usuarios">
    //           <i className="fa-solid fa-users" />
    //           Usuarios
    //         </a>
    //       </li>
    //       <li className="nav-item">
    //         <a className="nav-link" href="/roles">
    //           <i className="fa-solid fa-user-tie" />
    //           Roles
    //         </a>
    //       </li>
    //       <li className="nav-item">
    //       <Link className="nav-link" to="/empleados">
    //           <i className="fa-solid fa-user-group" />
    //           Empleados
    //       </Link>
    //       </li>
    //       <li className="nav-item">
    //       <Link className="nav-link " to="/especialidades">
    //           <i className="fa-solid fa-screwdriver-wrench" />
    //           Especialidades
    //       </Link>
    //       </li>
    //       <li className="nav-item">
    //         <Link className="nav-link" to="/proveedores">
    //           <i className="fa-solid fa-truck" />
    //           Proveedores
    //           </Link>
    //       </li>
    //       <li className="nav-item">
    //         <Link className="nav-link" to="/materiales">
    //           <i className="fa-solid fa-box-open" />
    //           Materiales
    //         </Link>
    //       </li>
    //       <li className="nav-item">

    //       <Link className="nav-link " to="/categorias">
    //           <i className="fa-solid fa-book" />
    //           Categorias
    //       </Link>
    //       </li>
    //       <li className="nav-item">
    //         <Link className="nav-link" to="/compras">
    //           <i className="fa-solid fa-cart-shopping" />
    //           Compras
    //         </Link>
    //       </li>
    //       <li className="nav-item">
    //         <a className="nav-link" href="#">
    //           <i className="fa-solid fa-map-location-dot" />
    //           Obras y tiempos
    //         </a>
    //       </li>
    //       <li className="nav-item">
    //         <Link className="nav-link" to="/clientes">
    //           <i className="fa-solid fa-id-card" />
    //           Clientes
    //           </Link>
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
  )
}
