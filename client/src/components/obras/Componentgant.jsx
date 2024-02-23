import { Gantt } from 'react-virtual-gantt';


const GanttComponent = ({ actividades })=>{
    const viewMode = 'Week';
    return (
        <div>
            <Gantt
                activities ={actividades}
                viewMode={viewMode}
            />
        </div>
    )
}
export default GanttComponent