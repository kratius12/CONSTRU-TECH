import React from 'react';
import { Gantt } from 'gantt-task-react'; 
import "../../assets/css/gantt.css";
import {format} from 'date-fns'
import { validate } from 'superstruct';
function GanttTask({actividades, handleActividad}) {

    const formatFecha = (fecha)=> {
        //  const formatted = format(new Date(fecha), 'yyyy-M-d')
        // return formatted
        console.log(fecha);
    }
    const handleTest = (actividad) =>{
        console.log(actividad)
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
    console.log(actividades)
    let tasks = [];
    actividades.map((actividad, index) => {
        let validDate = actividad.detalleObra.fechaini.split('-')
        formatFecha(validDate)
        let objTask = {
            start: new Date(2024, 1, 1),
            end: new Date(2024, 1, 3),
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
