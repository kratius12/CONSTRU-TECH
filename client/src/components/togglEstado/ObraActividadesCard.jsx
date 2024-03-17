import React from "react"
function ObraActividadesCard (){
    return (
        <div key={detalle.id} className="col-md-3 mt-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Actividad: {detalle.detalleObra.actividad}</h5>
                    <p className="card-text">Fecha de inicio: {formatoFechaIni(detalle.detalleObra.fechaini)}</p>
                    <p className="card-text">Fecha de fin estimada: {calcularFechaFinEstimada(detalle.detalleObra.fechaini, detalle.detalleObra.fechafin)}</p>

                    {detalle.materiales.length > 0 && (
                        <>
                            <p className="card-text">Materiales: {detalle.materiales.map((material) => material.materiales.nombre).join(', ')}</p>
                            <p className="card-text">Materiales: {detalle.materiales.map((material) => material.cantidad).join(', ')}</p>
                        </>
                    )}



                    {detalle.empleados.length > 0 && (
                        <p className="card-text">Empleados: {detalle.empleados.map((empleado) => empleado.empleado.nombre).join(', ')}</p>
                    )}


                    <p className="card-text">Estado: {detalle.detalleObra.estado}</p>
                    <div className="mt-3">
                        <Button
                            className="btn btn-secondary"
                            onClick={() => handleAgregarActividad(detalle)}
                        >
                            <i className="fa-solid fa-pen-to-square"></i>
                            &nbsp;Editar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ObraActividadesCard