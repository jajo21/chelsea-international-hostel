import React from "react";
import { useContext } from "react";

import Device from "../device/Device";
import DeviceContext from "../../contexts/DeviceContext";
import { restoreAlarm } from "../../data/signalr/restoreAlarm";
import "./room.css";

function Room({ name, devices, email }) {
    const { units } = useContext(DeviceContext);

    const alarmTrue = (devices) => {
        let alarmTrue = false;
        devices.map(device => {
            if (device.alarm) {
                alarmTrue = true;
            }
        })
        return alarmTrue;
    }

    const handleAlarm = (devices, email) => {
        devices.map(device => {
            if (device.alarm) {
                restoreAlarm(device.id, email);
            }
        })
    }

    return (
        <div className="room">
            <h2>{name}</h2>
            <div className="room-card">
                {alarmTrue(devices) && <p>Varning!</p>}

                {devices && devices.map(device => {
                    const unit = units.find(unit => unit.id === device.unitId);
                    return (
                        <Device
                            key={device.id}
                            alarm={device.alarm}
                            unit={unit.unit}
                            unitName={unit.explanation}
                            telemetryValue={device.value}
                        />
                    )
                })}

                {alarmTrue(devices) && <button onClick={() => handleAlarm(devices, email)}
                >Återställ
                </button>}
            </div>
        </div>
    )
}
export default Room;