import React from 'react';
import $ from 'jquery'; // Asegúrate de tener la librería jQuery instalada

function AlertDetail() {
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
      type: 'green',
      columnClass: 'col-md-6 col-md-offset-3',
      autoClose: 'okay|4000',
      buttons: {
        okay: function () {},
      },
    });
  };

  return (
    <div>
      {/* Contenido de tu componente */}
    </div>
  );
}

export default AlertDetail;