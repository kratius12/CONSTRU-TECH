import { useState } from 'react';
import "./StatusToggle.css"
import { useEmpleados } from "../../context/empleados/EmpleadosProvider";
function StatusToggleEmpleados({id, initialStatus}) {
    const [status, setStatus] = useState(initialStatus)

    const switchInput = status== 1 ? 1 : 0
    const { toggleEmpleadoStatus,getEmpleado } = useEmpleados()
    const handleClick = () => {

        $.confirm({
            title:`Desea cambiar el estado del empleado ?`,
            content:"",
            icon: 'fa fa-question-circle',
            theme: 'modern',
            closeIcon: true,
            animation: 'zoom',
            closeAnimation: 'scale',
            animationSpeed: 500,
            type: 'red',
            columnClass:'col-md-6 col-md-offset-3',
            buttons: {
                confirmar: {
                    btnClass: 'btn-danger',
                    action: async function () {
                        setStatus(status ? 0 :1)
                        const response = await toggleEmpleadoStatus(id,status)

                        // if (entity =='material') {
                            if (response.status === 200) {
                                console.log(response)
                                $.confirm({
                                    title: "Estado del empleado actualizado!",
                                    content: "",
                                    icon: 'fa fa-check',
                                    theme: 'modern',
                                    closeIcon: true,
                                    animation: 'zoom',
                                    closeAnimation: 'scale',
                                    animationSpeed: 500,
                                    type: 'green',
                                    columnClass: 'col-md-6 col-md-offset-3',
                                    buttons: {
                                        okay: {
                                            btnClass: 'btn btn-default',
                                            action: function () {
                                                window.location.reload(false);
                                            }
                                        }
                                    }
                                })
                            } else if (response.status === 204) {
                                $.confirm({
                                    title: "No se puede cambiar el estado del empleado si el estado del rol está inactivo",
                                    content: "",
                                    icon: 'fa fa-xmark',
                                    theme: 'modern',
                                    closeIcon: true,
                                    animation: 'zoom',
                                    closeAnimation: 'scale',
                                    animationSpeed: 500,
                                    type: 'red',
                                    columnClass: 'col-md-6 col-md-offset-3',
                                    buttons: {
                                        okay: {
                                            btnClass: 'btn btn-default',
                                            action: function () {
                                                window.location.reload(false);
                                            }
                                        }
                                    }
                                })
                            }

                    }                    
                },
                cancelar: {
                    btnClass: 'btn-default',
                    action: function(){
                        $.alert('Acción cancelada!');
                    }
                }
            }            
        })
    }    

    return (
        <div>
            <label className='switch'>
                <input type="checkbox"
                    checked={switchInput}
                    onChange={handleClick}
                />
                <span className='slider rounded'/>
            </label>
        </div>
    )

}

export default StatusToggleEmpleados