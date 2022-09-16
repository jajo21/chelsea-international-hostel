import React from "react";

function Device({ unit, alarm, unitName }) {
    return (
        <div className="device">
            <p>{unitName} {alarm ? "OK" : "Alarm"} 20 {unit}</p>
        </div>
    )
}

export default Device;