import React from 'react';


function AlertDetail({dataHeader, dataBody, entity}) {

  console.log(dataBody)

  const head =
  `<table className="text-center">
    ` +
      dataHeader.map(item => (
        `<tr><th key=${item.header}>${item.header}</th>`
      )).join('') +
      Object.values(dataBody).map(value => (
        `<td key=${value}>${value}</td></tr>`
      )).join('') 
      + `
  </table>`;

  // for (let index = 0; index < dataHeader.length; index++) {
  //     console.log(dataHeader[index].header)
  //     for (let index = 0; index < dataBody.length; index++) {
  //       console.log(dataBody[index][0])
  //     }
  // }

  // `<table className="text-center">
  //   <thead>
  //   <tr>`+
  //   dataHeader.map(item => (
  //     `<th key=${item.header}>${item.header}</th>`
  //   )).join('')
  //   +`</tr>
  //   </thead>
  //   <tbody>
  //    <tr>
  //    `+
  //    dataBody.map(itemB => (
  //     `<td key=${itemB.idEmp}>${itemB.idEmp}</td>`
  //     `<td key=${itemB.idEmp}>${itemB.idEmp}</td>`
  //    ))
  //    +`
  //    </tr>
  //   </tbody>
  // </table>`
  
  const alertConfirm = () => {
    const Div = document.createElement('div');
    Div.innerHTML= head
    $.confirm({
      title: 'Detalle '+entity,
      content: Div,
      icon: 'fa fa-check-circle',
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