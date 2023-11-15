import { useState } from 'react';
import "./StatusToggle.css"
function StatusToggle() {

    const [switchActivado,setswitchActivado] = useState(false);
    const [valor,setValor] = useState(0)

    const estado = ()=>{
        setswitchActivado(!switchActivado);

        setValor(switchActivado ? 0 : 1);
    }

    return (
        <div>
            <label className='switch'>
                <input type="checkbox"
                    checked={switchActivado}
                    onChange={estado}
                />
                <span className='slider rounded'/>
            </label>
        </div>
    )

}

export default StatusToggle