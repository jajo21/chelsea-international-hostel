import React from "react";
import { useContext } from "react";

import Device from "../device/Device";
import DeviceContext from "../../contexts/DeviceContext";
import "./room.css";

function Room({ name, devices, alarm }) {
    const { units } = useContext(DeviceContext);
    return (
        <div className="room">
            <h2>{name}</h2>
            <div className="room-card">
                {alarm ? "" : <p>Varning!</p>}
                {devices && devices.map(device => {
                    const unit = units.find(unit => unit.id === device.unitId);
                    /* const value = device.id.toUpperCase() === telemetry[0].deviceId; */
                    return (
                        <Device
                            key={device.id}
                            deviceId={device.id}
                            alarm={alarm}
                            unit={unit.unit}
                            unitName={unit.explanation}
                            telemetryValue={device.value}
                        />
                    )
                })}
                {alarm ? "" : <button>Återställ</button>}
            </div>
        </div>
    )
}
export default Room;