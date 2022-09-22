export function calculateRoomNameOnDevice(deviceName) {
    let deviceNameString = deviceName;
    let deviceNameArray = deviceNameString.split(" ");

    if (deviceNameArray.length > 0) {
        let name = "";

        for (let i = 1; i < deviceNameArray.length; i++) {
            if (deviceNameArray[i].includes(")")) {
                continue;
            }
            name = `${name} ${deviceNameArray[i]}`;
        }
        name = name.trim();
        name = name.charAt(0).toUpperCase() + name.slice(1);
        return name;
    }
}