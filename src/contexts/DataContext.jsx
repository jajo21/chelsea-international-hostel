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
    const [alarms, setAlarms] = useState([]);

    const [filter, setFilter] = useState(false);

    const [error, setError] = useState(null);

    useEffect(() => {
        if (isAuthenticated && connection === null) {
            callSmarthut(accounts[0].username).then((res) => {
                const connection = initializeSignalRConnection(res.url, res.accessToken);
                setConnection(connection);
            });
        }
    }, [isAuthenticated, connection]);


    useEffect(() => {
        if (isAuthenticated) {
            const fetchData = async () => {
                try {
                    const [accessToken, tokenError] = await aquireToken(instance, accounts);
                    if (tokenError) throw new Error(tokenError)
                    const [building, buildingError] = await getBuilding(accessToken);
                    if (buildingError) throw new Error(buildingError);
                    const [devices, devicesError] = await getBuildingDevices(accessToken, building.id);
                    if (devicesError) throw new Error(devicesError);
                    const [units, unitsError] = await getUnits(accessToken);
                    if (unitsError) throw new Error(unitsError);
                    const unitsWithExplanation = addUnitExplanation(units);
                    setUnits(unitsWithExplanation);
                    setDevices(devices);

                } catch (error) {
                    setError(error.message);
                }
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
                                if (device.alarmValue === undefined) {
                                    device.alarmValue = null;
                                }
                                if (device.alarm === undefined) {
                                    device.alarm = false;
                                }
                                if (telemetry.deviceId === device.id.toUpperCase()) {
                                    device.value = telemetry.value + 1;
                                    if (!device.alarm && device.value > device.maxValue || !device.alarm && device.value < device.minValue) {
                                        device.alarm = true;
                                        device.alarmValue = device.value;
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
                    console.log(alarmNeutralized);
                    const alarmNeutralizedId = alarmNeutralized.slice(33, 69);
                    if (devices) {
                        const resetDevices = devices.map(device => {
                            if (device.id === alarmNeutralizedId) {
                                device.alarm = false;
                                device.alarmValue = null;
                            }
                            return device
                        })
                        setDevices(resetDevices);
                    }
                });

            }).catch(err => console.error('Connection interrupted: ', err));
        }
    }, [connection, devices, units]);

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
    }, [devices]);

    return (
        <DataContext.Provider
            value={{
                units,
                accounts,
                rooms,
                alarms,
                filter,
                error,
                setFilter,
            }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext