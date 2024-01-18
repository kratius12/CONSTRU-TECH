import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ObrasPage from "./pages/obras/ObrasPage";
import ObrasForm from "./pages/obras/ObrasForm";
import MaterialesPage from "./pages/materiales/MaterialesPage";
import EmpleadosPage from "./pages/empleados/EmpleadosPage";
import ClientPage from "./pages/clientes/ClientPage";
import MaterialesForm from "./pages/materiales/MaterialesForm";
import EmpleadosForm from "./pages/empleados/EmpleadosForm";
import ClientForm from "./pages/clientes/ClientForm";
import DashboardPage from "./pages/dashboard/DashboardPage";

import { CategoriaContextProvider } from "./context/categorias/CategoriasProvider";
import { EspecialidadContextProvider } from "./context/especialidades/EspecialidadesProvider";
import { MaterialContextProvider } from "./context/materiales/MaterialesProvider";
import { ObraContextProvider } from "./context/obras/ObrasProvider";
import { EmpleadoContextProvider } from "./context/empleados/EmpleadosProvider";
import { ProveedorContextProvider } from './context/proveedores/ProveedorProvider'
import { ClientContextProvider } from "./context/clientes/ClientesProvider";
import { CompraContextProvider } from './context/compras/ComprasProvider'
import { RolContextProvider } from "./context/roles/RolesProvider";
import { UsuariosContextProvider } from "./context/usuarios/UsuariosProvider";
import { PermisoContextProvider } from "./context/permisos/PermisosProvider";
import { DashboardContextProvider } from "./context/dashboard/DashboardProvider";
import { LoginContextProvider } from "./context/login/LoginProvider";

import ProveedoresPage from './pages/proveedores/ProveedorPage'
import ProveedoresForm from "./pages/proveedores/ProveedoresForm";
import RolesForm from "./pages/roles/RolesForm";
import RolesPage from "./pages/roles/RolesPage";
import PermisosPage from "./pages/permisos/PermisosPage";
import PermisosForm from "./pages/permisos/PermisosForm";

import LoginPage from "./pages/usuarios/LoginPage";

import UsuariosPage from "./pages/usuarios/UsuariosPage";
import UsuariosForm from "./pages/usuarios/UsuariosForm";

