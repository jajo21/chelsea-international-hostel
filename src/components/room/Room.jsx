import React from "react";
import varning from "./varning.png"
import Device from "../device/Device";
import { restoreAlarm } from "../../data/signalr/restoreAlarm";
import "./room.css";

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
            <h3 className="room-title">{name}</h3>
            <div className={alarmTrue(devices) ? "room-card-alarm" : "room-card-ok"}>
                <div className="devices">

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
                </div>
                <div className="alarmDiv">
                    {alarmTrue(devices) && <img src={varning} />}
                    {alarmTrue(devices) && <button onClick={() => handleAlarm(devices, email)}
                    >Återställ
                    </button>}
                </div>
            </div>
        </div>
    )
}
export default Room;