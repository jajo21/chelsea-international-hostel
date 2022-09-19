import React, { useEffect, useState, useContext } from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { callSmarthut } from '../../data/signalr/negotiate';
import { initializeSignalRConnection } from '../../data/signalr/connectionSignalR';
import { getMyBuilding } from '../../data/api/getDevices';
import { loginRequest } from '../../data/auth/authConfig';
import { aquireToken } from '../../data/auth/handleAuth';
import { getBuilding } from '../../data/api/getDevices';
import { getBuildingDevices } from '../../data/api/getDevices';
import { createRooms } from "../../data/rooms/createRooms";
import Room from '../room/Room';
import "./climate.css";
import { getUnits } from "../../data/api/getUnits";
import DeviceContext from "../../contexts/DeviceContext";


function Climate() {
    const { devices, setDevices, units } = useContext(DeviceContext);
    const isAuthenticated = useIsAuthenticated();
    const { accounts, instance } = useMsal();

    const [rooms, setRooms] = useState(null);
    const [telemetryData, setTelemetryData] = useState(null);
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        if (isAuthenticated) {
            callSmarthut(accounts[0].username).then(res => {
                const connection = initializeSignalRConnection(res.url, res.accessToken);
                setConnection(connection);
            })
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (connection && !connection.connectionStarted) {
            connection.start().then(() => {
                connection.on("newTelemetry", telemetry => setTelemetryData(telemetry));
            })
                .catch(err => console.error('Connection interrupted: ', err));
        }
    }, [connection])

    useEffect(() => {

        if (telemetryData) {
            const devicesWithTelemetry = [...devices];
            devicesWithTelemetry.map(device => {
                return telemetryData.map(telemetry => {
                    if (telemetry.deviceId === device.id.toUpperCase()) {
                        device.value = telemetryData[0].value;
                        return devicesWithTelemetry;
                    }
                    return devicesWithTelemetry;
                })
            })
            setDevices(devicesWithTelemetry);
        }

        const rooms = createRooms(devices);
        setRooms(rooms);

    }, [telemetryData]);

    return (
        <div className="climate">
            <h1>Klimat</h1>
            <div className='rooms'>
                {rooms && rooms.map(room => {
                    return (
                        <Room
                            key={room.id}
                            name={room.name}
                            devices={room.devices}
                            alarm={room.alarm.toString()}
                            telemetry={telemetryData}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Climate;
