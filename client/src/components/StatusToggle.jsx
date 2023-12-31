import { useState } from 'react';
import "./StatusToggle.css"
function StatusToggle({id, initialStatus, toggleApi, onCambioEstado}) {
    const [status, setStatus] = useState(initialStatus)

    const switchInput = status== 1 ? 1 : 0

    const handleClick = () => {

        $.confirm({
            title:`Desea cambiar el estado del registro ?`,
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
                        toggleApi(id,status)
                        onCambioEstado(id,!status)
                        $.alert('Se ha cambiado el estado!');
                        // setTimeout(() => {
                        //     window.location.reload(false);
                        // }, 2000)
                        
                    }                    
                },
                cancelar: {
                    btnClass: 'btn-default',
                    action: function(){
                        $.alert('Accion cancelada!');
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

export default StatusToggle