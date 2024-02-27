import { useEffect, useState, useId } from 'react';
import ReactDOMServer from 'react-dom/server';
function renderObjectProperties(obj, excludedFields = []) {
  if (!obj || (Array.isArray(obj) && obj.length === 0)) {
    return 'Sin datos';
  }

  return Object.entries(obj)
    .filter(([propKey]) => !excludedFields.includes(propKey))
    .map(([propKey, propValue]) => (
      propKey ==='idPer' ? '':`${propValue}`
    ))
    .join(' ');
}
const AlertDetail = ({ id, entity, getApi }) => {
  const [infoDetail, setInfoDetail] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getApi(id);
        setInfoDetail(data);
        setTextStatus(data.estado);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [getApi, id]);

  const excludedFields = ['createdAt', 'updatedAt', 'idObra', 'Id', 'idEmp', 'idCli', 'idMat', 'idcat', 'idCliente', 'actividades', 'empleado_especialidad', 'contrasena', 'constrasena', 'salt', 'idRol', 'idPer', 'idProv'];
  const [textStatus, setTextStatus] = useState(1);
  const text = textStatus === 1 ? 'Activo' : 'Inactivo';

  const tableDetail = () => {
    if (!infoDetail) {
      return null;
    }
    if (infoDetail.empleado_especialidad && infoDetail.empleado_especialidad.length === 0) {
      excludedFields.push('empleado_especialidad');
    }
    console.log(infoDetail)
    return (
<form className="user">
  <div className="row">
    {Object.entries(infoDetail)
      .filter(([key]) => !excludedFields.includes(key))
      .map(([key, value]) => (
        <div className="col-md-6" key={key}>
          <div className="form-group">
            <label htmlFor="">{key === 'rolpermisoempleado' ? 'Permisos del rol':key}</label>
            {Array.isArray(value) ? (
              // <div key={value} className="card text-left" style={{ width: '18rem' }}>
                
              //   {value.map((item) => (
              //     <ul className="list-group list-group-flush">
              //       {Object.entries(item).map(([subKey, subValue]) => (
              //         <li key={subKey} className="list-group-item">
              //           <strong>{subKey}:</strong> {renderObjectProperties(subValue)}
              //         </li>
              //       ))}
              //     </ul>
              //   ))}
              // </div>
              value.map((item) => (
                <>
                  {Object.entries(item).map(([subKey, subValue]) => (
                    <>
                    <label htmlFor={subValue}></label>
                    <input
                      type="text"
                      className="form-control form-control-user"
                      value={renderObjectProperties(subValue)}
                      readOnly
                    />                    
                    </>
                  ))}
                </>
              ))
            ): typeof value === 'object'?  (
              <input 
              type="text"
              className="form-control form-control-user"
              value={renderObjectProperties(value, ['idObra', 'Id', 'idEmp', 'idCli', 'idMat', 'idcat', 'idCliente', 'actividades', 'idRol', 'idPer', 'idEmp'])}
              readOnly              
              />
            ) : (
              // Si no es un array, muestra el input normal
              <input
                type="text"
                className="form-control form-control-user"
                value={key === 'estado' ? (text ?? '') : (typeof value === 'string' ? value : JSON.stringify(value))}
                readOnly
              />
            )}
          </div>
        </div>
      ))}
  </div>
</form>
    );
  };

  const alertConfirm = () => {
    const content = tableDetail()
    const contentHtml = ReactDOMServer.renderToStaticMarkup(content);
    $.confirm({
      title: 'Detalle ' + entity,
      content: contentHtml,
      icon: 'fa fa-info-circle',
      theme: 'modern',
      closeIcon: true,
      animation: 'zoom',
      closeAnimation: 'scale',
      animationSpeed: 500,
      type: 'orange',
      columnClass: 'col-md-8 offset-md-1',
      buttons: {
        Cerrar: function () {},
      },
    });
  };

  return (
    <>
      <button onClick={alertConfirm} className="btn bg-secondary text-white mx-3">
        Ver <i className="fa-solid fa-eye"></i>
      </button>
    </>
  );
};

export default AlertDetail;
