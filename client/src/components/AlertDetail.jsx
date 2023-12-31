import { useEffect, useState, useId } from 'react';
import ReactDOMServer from 'react-dom/server';
function renderObjectProperties(obj) {
  if (!obj || (Array.isArray(obj) && obj.length === 0)) {
    return <p>Sin datos</p>;
  }
  return (
    <ul>
      {Object.entries(obj).map(([propKey, propValue]) => (
        <li key={propKey} className='list-group-item'>
          <strong>{propKey}:</strong> {propValue}
        </li>
      ))}
    </ul>
  );
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

  const excludedFields = ['createdAt', 'updatedAt'];
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
            <label htmlFor="">{key}</label>
            {Array.isArray(value) ? (
              // Si es un array, muestra la información en cards
              value.map((item, index) => (
                <div key={index} className="card" style={{ width: '18rem' }}>
                  <div className="card-header">{key}</div>
                  <ul className="list-group list-group-flush">
                    {Object.entries(item).map(([subKey, subValue]) => (
                      <li key={subKey} className="list-group-item">
                        <strong>{subKey}:</strong> {renderObjectProperties(subValue)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ): typeof value === 'object'?  (
              <div className="card">
                <ul className="list-group list-group-flush">
                  <li className='list-group-item'>{renderObjectProperties(value)}</li>
                </ul>
              </div>
            ) : (
              // Si no es un array, muestra el input normal
              <input
                type="text"
                className="form-control form-control-user"
                value={key === 'estado' ? (text ?? '') : JSON.stringify(value)}
                readOnly
              />
            )}
          </div>
        </div>
      ))}
  </div>
</form>


      
      // <table className="w-100">
      //   <tbody>
      //     {Object.entries(infoDetail)
      //       .filter(([key]) => !excludedFields.includes(key))
      //       .map(([key, value]) => (
      //         <tr key={key}>
      //           <th>{key}</th>
      //           <td>{key === 'estado' ? text : value}</td>
      //         </tr>
      //       ))}
      //   </tbody>
      // </table>
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
