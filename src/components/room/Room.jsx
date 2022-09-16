import React from "react";

import Device from "../device/Device";
import "./room.css";

function Room({ name, devices, units, alarm }) {
    return (
        <div className="room">
            <h2>{name}</h2>
            <div className="room-card">
                <p>VARNING</p>
                {devices && devices.map(device => {
                    console.log(units);
                    const unit = units.find(unit => unit.id === device.unitId);
                    if (unit) {
                        return (
                            <Device
                                deviceId={device.id}
                                alarm={alarm}
                                unit={unit.unit}
                                unitName={unit.name}
                            />
                        )
                    }
                })}
                <button>Återställ</button>
            </div>
        </div>
    )
}
export default Room;