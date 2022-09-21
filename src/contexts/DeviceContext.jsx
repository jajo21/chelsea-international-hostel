import { createContext, useState, useEffect } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { aquireToken } from "../data/auth/handleAuth";
import { getBuilding, getBuildingDevices } from "../data/api/getDevices";
import { getUnits } from "../data/api/getUnits";
import { addUnitExplanation } from "../data/units/handleUnits";
import { callSmarthut } from "../data/signalr/negotiate";
import { initializeSignalRConnection } from "../../data/signalr/connectionSignalR";

const DeviceContext = createContext();

export function DeviceProvider({ children }) {
    const isAuthenticated = useIsAuthenticated();
    const { accounts, instance } = useMsal();

    const [devices, setDevices] = useState([]);
    const [units, setUnits] = useState([]);
    const [connection, setConnection] = useState(null);

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
                setDevices(devices);
                const units = await getUnits(instance, accounts);
                const unitsWithExplanation = addUnitExplanation(units);
                setUnits(unitsWithExplanation);
            }
            fetchData();
        }
    }, [isAuthenticated]);

    return (
        <DeviceContext.Provider
            value={{
                devices,
                units,
                connection,
                setDevices
            }}>
            {children}
        </DeviceContext.Provider>
    )
}

export default DeviceContext