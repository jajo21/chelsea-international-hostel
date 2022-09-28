import React, { useContext } from "react";
import DataContext from "../../contexts/DataContext";
import Loading from "../loading/Loading";
import "./device.css";

function Device({ unitId, alarm, telemetryValue, alarmValue }) {
    const { units } = useContext(DataContext);
    const unit = units.find(unit => unit.id === unitId);

    return (
        <div className={alarm ? "alarmActive" : "alarmOk"}>
            {telemetryValue
                ?
                <p>{unit.explanation} {alarm ? <span>ALARM</span> : <span>OK</span>} {alarmValue ? alarmValue.toFixed(1) : telemetryValue.toFixed(1)} {unit.unit}</p>
                :
                <Loading size={"small"} />
            }
        </div>
    )
}

export default Device;