import React, { useContext } from "react";
import DataContext from "../../contexts/DataContext";
import "./device.css";

function Device({ unitId, alarm, telemetryValue }) {
    const { units } = useContext(DataContext);
    const unit = units.find(unit => unit.id === unitId);

    return (
        <div className={alarm ? "alarmActive" : "alarmOk"}>
            {telemetryValue
                ?
                <p>{unit.explanation} {alarm ? <span>Alarm</span> : <span>OK</span>} {telemetryValue.toFixed(1)} {unit.unit}</p>
                :
                <p>Laddar</p>
            }
        </div>
    )
}

export default Device;