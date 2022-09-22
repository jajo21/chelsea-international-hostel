import { Room } from "../classes/room";

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
    return rooms;
}