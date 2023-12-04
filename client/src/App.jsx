import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ObrasPage from "./pages/ObrasPage";
import ObrasForm from "./pages/ObrasForm";
import MaterialesPage from "./pages/materiales/MaterialesPage";
import EmpleadosPage from "./pages/EmpleadosPage";
import ClientPage from "./pages/ClientPage";
import MaterialesForm from "./pages/materiales/MaterialesForm";
import FormTemplate from "./pages/FormTemplate";
import EmpleadosForm from "./pages/EmpleadosForm";
import ClientForm from "./pages/ClientForm";
import Header from "./components/Header";
import { CategoriaContextProvider } from "./context/CategoriasProvider";
import { EspecialidadContextProvider } from "./context/EspecialidadesProvider";
import { MaterialContextProvider } from "./context/materiales/MaterialesProvider";
import { ObraContextProvider } from "./context/ObrasProvider";
import { EmpleadoContextProvider } from "./context/EmpleadosProvider";
import { ProveedorContextProvider } from './context/proveedores/ProveedorProvider'
import { ClientContextProvider } from "./context/ClientesProvider";
import { CompraContextProvider } from './context/compras/ComprasProvider'
import { RolContextProvider } from "./context/RolesProvider";
import { UsuarioContextProvider } from "./context/UsuariosProvider";

import ProveedoresPage from './pages/proveedores/ProveedorPage'
import ProveedoresForm from "./pages/proveedores/ProveedoresForm";
import RolesForm from "./pages/RolesForm";
import RolesPage from "./pages/RolesPage";

import LoginPage from "./pages/LoginPage";"./pages/LoginPage";

// import UsuariosPage from "./pages/UsuariosPage";



import ComprasPage from "./pages/compras/Compraspage";
import ComprasForm from "./pages/compras/ComprasForm";
import Sidebar from "./components/Sidebar";
import EspecialidadesPage from "./pages/EspecialidadesPage";
import EspecialidadesForm from "./pages/EspecialidadesForm";
import CategoriasPage from "./pages/CategoriasPage";
import CategoriasForm from "./pages/CategoriasForm";
import Navbar from "./components/Navbar"
function App() {
  return (
    <>
      <div id="page-top">
        <div className="" id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Navbar />
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
                  </Routes>
                </CompraContextProvider>
                <RolContextProvider>
                  <Routes>
                    <Route path="/roles" element={<RolesPage />} />
                    <Route path="/agregarRol" element={<RolesForm />} />
                    <Route path="/editarRol/:id" element={<RolesForm />} />
                  </Routes>
                </RolContextProvider>
                <UsuarioContextProvider>
                  <Routes>
                    <Route path="/usuarios" element={<UsuariosPage/>} />
                    <Route path="/agregarUsuario" element={<UsuariosForm />} />
                    <Route path="/editarUsuario/:id" element={<UsuariosForm />} />
                  </Routes>
                </UsuarioContextProvider>

              </div>
            </div>
          </div>
        </div>
        {/* <Header />
        <div className="container-fluid">
          <div className="row">
            <Sidebar />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

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
                </Routes>
              </ClientContextProvider>
              <CompraContextProvider>
                <Routes>
                  <Route path="/compras" element={<ComprasPage />}></Route>
                  <Route path="/agregarCompras" element={<ComprasForm />}></Route>
                </Routes>
              </CompraContextProvider>
              <RolContextProvider>
                <Routes>
                  <Route path="/roles" element={<RolesPage/>} />
                  <Route path="/agregarRol" element={<RolesForm/>} />
                  <Route path="/editarRol/:id" element={<RolesForm/>} />
                </Routes>
              </RolContextProvider>  
            </main>
          </div>
        </div> */}
      </div>
    </>
  )
}

export default App