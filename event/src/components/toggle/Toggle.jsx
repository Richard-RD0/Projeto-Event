import React from "react";
import "./Toggle.css"

const Toggle = (props) => {
    return (
        <>
            <div className="teste">
                <label className="switch">
                    <input type="checkbox"
                    checked={props.presenca}
                    onChange={props.metodo}/>
                        <span className="slider"></span>
                </label>
            </div>
        </>
    )
}

export default Toggle;