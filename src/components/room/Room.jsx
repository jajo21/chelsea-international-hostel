import React, { useContext } from "react";
import Device from "../device/Device";
import { restoreAlarm } from "../../data/signalr/restoreAlarm";
import DeviceContext from "../../contexts/DeviceContext";
import "./room.css";
import varning from "./varning.png"

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