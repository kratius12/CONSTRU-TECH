import React from 'react';
import { Gantt } from 'gantt-task-react'; 
import "../../assets/css/gantt.css";
import {format} from 'date-fns'
function GanttTask({actividades, handleActividad}) {

    const handleclick = (id, name, start, end, progress)=> {
        console.log('Test '+id)
        const startFormat = format(start, 'dd-MM-yyyy')
        const endFormat = format(start, 'dd-MM-yyyy')
        $.confirm({
            title:`${name}`,
            content: `<p>Inicia el: ${startFormat}</p><p>Termina el: ${endFormat}</p>progreso actual: ${progress}%`,
            icon: 'fa fa-circle-info',
            theme: 'modern',
            closeIcon: true,
            animation: 'zoom',
            closeAnimation: 'scale',
            animationSpeed: 500,
            type: 'green',
            columnClass: 'col-md-6 col-md-offset-3',
            buttons: {
              cerrar: function () {
              },
            }
          })
    }
    const assignProgress = (estado) => {
        let progress = 0
        if (estado === 'En curso') {
            progress = 10 
        } else if('En revisión') {
            progress = 80
        }else if ('Terminada') {
            progress = 100
        }
        return progress
    }
    console.log(actividades)
    let tasks = [
        // {
        //   start: new Date(2020, 1, 1),
        //   end: new Date(2020, 1, 2),
        //   name: 'Lijar',
        //   id: 'Task 1',
        //   type:'task',
        //   progress: 90,
        //   isDisabled: false,
        //   styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
        // },
        // {
        //     start: new Date(2020, 1, 2),
        //     end: new Date(2020, 1, 3),
        //     name: 'Pintar',
        //     id: 'Task 2',
        //     type:'task',
        //     progress: 10,
        //     isDisabled: false,
        //     styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
        // },
        // {
        //     start: new Date(2020, 1, 1),
        //     end: new Date(2020, 1, 4),
        //     name: 'Limpiar',
        //     id: 'Task 3',
        //     type:'task',
        //     progress: 50,
        //     isDisabled: false,
        //     styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
        // }
    ];
    actividades.map((actividad, index) => {
        let objTask = {
            start: new Date(2024, 1, 1),
            end: new Date(2024, 1, 2),
            name: actividad.detalleObra.actividad,
            id: actividad.detalleObra.actividad+''+actividad.detalleObra.id,
            type: 'task',
            progress: assignProgress(actividad.detalleObra.estado),
            isDisabled: false,
            styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' }
        }
        tasks.push(objTask)
    })
    return ( 
        <Gantt
        tasks={tasks}
        onClick={
            (actividad) => handleActividad(actividad)
        }
        locale="es"
        />
    );

}

export default GanttTask;
