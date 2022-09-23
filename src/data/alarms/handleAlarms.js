import { restoreAlarm } from "../signalr/restoreAlarm";

export const alarmTrue = (devices) => {
    let alarmTrue = false;
    devices.map(device => {
        if (device.alarm) {
            alarmTrue = true;
        }
    })
    return alarmTrue;
}

export const handleAlarm = (devices, email) => {
    devices.map(device => {
        if (device.alarm) {
            restoreAlarm(device.id, email);
        }
    })
}