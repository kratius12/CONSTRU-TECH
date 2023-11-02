import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ObrasPage from "./pages/ObrasPage";
import ObrasForm from "./pages/ObrasForm";
import MaterialesPage from "./pages/MaterialesPage";
import EmpleadosPage from "./pages/EmpleadosPage";
import FormMaterial from "./pages/FormMaterial";
import FormTemplate from "./pages/FormTemplate";
import EmpleadosForm from "./pages/EmpleadosForm";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import { CategoriaContextProvider } from "./context/CategoriasProvider";
import { EspecialidadContextProvider } from "./context/EspecialidadesProvider";
import { MaterialContextProvider } from "./context/MaterialesProvider";
import { ObraContextProvider } from "./context/ObrasProvider";
import { EmpleadoContextProvider } from "./context/EmpleadosProvider";
import Sidebar from "./components/Sidebar";
import EspecialidadesPage from "./pages/EspecialidadesPage";
import EspecialidadesForm from "./pages/EspecialidadesForm";
import CategoriasPage from "./pages/CategoriasPage";
import CategoriasForm from "./pages/CategoriasForm";
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
            <EspecialidadContextProvider>
              <Routes>
                <Route path="/especialidades" element={<EspecialidadesPage/>} />
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
          </main>
        </div>
      </div>
    </>
  )
}

export default App