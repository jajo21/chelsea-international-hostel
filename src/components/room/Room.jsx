import React, { useContext } from "react";
import Device from "../device/Device";
import { alarmTrue, handleAlarm } from "../../data/alarms/handleAlarms";
import DeviceContext from "../../contexts/DeviceContext";
import "./room.css";
import varning from "./varning.png"

function Room({ name, devices }) {
    const { accounts } = useContext(DeviceContext);

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
                    {alarmTrue(devices) && <button onClick={() => handleAlarm(devices, accounts[0].username)}
                    >Återställ
                    </button>}
                </div>
            </div>
        </div>
    )
}
export default Room;