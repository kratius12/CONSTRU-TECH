import React from 'react';


function AlertDetail({data}) {



  const alertConfirm = () => {
    $.confirm({
      title: 'Test con éxito!',
      content: 'Test',
      icon: 'fa fa-check',
      theme: 'modern',
      closeIcon: true,
      animation: 'zoom',
      closeAnimation: 'scale',
      animationSpeed: 1500,
      type: 'yellow',
      columnClass: 'col-md-6 col-md-offset-3',
      autoClose: 'okay|3000',
      buttons: {
        okay: function () {},
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