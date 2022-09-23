import { Room } from "../classes/room";
import { alarmTrue } from "../alarms/handleAlarms";

export function createRooms(devices) {

    const rooms = [];
    const roomNames = devices.map(device => device.roomName);
    const uniqueRoomNames = [...new Set(roomNames)];

    uniqueRoomNames.map((name, index) => {
        const room = new Room();
        room.id = index + 1;
        room.devices = [];
        room.name = name;
        rooms.push(room);
    })

    rooms.map(room => {
        devices.map(device => {
            if (room.name === device.roomName) {
                room.devices.push(device);
            }
        })
    })

    const roomsFilteredByAlarm = rooms.sort((a, b) => {
        const roomA = alarmTrue(a.devices);
        const roomB = alarmTrue(b.devices);

        if (roomA && !roomB) {
            return -1
        }

        if (!roomA && roomB) {
            return 1
        }

        return 0;
    });

    return roomsFilteredByAlarm;
}