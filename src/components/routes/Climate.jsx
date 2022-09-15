import React, { useEffect, useState } from 'react';
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
/* import { callSmarthut } from '../../data/signalr/negotiate';
import { initializeSignalRConnection } from '../../data/signalr/connectionSignalR'; */
import { getBuilding, getBuildingDevices } from '../../data/api/getDevices';
import { aquireToken } from '../../data/auth/handleAuth';

function Climate() {
    const isAuthenticated = useIsAuthenticated();
    const { accounts, instance } = useMsal();

    const [devices, setDevices] = useState(null);

    /*     const [negotiateUrl, setNegotiateUrl] = useState(null);
        const [negotiateToken, setNegotiateToken] = useState(null);
        const [telemetryData, setTelemetryData] = useState(null); */

    useEffect(() => {
        if (isAuthenticated) {
            const fetchData = async () => {
                const accessToken = await aquireToken(instance, accounts)
                const building = await getBuilding(accessToken)
                const devices = await getBuildingDevices(accessToken, building.id);
                setDevices(devices);
            }
            fetchData();
        }
    }, [isAuthenticated]);

    /*     useEffect(() => {
            callSmarthut(accounts[0].username).then(res => {
                setNegotiateUrl(res.url);
                setNegotiateToken(res.accessToken);
            })
    
            if (isAuthenticated && negotiateUrl !== null) {
                const connection = initializeSignalRConnection(negotiateUrl, negotiateToken);
                connection.on("newTelemetry", telemetry => setTelemetryData(telemetry));
            }
        }, [isAuthenticated, negotiateToken, negotiateUrl]); */

    return (
        <div>
            <h1>Climate</h1>
            <div className='devices'>
                {devices && devices.map(device => {
                    return (
                        <div key={device.id} className='device'>
                            <h2>{device.name}</h2>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Climate