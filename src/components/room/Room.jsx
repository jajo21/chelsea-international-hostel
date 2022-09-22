import React, { useContext } from "react";

import Device from "../device/Device";
import { restoreAlarm } from "../../data/signalr/restoreAlarm";
import DeviceContext from "../../contexts/DeviceContext";
import "./room.css";
import "../navbar.css";

function Room({ name, devices }) {
    const { accounts } = useContext(DeviceContext);

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

                {alarmTrue(devices) && <button onClick={() => handleAlarm(devices, accounts[0].username)}
                >Återställ
                </button>}
            </div>
        </div>
    )
}
export default Room;
