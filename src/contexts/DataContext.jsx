import { createContext, useState, useEffect } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { aquireToken } from "../data/auth/handleAuth";
import { getBuilding, getBuildingDevices } from "../data/api/getDevices";
import { getUnits } from "../data/api/getUnits";
import { addUnitExplanation } from "../data/units/handleUnits";
import { callSmarthut } from "../data/signalr/negotiate";
import { initializeSignalRConnection } from "../data/signalr/connectionSignalR";
import { createRooms } from "../data/rooms/createRooms";
import { calculateRoomNameOnDevice } from "../data/devices/handleDevices";

const DataContext = createContext();

export function DataProvider({ children }) {
    const isAuthenticated = useIsAuthenticated();
    const { accounts, instance } = useMsal();

    const [devices, setDevices] = useState(null);
    const [units, setUnits] = useState(null);
    const [rooms, setRooms] = useState(null);

    const [connection, setConnection] = useState(null);
    const [alarmNeutralized, setAlarmNeutralized] = useState(null);
    const [alarms, setAlarms] = useState([]);

    const [filter, setFilter] = useState(false);

    useEffect(() => {
        if (isAuthenticated && connection === null) {
            callSmarthut(accounts[0].username).then((res) => {
                const connection = initializeSignalRConnection(
                    res.url,
                    res.accessToken
                );
                setConnection(connection);
            });
        }
    }, [isAuthenticated, connection]);


    useEffect(() => {
        if (isAuthenticated) {
            const fetchData = async () => {
                const accessToken = await aquireToken(instance, accounts);
                const building = await getBuilding(accessToken);
                const devices = await getBuildingDevices(accessToken, building.id);
                const units = await getUnits(instance, accounts);
                const unitsWithExplanation = addUnitExplanation(units);
                setUnits(unitsWithExplanation);
                setDevices(devices);
            }
            fetchData();
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (connection && !connection._connectionStarted && devices) {
            connection.start().then(() => {
                connection.on("newTelemetry", telemetryArray => {
                    if (telemetryArray) {
                        const devicesWithTelemetry = [...devices];
                        devicesWithTelemetry.map(device => {
                            device.roomName = calculateRoomNameOnDevice(device.name);
                            return telemetryArray.map(telemetry => {
                                if (device.alarm === undefined) {
                                    device.alarm = false;
                                }
                                if (telemetry.deviceId === device.id.toUpperCase()) {
                                    device.value = telemetry.value;
                                    if (device.value > device.maxValue || device.value < device.minValue) {
                                        device.alarm = true;
                                    }

                                    return devicesWithTelemetry;
                                }
                                return devicesWithTelemetry;
                            })
                        })

                        setDevices(devicesWithTelemetry);
                    }

                    const createdRooms = createRooms(devices);
                    setRooms(createdRooms);
                });

                connection.on("alarmNeutralized", alarmNeutralized => {
                    setAlarmNeutralized(alarmNeutralized);
                    console.log(alarmNeutralized);
                });

            }).catch(err => console.error('Connection interrupted: ', err));
        }
    }, [connection, devices, units]);

    useEffect(() => {
        if (alarmNeutralized) {
            let alarmNeutralizedId = alarmNeutralized.slice(33, 69);
            const restoreRooms = [...rooms];
            restoreRooms.map(room => room.devices.map(device => {
                if (device.id === alarmNeutralizedId) {
                    device.alarm = false;
                }
                return device;
            }));
            setRooms(restoreRooms);
        }
    }, [alarmNeutralized]);

    useEffect(() => {
        if (devices) {
            const devicesStatus = devices.map(device => {
                let alarms;
                if (device.alarm) {
                    alarms = { deviceId: device.id, status: true }
                } else {
                    alarms = { deviceId: device.id, status: false }
                }
                return alarms;
            })

            const devicesWithAlarm = devicesStatus.filter(device => device.status === true);
            setAlarms(devicesWithAlarm);
        }
    }, [devices])

    return (
        <DataContext.Provider
            value={{
                units,
                accounts,
                rooms,
                alarms,
                filter,
                setFilter,
            }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext