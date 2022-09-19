import React from "react";

function Device({ unit, alarm, unitName, telemetryValue }) {
    return (
        <div className="device">
            <p>{unitName} {alarm ? "OK" : "Alarm"} {telemetryValue} {unit}</p>
        </div>
    )
}

export default Device;