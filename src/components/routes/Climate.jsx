import React, { useEffect, useState, useContext } from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { callSmarthut } from "../../data/signalr/negotiate";
import { initializeSignalRConnection } from "../../data/signalr/connectionSignalR";
import { createRooms } from "../../data/rooms/createRooms";
import Room from "../room/Room";
import "./climate.css";
import DeviceContext from "../../contexts/DeviceContext";

function Climate() {
  const { devices, setDevices } = useContext(DeviceContext);
  const isAuthenticated = useIsAuthenticated();
  const { accounts } = useMsal();
  const [rooms, setRooms] = useState(null);
  const [telemetryData, setTelemetryData] = useState(null);
  const [alarmNeutralized, setAlarmNeutralized] = useState(null);
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
    if (connection && !connection.connectionStarted) {
      // GÅR DET ATT GÖRA DET HÄR VID INLOGG UTAN POPUP?!
      connection
        .start()
        .then(() => {
          connection.on("newTelemetry", (telemetry) =>
            setTelemetryData(telemetry)
          );
          connection.on("alarmNeutralized", (alarmNeutralized) =>
            setAlarmNeutralized(alarmNeutralized)
          );
        })
        .catch((err) => console.error("Connection interrupted: ", err));
    }
  }, [connection]);

  useEffect(() => {
    if (telemetryData) {
      const devicesWithTelemetry = [...devices];
      devicesWithTelemetry.map((device) => {
        return telemetryData.map((telemetry) => {
          if (device.alarm === undefined) {
            device.alarm = false;
          }
          if (telemetry.deviceId === device.id.toUpperCase()) {
            device.value = telemetry.value;
            if (
              device.value > device.maxValue ||
              device.value < device.minValue
            ) {
              device.alarm = true;
            }

            return devicesWithTelemetry;
          }
          return devicesWithTelemetry;
        });
      });
      setDevices(devicesWithTelemetry);
    }
  }, [telemetryData]);

  useEffect(() => {
    if (connection && !connection.connectionStarted) {
      connection
        .start()
        .then(() => {
          connection.on("newTelemetry", (telemetry) =>
            setTelemetryData(telemetry)
          );
        })
        .catch((err) => console.error("Connection interrupted: ", err));
    }
  }, [connection]);

  useEffect(() => {
    if (telemetryData) {
      const devicesWithTelemetry = [...devices];
      devicesWithTelemetry.map((device) => {
        return telemetryData.map((telemetry) => {
          if (telemetry.deviceId === device.id.toUpperCase()) {
            console.log(device.id);
            device.value = telemetryData[0].value;
            return devicesWithTelemetry;
          }
          return devicesWithTelemetry;
        });
      });
      setDevices(devicesWithTelemetry);
    }
    const rooms = createRooms(devices);
    setRooms(rooms);
  }, [telemetryData]);

  useEffect(() => {
    if (alarmNeutralized) {
      let alarmNeutralizedId = alarmNeutralized.slice(33, 69);
      const changeRooms = [...rooms];
      changeRooms.map((room) => {
        room.devices.map((device) => {
          if (device.id === alarmNeutralizedId) {
            device.alarm = false;
          }
          return changeRooms;
        });
        return changeRooms;
      });
      setRooms(changeRooms);
    }
  }, [alarmNeutralized]);

  return (
    <main>
      <div className="climate">
        <div className="rooms">
          {rooms &&
            rooms.map((room) => {
              return (
                <Room
                  key={room.id}
                  name={room.name}
                  devices={room.devices}
                  email={accounts[0].username}
                />
              );
            })}
        </div>
      </div>
    </main>
  );
}

export default Climate;
