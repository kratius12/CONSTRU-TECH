import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRol } from "../../context/roles/RolesProvider";
import TableInfo from "../../components/table/TableInfo";

function RolesPage() {
  const dataHeader = [
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Estado",
      accessorKey: "estado",
      idProperty: "idRol",
    },
    {
      header: "Acción",
      accessorKey: "accion",
      idProperty: "idRol",
    },
  ];

  const [tableStatus, setTableStatus] = useState(0);
  const handleChangeStatus = (newStatus) => {
    setTableStatus(newStatus);
  };

  const { roles, Roles, ToggleRolStatus, getRol } = useRol();
  const navigate = useNavigate();
  useEffect(() => {
    Roles();
  }, [])

  function renderMain() {
    if (roles.length === 0) {
      return <h1>Sin Roles</h1>;
    } else {
      return (
        <TableInfo
          dataHeader={dataHeader}
          dataBody={roles}
          routeEdit={"editarRol"}
          toggleApi={ToggleRolStatus}
          entity={"Rol"}
          onChangeStatus={handleChangeStatus}
          viewDetail
          getApi={getRol}
          
        />
        
      );
    }
  }
  
  return (
    <>
      <h1 className="h3 mb-2 text-gray-800">Gestión de roles</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Listado de roles
          </h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <div className="row">
              <div className="col-md-6">
                <div className="col-md-6 mb-3">
                <button
                    className="btn btn-primary mr-2"  
                    onClick={() => navigate(`/agregarRol`)}
                  >
                    Agregar
                  </button>

                  <button
                    className="btn btn-secondary"
                    onClick={() => navigate(`/permisos`)}
                  >
                    Permisos
                  </button>
                </div>
              </div>
              {renderMain()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RolesPage;
