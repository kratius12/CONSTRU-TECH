import { useState } from 'react';

function StatusToggle(id, status) {

    return(
        <div>
            <input
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault" 
            value={status} 
            {...status == 1 ? "checked":""}
            // onChange={() => handleClick(idEsp, estado)}
            />            
        </div>
    )
    
}

export default StatusToggle