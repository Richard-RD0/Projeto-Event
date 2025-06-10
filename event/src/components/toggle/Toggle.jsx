import React from "react";
import "./Toggle.css"

const Toggle = (presenca, manipular) => {
    return (
        <>
            <div className="teste">
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={presenca}
                        onChange={manipular}
                    />
                    <span className="slider round"></span>
                </label>
            </div>
        </>
    )
}

export default Toggle;