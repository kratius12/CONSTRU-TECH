import React from 'react';
import { Gantt } from 'gantt-task-react'; 
import "../../assets/css/gantt.css";
import {format} from 'date-fns'
function GanttTask() {

    const handleclick = (id, name, start, end, progress)=> {
        console.log('Test '+id)
        const startFormat = format(start, 'dd-MM-yyyy')
        const endFormat = format(start, 'dd-MM-yyyy')
        $.confirm({
            title:`${name}`,
            content: `<p>Inicia el: ${startFormat}</p><p>Termina el: ${endFormat}</p>progreso actual: ${progress}%`,
            icon: 'fa fa-check',
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

    let tasks = [
        {
          start: new Date(2020, 1, 1),
          end: new Date(2020, 1, 2),
          name: 'Lijar',
          id: 'Task 1',
          type:'task',
          progress: 90,
          isDisabled: false,
          styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
        },
        {
            start: new Date(2020, 1, 2),
            end: new Date(2020, 1, 3),
            name: 'Pintar',
            id: 'Task 2',
            type:'task',
            progress: 10,
            isDisabled: false,
            styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
        },
        {
            start: new Date(2020, 1, 1),
            end: new Date(2020, 1, 4),
            name: 'Limpiar',
            id: 'Task 3',
            type:'task',
            progress: 50,
            isDisabled: false,
            styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
        }
    ];

    return ( 
        <Gantt
        tasks={tasks}
        onClick={(task) => handleclick(task.id, task.name, task.start, task.end, task.progress)}
        locale="es"
        />
    );

}

export default GanttTask;
