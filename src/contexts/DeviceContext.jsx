import { createContext, useState, useEffect } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { aquireToken } from "../data/auth/handleAuth";
import { getBuilding, getBuildingDevices } from "../data/api/getDevices";
import { getUnits } from "../data/api/getUnits";

const DeviceContext = createContext();

export function DeviceProvider({ children }) {
    const isAuthenticated = useIsAuthenticated();
    const { accounts, instance } = useMsal();

    const [devices, setDevices] = useState([]);
    const [units, setUnits] = useState([]);

    useEffect(() => {
        if (isAuthenticated) {
            const fetchData = async () => {
                const accessToken = await aquireToken(instance, accounts);
                const building = await getBuilding(accessToken);
                const devices = await getBuildingDevices(accessToken, building.id);
                const units = await getUnits(instance, accounts);
                setDevices(devices);
                setUnits(units);
            }
            fetchData();
        }
    }, [isAuthenticated]);

    return (
        <DeviceContext.Provider
            value={{
                devices,
                units,
                setDevices
            }}>
            {children}
        </DeviceContext.Provider>
    )
}

export default DeviceContext