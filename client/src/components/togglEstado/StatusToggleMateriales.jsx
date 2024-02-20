import { useState } from 'react';
import "./StatusToggle.css"
import { useMateriales } from "../../context/materiales/MaterialesProvider";
import axios from 'axios';
function StatusToggle({id, initialStatus}) {
    const [status, setStatus] = useState(initialStatus)

    const switchInput = status== 1 ? 1 : 0
    const { toggleMaterialEstado,getMaterial } = useMateriales()
    const handleClick = () => {
        $.confirm({
            title:`Desea cambiar el estado del material ?`,
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
                        const response = await toggleMaterialEstado(id,status)
                        console.log(response.status)
                        // if (entity =='material') {
                            if (response.status === 200) {
                                console.log(response)
                                $.confirm({
                                    title: "Estado del material actualizado!",
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
                            } else if (response.status === 205) {
                                $.confirm({
                                    title: "No se puede editar el estado del material si el estado de la categoría esta inactivo",
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
                            }else if(response.status === 204){
                                $.confirm({
                                    title: "No se puede editar el estado del material si la cantidad es 0",
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