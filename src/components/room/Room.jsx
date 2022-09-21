import React from "react";

import Device from "../device/Device";
import { restoreAlarm } from "../../data/signalr/restoreAlarm";
import "./room.css";
import "../navbar.css";

function Room({ name, devices, email }) {

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
                    return (
                        <Device
                            key={device.id}
                            alarm={device.alarm}
                            unitId={device.unitId}
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
