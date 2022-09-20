import React, { useContext } from "react";
import DeviceContext from "../../contexts/DeviceContext";

function Device({ unitId, alarm, telemetryValue }) {
    const { units } = useContext(DeviceContext);
    const unit = units.find(unit => unit.id === unitId);

    return (
        <div className="device">
            {telemetryValue
                ?
                <p>{unit.explanation} {alarm ? "Alarm" : "OK"} {telemetryValue.toFixed(1)} {unit.unit}</p>
                :
                <p>Laddar</p>
            }
        </div>
    )
}

export default Device;