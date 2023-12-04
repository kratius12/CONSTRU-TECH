import { useEffect, useState, useId } from 'react';
import {renderToString} from 'react-dom/server'
function AlertDetail({ id, entity, getApi }) {
  const [infoDetail, setInfoDetail] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getApi(id);
        setInfoDetail(data);
        setTextStatus(data.estado)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [getApi, id]);

  const excludedFields = ['createdAt', 'updatedAt', 'empleado_especialidad']
  const [textStatus, setTextStatus] = useState(1)
  const text = textStatus == 1 ? 'Activo' : 'Inactivo'
  const tableDetail = () => {
    if (!infoDetail) {
      return null; 
    }
    if (infoDetail.empleado_especialidad && infoDetail.empleado_especialidad.length == 0) {
      excludedFields.push('empleado_especialidad')
    }
    return (
      <table className="w-100">
        <tbody>
          {Object.entries(infoDetail).filter(([key]) => !excludedFields.includes(key)).map(([key, value]) => (
            
            <tr key={key}>
              <th>{key}</th>
              <td>{key == 'estado' ? text : value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const alertConfirm = () => {
    const content = tableDetail();
    $.confirm({
      title: 'Detalle ' + entity,
      content: renderToString(content),
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
      <button onClick={() => alertConfirm()} className="btn bg-secondary text-white mx-3">
        Ver <i className="fa-solid fa-eye"></i>
      </button>
    </>
  );
}

export default AlertDetail;
