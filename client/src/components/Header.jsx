import { Fragment } from 'react'
import  Button  from 'react-bootstrap/Button';
import Logo from "../assets/img/logo.png";

const user = {
  name: 'Kevin Castrillon',
  email: 'kevin@constru-tech.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'OBRAS', href: '/obras', current: true, subpage:{status:true,subname:"Agregar obra"} },
  { name: 'Materiales', href: '/materiales', current: false },
  { name: 'Empleados', href: '/empleados', current: false }
]
const userNavigation = [
  { name: 'Mi perfil', href: '#' },
  { name: 'Configuracion', href: '#' },
  { name: 'Cerrar sesion', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  return (

    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 bg-white" href="#">
      <img
        src={Logo}
        className="d-inline-block align-text-top w-50"
      />
    </a>
    <button
      className="navbar-toggler position-absolute d-md-none collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#sidebarMenu"
      aria-controls="sidebarMenu"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="navbar-nav">
      <div className="nav-item text-nowrap">
        <a className="nav-link px-3" href="#">
          Perfil
        </a>
      </div>
    </div>
  </header>
  )
}
