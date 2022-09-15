import React, { useEffect, useState } from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { callSmarthut } from '../../data/signalr/negotiate';
import { initializeSignalRConnection } from '../../data/signalr/connectionSignalR';
import { getMyBuilding } from '../../data/api/getDevices';
import { loginRequest } from '../../data/auth/authConfig';
import { aquireToken } from '../../data/auth/handleAuth';
import { getBuilding } from '../../data/api/getDevices';
import { getBuildingDevices } from '../../data/api/getDevices';
import Room from '../room/Room';
import "./climate.css";

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
        const accessToken = await aquireToken(instance, accounts);
        const building = await getBuilding(accessToken);
        const devices = await getBuildingDevices(accessToken, building.id);
        setDevices(devices);
      };
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

            <div className='rooms'>
                {devices && devices.map(device => {
                    return (
                        <Room
                            key={device.id}
                            name={device.name}
                            temperature={device.maxValue}
                        />
                    )
                })}

            </div>
        </div>
    )
}

export default Climate;
