import React from "react";

function Device({ unit, alarm, unitName, telemetryValue }) {
    return (
        <div className="device">
            {telemetryValue
                ?
                <p>{unitName} {alarm ? "Alarm" : "OK"} {telemetryValue.toFixed(1)} {unit}</p>
                :
                <p>Laddar</p>
            }
        </div>
    )
}

export default Device;