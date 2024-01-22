import { Route, Routes, Link } from "react-router-dom";
import ReactDOMServer from 'react-dom/server';
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

import ForgotPage from "./pages/login/ForgotPage";

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
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const EmailForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <form action="" className="formName" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Para cambiar su contraseña, por favor ingrese email</label>
        <input
          type="text"
          placeholder="Su email"
          className="email form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
    </form>
  );
};

const CodeForm = ({ onSubmit }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(code);
  };

  return (
    <form action="" className="formName" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Se ha enviado un código de confirmación al correo ingresado</label>
        <input
          type="text"
          placeholder="ingrese su código"
          className="code form-control"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
      </div>
    </form>
  );
};

const PasswordForm = ({ onSubmit }) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(password,passwordConfirm);
  };

  return (
    <form action="" className="formName" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Ingrese su nueva contraseña</label>
        <input
          type="password"
          placeholder="ingrese su nueva contraseña"
          className="password form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Confirme su nueva contraseña</label>
        <input
          type="password"
          placeholder="confirme su nueva contraseña"
          className="passwordconfirm form-control"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
        />
      </div>
    </form>
  );
};

function App() {

  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? true : false;
  });

  const [email, setEmail] = useState('')


  const handleLogin = () =>{

    setLoggedIn(true)
    navigate('/dashboard')
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
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
          content: "Usuario o contraseña incorrectss...",
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
        try {

          const data = await response.json();
          localStorage.setItem('token', data.token)
          const token = localStorage.getItem('token')
          const [header, payload, signature] = token.split('.');
          const decodedToken = JSON.parse(atob(payload));
          if (decodedToken) {
              localStorage.setItem('userData', JSON.stringify(decodedToken));
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
                      navigate("/dashboard")
                  },
                }
              })        
              handleLogin()
              setUsername('')
              setPassword('')
          }else{
            console.log('No se pudo codificar el token')
          }

        } catch (error) {
          console.log("Error al decodificar el token:", error)
        }
      }else{
        console.log("Error al iniciar sesion")
      }

    } catch (error) {
       console.log(error)
    }
  }

  const showConfirmationDialog = (onSubmit) => {

    const formHtml = ReactDOMServer.renderToString(<EmailForm onSubmit={onSubmit}/>)

    $.confirm({
      title: 'Olvide mi contraseña',
      content: formHtml, // Renderiza el formulario de React dentro de la confirmación de jQuery
      icon: 'fa fa-user-lock',
      theme: 'modern',
      closeIcon: true,
      animation: 'zoom',
      closeAnimation: 'scale',
      animationSpeed: 500,
      type: 'orange',
      columnClass:'col-md-6 col-md-offset-3',
      buttons: {
        formSubmit: {
          text: 'Enviar',
          btnClass: 'btn-blue',
          action: function () {
            var email = this.$content.find('.email').val();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!email || !emailRegex.test(email)) {
              $.alert('Por favor, ingrese un correo electrónico válido');
              return false;
            }
            // Puedes hacer algo con el email aquí si es necesario
            onSubmit(email);
          },
        },
        cancelar: function () {
          // Cierra la confirmación
        },
      },
      onContentReady: function () {
        // bind to events
        var jc = this;
        this.$content.find('form').on('submit', function (e) {
          // Si el usuario envía el formulario presionando Enter en el campo.
          e.preventDefault();
          jc.$$formSubmit.trigger('click'); // referencia al botón y haz clic en él
        });
      },
    });
  };

  const handleOpenDialog = async () => {
    try {
      const email = await new Promise((resolve, reject) => {
        showConfirmationDialog((inputEmail) => {
          resolve(inputEmail);
        });
      });
  
      const response = await fetch('http://localhost:4000/sendCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (response.status === 200) {
        await new Promise((resolve, reject) => {
          showCodeDialog((code) => {
            resolve(code);
          });
        });
      } else if (response.status === 404) {
        $.alert('Error, código invalido.');
      }
    } catch (error) {
      console.log(error);
    }
  };


  const showCodeDialog = async (onSubmit) => {
    const formHtml = ReactDOMServer.renderToString(<CodeForm onSubmit={onSubmit}/>);
  
    $.confirm({
      title: 'Código de confirmación',
      content: formHtml,
      icon: 'fa fa-user-lock',
      theme: 'modern',
      closeIcon: true,
      animation: 'zoom',
      closeAnimation: 'scale',
      animationSpeed: 500,
      type: 'blue',
      columnClass: 'col-md-6 col-md-offset-3',
      buttons: {
        formSubmit: {
          text: 'Enviar',
          btnClass: 'btn-blue',
          action: async function () {
            var code = this.$content.find('.code').val();
            
            if (!code) {
              $.alert('Por favor, ingrese un código válido');
              return false;
            }
  
            try {
              const response = await fetch('http://localhost:4000/checkCode', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
              });
  
              if (response.status === 200) {
                const data = await response.json();
                setEmail(data.code)
                // Ahora, después de la verificación del código, decidimos qué hacer
                handleCodeDialog(data);
              } else if (response.status === 404) {
                $.alert('Error, código invalido.');
              }
            } catch (error) {
              console.log(error);
            }
          },
        },
        cancelar: function () {
          // Cierra la confirmación
        },
      },
      onContentReady: function () {
        // bind to events
        var jc = this;
        this.$content.find('form').on('submit', function (e) {
          e.preventDefault();
          jc.$$formSubmit.trigger('click');
        });
      },
    });
  };
  
  const handleCodeDialog = async (data) => {
    await new Promise((resolve, reject) => {
      showPasswordDialog((password, passwordConfirm) => {
        resolve({ data, password, passwordConfirm });
      });
    });
  };
  
  const showPasswordDialog = async (onSubmit) => {
    const formHtml = ReactDOMServer.renderToString(<PasswordForm onSubmit={onSubmit}/>);
  
    $.confirm({
      title: 'Cambio de contraseña',
      content: formHtml,
      icon: 'fa fa-user-lock',
      theme: 'modern',
      closeIcon: true,
      animation: 'zoom',
      closeAnimation: 'scale',
      animationSpeed: 500,
      type: 'blue',
      columnClass: 'col-md-6 col-md-offset-3',
      buttons: {
        formSubmit: {
          text: 'Enviar',
          btnClass: 'btn-blue',
          action: async function () {
            var password = this.$content.find('.password').val();
            var passwordConfirm = this.$content.find('.passwordconfirm').val();
  
            if (!password || !passwordConfirm) {
              $.alert('Por favor ingrese contraseña y confirme su contraseña');
              return false;
            } else if (password !== passwordConfirm) {
              $.alert('Las contraseñas no coinciden');
              return false;
            }
  
            try {
              const response = await fetch('http://localhost:4000/password', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password, email }),
              });
  
              if (response.status === 200) {
                $.alert('Cambio de contraseña exitoso!');
              } else if (response.status === 404) {
                $.alert('Error, código invalido.');
              }
            } catch (error) {
              console.log(error);
            }
          },
        },
        cancelar: function () {
          // Cierra la confirmación
        },
      },
      onContentReady: function () {
        // bind to events
        var jc = this;
        this.$content.find('form').on('submit', function (e) {
          e.preventDefault();
          jc.$$formSubmit.trigger('click');
        });
      },
    });
  };

  const handlePasswordDialog = () => {
    showPasswordDialog( async (password, passwordConfirm) => {
      try {
        const response = await fetch('http://localhost:4000/password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({password, passwordConfirm})
        })       

        if (response.status === 200) {
          
          
        }else if(response.status === 404){
          $.alert('Error, codigo invalido.');
        }

      } catch (error) {
        console.log(error)
      }
    });
  };

  return (
    <>
      {loggedIn ? (
        <div id="page-top">
        <div className="" id="wrapper">
          <Sidebar userData={JSON.parse(localStorage.getItem('userData'))} />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Navbar handleLogout={handleLogout} userData={JSON.parse(localStorage.getItem('userData'))} />
              <div className="container-fluid">
                <DashboardContextProvider>
                  <Routes>
                    <Route path="/dashboard" element={<DashboardPage />} />
                  </Routes>
                </DashboardContextProvider>
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
                    {/* <Route path="/login" element={<LoginPage />}></Route> */}
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
                                                      required
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
                                                      required
                                                  />
                                              </div>
                                              <button type="submit" className="btn btn-primary btn-user btn-block">
                                                  Ingresar
                                                  </button>                                                        
                                              <hr />
                                          </form>
                                        <div className="text-center">
                                            <a className="small" href="#" onClick={handleOpenDialog}>
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
      </>  
      )
      }
    </>
  );
}

export default App