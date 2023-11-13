import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ObrasPage from "./pages/ObrasPage";
import ObrasForm from "./pages/ObrasForm";
import MaterialesPage from "./pages/MaterialesPage";
import EmpleadosPage from "./pages/EmpleadosPage";
import FormMaterial from "./pages/FormMaterial";
import FormTemplate from "./pages/FormTemplate";
import EmpleadosForm from "./pages/EmpleadosForm";
import RolesForm from "./pages/RolesForm";
import RolesPage from "./pages/RolesPage";
import UsuariosPage from "./pages/UsuariosPage";
import Header from "./components/Header";
import { MaterialContextProvider } from "./context/MaterialesProvider";
import { ObraContextProvider } from "./context/ObrasProvider";
import { EmpleadoContextProvider } from "./context/EmpleadosProvider";
import { RolContextProvider } from "./context/RolesProvider";
import { UsuarioContextProvider } from "./context/UsuariosProvider";
import Sidebar from "./components/Sidebar";
function App() {
  return (
    <>

      <Header/>
      <div className="container-fluid">
        <div className="row">
          <Sidebar/>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <ObraContextProvider>
            <Routes>
              <Route path="/obras" element={<ObrasPage />} />
              <Route path="/new" element={<ObrasForm />} />
              <Route path="/edit/:id" element={<ObrasForm />} />
              <Route path="/formTemplate" element={<FormTemplate />} />      
              <Route path="/formTemplateEdit/:id" element={<FormTemplate />} />                  
            </Routes>           
            </ObraContextProvider> 
            <MaterialContextProvider>
              <Routes>
                <Route path="/materiales" element={<MaterialesPage />} />
                <Route path="/formMaterial" element={<FormMaterial/>} />
                <Route path="/formMaterialEdit/:id" element={<FormMaterial/>} />
              </Routes>
            </MaterialContextProvider>
            <EmpleadoContextProvider>
              <Routes>
                <Route path="/empleados" element={<EmpleadosPage/>} />
                <Route path="/agregarEmpleado" element={<EmpleadosForm/>} />
                <Route path="/editarEmpleado/:id" element={<EmpleadosForm/>} />
              </Routes>
            </EmpleadoContextProvider>
            <RolContextProvider>
              <Routes>
                <Route path="/roles" element={<RolesPage/>} />
                <Route path="/agregarRol" element={<RolesForm/>} />
                <Route path="/editarRol/:id" element={<RolesForm/>} />
              </Routes>
            </RolContextProvider>  
            <UsuarioContextProvider>
              <Routes>
                <Route path="/usuarios" element={<UsuariosPage/>} />
                {/* <Route path="/agregarUsuario" element={<UsuariosForm/>} />
                <Route path="/editarUsuario/:id" element={<UsuariosForm/>} /> */}
              </Routes>
            </UsuarioContextProvider>  
          </main>
        </div>
      </div>
      {/* <Navbar /> */}
      {/* <div className="container mx-auto py-4 px20">
        <ObraContextProvider>
          <Routes>
            <Route path="/obras" element={<ObrasPage />} />
            <Route path="/new" element={<ObrasForm />} />
            <Route path="/edit/:id" element={<ObrasForm />} />
            <Route path="/formTemplate" element={<FormTemplate />} />      
            <Route path="/formTemplateEdit/:id" element={<FormTemplate />} />                  
          </Routes>           
        </ObraContextProvider> 
        <MaterialContextProvider>
          <Routes>
            <Route path="/materiales" element={<MaterialesPage />} />
            <Route path="/formMaterial" element={<FormMaterial/>} />
            <Route path="/formMaterialEdit/:id" element={<FormMaterial/>} />
          </Routes>
        </MaterialContextProvider>
        <EmpleadoContextProvider>
          <Routes>
            <Route path="/empleados" element={<EmpleadosPage/>} />
            <Route path="/agregarEmpleado" element={<EmpleadosForm/>} />
            <Route path="/editarEmpleado/:id" element={<EmpleadosForm/>} />
          </Routes>
        </EmpleadoContextProvider>
      </div> */}
    </>
  )
}

export default App