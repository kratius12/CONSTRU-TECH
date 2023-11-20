import React from 'react';


function AlertDetail({dataHeader, dataBody, entity}) {

 const tableDetail = () =>{
  let tableContent = '<table class="w-100">'
    dataHeader.forEach((item)=> {
      tableContent += `<tr><th>${item.header}</th><td>${dataBody[item]}</td></tr>`
    })
  tableContent += '</table>';

  return tableContent;
 }
  
  const alertConfirm = () => {
    const content = tableDetail()

    $.confirm({
      title: 'Detalle '+entity,
      content: content,
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