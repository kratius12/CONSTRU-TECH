import React from 'react';
import { Gantt } from 'gantt-task-react'; 
import "../../assets/css/gantt.css";
function GanttTask({actividades, handleActividad}) {

    const getFechaFin = (fechaini, fechafin) => {
        const fechainicio = new Date(fechaini)
        let addDays = new Date(fechainicio.setDate(fechainicio.getDate() + fechafin))
        let year = addDays.getFullYear();
        let month = addDays.getMonth()+1;
        let dt = addDays.getDate();
        
        if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        return year+'-' + month + '-'+dt;
    }

    const assignProgress = (estado) => {
        let progress = 0
        if (estado === 'En curso') {
            progress = 10 
        } else if(estado === 'En revisión') {
            progress = 80
        }else if (estado === 'Terminada') {
            progress = 100
        }
        return progress
    }
    let tasks = [];
    actividades.map((actividad, index) => {
        let fechafinalAct = getFechaFin(actividad.detalleObra.fechaini, actividad.detalleObra.fechafin)
        let objTask = {
            start: new Date(actividad.detalleObra.fechaini),
            end: new Date(fechafinalAct),
            name: actividad.detalleObra.actividad,
            id: actividad.detalleObra.actividad+''+actividad.detalleObra.id,
            type: 'task',
            progress: assignProgress(actividad.detalleObra.estado),
            isDisabled: false,
            styles: { progressColor: '#056608', progressSelectedColor: '#056608' },
            detalleObra: actividad,

        }
        tasks.push(objTask)
    })
    return ( 
        <div className="container">
            <div className="row">
                <div className="col-md-12">

                <Gantt
                tasks={tasks}
                onClick={
                    (task) => handleActividad(task.detalleObra)
                }
                locale="es"
                />
                </div>
            </div>
        </div>
    );

}

export default GanttTask;