import ComprasPage from "./pages/compras/Compraspage";
import ComprasForm from "./pages/compras/ComprasForm";
import Sidebar from "./components/Sidebar";
import EspecialidadesPage from "./pages/especialidades/EspecialidadesPage";
import EspecialidadesForm from "./pages/especialidades/EspecialidadesForm";
import CategoriasPage from "./pages/categorias/CategoriasPage";
import CategoriasForm from "./pages/categorias/CategoriasForm";
import Navbar from "./components/Navbar"
import DetalleCompra from "./pages/compras/DetalleCompra";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function App() {

  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);


  const handleLogin = () =>{

    setLoggedIn(true)
    navigate('/obras')
  }

  const handleLogout = () => {
    setLoggedIn(false)
    navigate('/signin')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password})
      })

      if (response.status === 404) {
        $.confirm({
          title:'Credenciales incorrectas',
          content: "Usuario o contraseña incorrectas...",
          icon: 'fa fa-x-mark',
          theme: 'modern',
          closeIcon: true,
          animation: 'zoom',
          closeAnimation: 'scale',
          animationSpeed: 500,
          type: 'red',
          columnClass: 'col-md-6 col-md-offset-3',
          buttons: {
            cerrar: function () {
            },
          }
        })
        
      } else if(response.status === 200) {
        $.confirm({
          title:'Inicio de sesion con exito!',
          content: "Redirecionando...",
          icon: 'fa fa-check',
          theme: 'modern',
          closeIcon: true,
          animation: 'zoom',
          closeAnimation: 'scale',
          animationSpeed: 1500,
          type: 'green',
          columnClass: 'col-md-6 col-md-offset-3',
          autoClose: 'okay|4000',
          buttons: {
            okay: function () {
                navigate("/obras")
            },
          }
        })        
        handleLogin()
        setUsername('')
        setPassword('')
      }else{
        console.log("Error al iniciar sesion")
      }

    } catch (error) {
       console.log(error)
    }
  }

  return (
    <>
      {loggedIn ? (
        <div id="page-top">
        <div className="" id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Navbar handleLogout={handleLogout} />
              <div className="container-fluid">

                <ObraContextProvider>
                  <Routes>
                    <Route path="/obras" element={<ObrasPage />} />
                    <Route path="/agregarObra" element={<ObrasForm />} />
                    <Route path="/editarObra/:id" element={<ObrasForm />} />
                  </Routes>
                </ObraContextProvider>
                <MaterialContextProvider>
                  <Routes>
                    <Route path="/materiales" element={<MaterialesPage />} />
                    <Route path="/agregarMaterial" element={<MaterialesForm />} />
                    <Route path="/editarMaterial/:id" element={<MaterialesForm />} />
                  </Routes>
                </MaterialContextProvider>
                <EmpleadoContextProvider>
                  <Routes>
                    <Route path="/empleados" element={<EmpleadosPage />} />
                    <Route path="/agregarEmpleado" element={<EmpleadosForm />} />
                    <Route path="/editarEmpleado/:id" element={<EmpleadosForm />} />
                  </Routes>
                </EmpleadoContextProvider>
                <EspecialidadContextProvider>
                  <Routes>
                    <Route path="/especialidades" element={<EspecialidadesPage />} />
                    <Route path="/agregarEspecialidad" element={<EspecialidadesForm />} />
                    <Route path="/editarEspecialidad/:id" element={<EspecialidadesForm />} />
                  </Routes>
                </EspecialidadContextProvider>
                <CategoriaContextProvider>
                  <Routes>
                    <Route path="/categorias" element={<CategoriasPage />} />
                    <Route path="/agregarCategoria" element={<CategoriasForm />} />
                    <Route path="/editarCategoria/:id" element={<CategoriasForm />} />
                  </Routes>
                </CategoriaContextProvider>
                <ProveedorContextProvider>
                  <Routes>
                    <Route path="/proveedores" element={<ProveedoresPage />}></Route>
                    <Route path="/agregarProveedor" element={<ProveedoresForm />}></Route>
                    <Route path="/editarProveedor/:id" element={<ProveedoresForm />}></Route>
                  </Routes>
                </ProveedorContextProvider>
                <ClientContextProvider>
                  <Routes>
                    <Route path="/clientes" element={<ClientPage />}></Route>
                    <Route path="/agregarCliente" element={<ClientForm />}></Route>
                    <Route path="/editarCliente/:id" element={<ClientForm />}></Route>
                    <Route path="/login" element={<LoginPage />}></Route>
                  </Routes>
                </ClientContextProvider>
                <CompraContextProvider>
                  <Routes>
                    <Route path="/compras" element={<ComprasPage />}></Route>
                    <Route path="/agregarCompras" element={<ComprasForm />}></Route>
                    <Route path="/compra/:id" element={<DetalleCompra />}></Route>
                  </Routes>
                </CompraContextProvider>
                <RolContextProvider>
                  <Routes>
                    <Route path="/roles" element={<RolesPage />} />
                    <Route path="/agregarRol" element={<RolesForm />} />
                    <Route path="/editarRol/:id" element={<RolesForm />} />
                  </Routes>
                </RolContextProvider>
                <PermisoContextProvider>
                  <Routes>
                    <Route path="/permisos" element={<PermisosPage />} />
                    <Route path="/agregarPermiso" element={<PermisosForm />} />
                    <Route path="/editarPermiso/:id" element={<PermisosForm />} />
                  </Routes>
                </PermisoContextProvider>
                <UsuariosContextProvider>
                  <Routes>
                    <Route path="/usuarios" element={<UsuariosPage/>} />
                    <Route path="/agregarUsuario" element={<UsuariosForm />} />
                    <Route path="/editarUsuario/:id" element={<UsuariosForm />} />
                  </Routes>
                </UsuariosContextProvider> 
              </div>
            </div>
          </div>
        </div>
      </div>
      ) : (
        <>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Constru-tech</title>
        <link
            href="src/assets/vendor/fontawesome-free/css/all.min.css"
            rel="stylesheet"
            type="text/css"
        />
        <link
            href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
            rel="stylesheet"
        />
        <link href="src/assets/css/template/sb-admin-2.css" rel="stylesheet" />
        <div className="container">

            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Iniciar Sesion</h1>
                                        </div>
                                          <form className="user" onSubmit={handleSubmit}>
                                              <div className="form-group">
                                                  <label htmlFor="correo"></label>
                                                  <input
                                                      type="email"
                                                      className="form-control form-control-user"
                                                      id="correo"
                                                      onChange={(e) => setUsername(e.target.value)}
                                                      value={username}
                                                      aria-describedby="emailHelp"
                                                      placeholder="Ingrese el correo electrónico"
                                                  />
                                              </div>
                                              <div className="form-group">
                                                  <label htmlFor="contrasena"></label>
                                                  <input
                                                      type="password"
                                                      className="form-control form-control-user"
                                                      onChange={(e) => setPassword(e.target.value)}
                                                      value={password}
                                                      id="contrasena"
                                                      placeholder="Ingrese la contraseña"
                                                  />
                                              </div>
                                              <button type="submit" className="btn btn-primary btn-user btn-block">
                                                  Ingresar
                                                  </button>                                                        
                                              <hr />
                                          </form>
                                        <div className="text-center">
                                            <a className="small" href="#">
                                                ¿Olvidó su contraseña?
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </>  
      )
      }
    </>
  );
}

export default App