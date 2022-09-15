import React, { useEffect, useState } from 'react';
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { callSmarthut } from '../negotiate';
import { initializeSignalRConnection } from '../connectionSignalR';
import { getMyBuilding } from '../getDevices';
import { loginRequest } from '../auth/authConfig';

function Climate() {
    const isAuthenticated = useIsAuthenticated();
    const { accounts, instance } = useMsal();

    const [negotiateUrl, setNegotiateUrl] = useState(null);
    const [negotiateToken, setNegotiateToken] = useState(null);
    const [telemetryData, setTelemetryData] = useState(null);

    useEffect(() => {
        if (isAuthenticated) {
            const request = {
                loginRequest,
                account: accounts[0]
            };

            instance.acquireTokenSilent(request).then((response) => {
                getMyBuilding(response.accessToken).then(res => {
                    console.log(res);
                })
            });
        }
    }, [isAuthenticated, accounts]);

    useEffect(() => {
        callSmarthut(accounts[0].username).then(res => {
            setNegotiateUrl(res.url);
            setNegotiateToken(res.accessToken);
        })

        if (isAuthenticated && negotiateUrl !== null) {
            const connection = initializeSignalRConnection(negotiateUrl, negotiateToken);
            connection.on("newTelemetry", telemetry => setTelemetryData(telemetry));
        }
    }, [isAuthenticated, negotiateToken, negotiateUrl]);

    return (
        <div>
            <h1>Climate</h1>
            {console.log("data", telemetryData)}
        </div>
    )
}

export default Climate