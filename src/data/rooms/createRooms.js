import { aquireToken } from "../auth/handleAuth";
import { getBuilding, getBuildingDevices } from "../api/getDevices";
import { Room } from "../classes/room";


export async function createRooms(instance, accounts) {
    const accessToken = await aquireToken(instance, accounts);
    const building = await getBuilding(accessToken);
    const devices = await getBuildingDevices(accessToken, building.id);
    const rooms = [];

    devices.map((device, index) => {
        const room = new Room();
        room.devices = [];
        switch (device.name) {
            case "Temperature back yard":
                room.id = index + 1;
                room.name = "Baksida";
                room.devices.push(device);
                room.alarm = false;
                rooms.push(room)
                break;
            case "Temperature lobby":
                room.id = index + 1;
                room.name = "Lobby";
                room.devices.push(device);
                room.alarm = false;
                rooms.push(room)
                break;
            case "Humidity Conference room 1":
                room.id = index + 1;
                room.name = "Konferens";
                room.devices.push(device);
                room.alarm = false;
                rooms.push(room)
                break;
            case "Temperature swimming pool 2":
                room.id = index + 1;
                room.name = "Pool";
                room.devices.push(device);
                room.alarm = false;
                rooms.push(room)
                break;
            case "Noise (dB) common area":
                room.id = index + 1;
                room.name = "Allmänt utrymme";
                room.devices.push(device);
                room.alarm = false;
                rooms.push(room)
                break;
            case "Temperature common area":
                if (rooms.find(e => e.name === 'Allmänt utrymme')) {
                    const room = rooms.find(e => e.name === 'Allmänt utrymme');
                    room.devices.push(device);
                } else {
                    room.id = index + 1;
                    room.name = "Allmänt utrymme";
                    room.device = [device];
                    room.alarm = false;
                    rooms.push(room)
                }
                break;
        }
    })

    console.log(rooms);

    return rooms;
}