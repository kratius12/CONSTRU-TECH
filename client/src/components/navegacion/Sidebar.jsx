import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo1.png";
import { useLocation } from "react-router-dom";
export default function Sidebar({userData}) {
  function HeaderView() {
    const location = useLocation();
    console.log(location.pathname);
    return "active"
  }

  const permisosUsuario = userData.rolesPermisos.map((rolPermiso) => String(rolPermiso.permiso.permiso).toLowerCase());
  
  return (
    <>    
    <ul className="navbar-nav bg-gradient-dark sidebar sidebar-dark accordion" id="accordionSidebar">
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
          <i className="fa-solid fa-home" />&nbsp;
          Inicio
        </Link>
      </li>      
      <hr className="sidebar-divider my-0" />
      <li className="nav-item">
        <Link className="nav-link" to="/dashboard">
          <i className="fa-solid fa-gauge-high" />&nbsp;
          Dashboard
        </Link>
      </li>
      <hr className="sidebar-divider my-0" />

      {permisosUsuario.includes('roles') && (

      <li className="nav-item">
        <Link className="nav-link" to="/roles">
          <i className="fa-solid fa-user-tie" />&nbsp;
          Roles
        </Link>
      </li>
      )}
      <hr className="sidebar-divider my-0" />
      {permisosUsuario.includes('empleados') && (
      <li className="nav-item">
        <Link className="nav-link" to="/empleados">
          <i className="fa-solid fa-user-group" />&nbsp;
          Empleados
        </Link>
      </li>
      )}
      <hr className="sidebar-divider my-0" />
      {permisosUsuario.includes('especialidades') && (
      <li className="nav-item">
        <Link className="nav-link" to="/especialidades">
          <i className="fa-solid fa-screwdriver-wrench" />&nbsp;
          Especialidades
        </Link>
      </li>
      )}
      <hr className="sidebar-divider my-0" />
      {permisosUsuario.includes('proveedores') &&  (
      <li className="nav-item">
        <Link className="nav-link" to="/proveedores">
          <i className="fa-solid fa-truck" />&nbsp;
          Proveedores
        </Link>
      </li>
      )}
      <hr className="sidebar-divider my-0" />
      {permisosUsuario.includes('materiales') && (
      <li className="nav-item">
        <Link className="nav-link" to="/materiales">
          <i className="fa-solid fa-box-open" />&nbsp;
          Materiales
        </Link>
      </li>
      )}
      <hr className="sidebar-divider my-0" />
      {permisosUsuario.includes('categorias') && (
      <li className="nav-item">
        <Link className="nav-link" to="/categorias">
          <i className="fa-solid fa-book" />&nbsp;
          Categorías
        </Link>
      </li>
      )}
      <hr className="sidebar-divider my-0" />
      {permisosUsuario.includes('compras') &&  (
      <li className="nav-item">
        <Link className="nav-link" to="/compras">
          <i className="fa-solid fa-cart-shopping" />&nbsp;
          Compras
        </Link>
      </li>
      )}
      <hr className="sidebar-divider my-0" />
      {permisosUsuario.includes('obras') && (
      <li className="nav-item">
        <Link className="nav-link" to="/obras">
          <i className="fa-solid fa-map-location-dot" />&nbsp;
          Obras y tiempos
        </Link>
      </li>
      )}
      <hr className="sidebar-divider my-0" />
      {permisosUsuario.includes('clientes') && (
      <li className="nav-item">
        <Link className="nav-link" to="/clientes">
          <i className="fa-solid fa-id-card" />&nbsp;
          Clientes
        </Link>
      </li>     
      )} 
    </ul>
    </>
  )
}