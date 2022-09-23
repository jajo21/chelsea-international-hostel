import React, { useContext } from "react";
import Room from "../room/Room";
import DeviceContext from "../../contexts/DeviceContext";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { alarmTrue } from "../../data/alarms/handleAlarms";
import "./climate.css";

function Climate() {
  const { rooms, alarms, filter, setFilter } = useContext(DeviceContext);

  let filteredRooms = null;
  if (filter) {
    filteredRooms = rooms.filter(room => alarmTrue(room.devices));
  }

  return (
    <main>
      <div className={alarms.length === 0 ? "greennotis" : "rednotis"}>
        {alarms.length === 0 ? `Allt är OK` : `VARNING LARM! Antal sensorer som larmar: ${alarms.length}`}
        {alarms.length === 0 ? <SentimentSatisfiedIcon /> : ""}
      </div>
      <div className="climate">
        <div className="filter">

          <FilterAltIcon fontSize="inherit" />

          {filter ? "Larmade Rum" : "Alla Rum"}
          <span title="Filter">
            <FilterAltIcon onClick={() => setFilter(!filter)} />
          </span>

        </div>
        <div className="rooms">
          {rooms && !filter &&
            rooms.map((room) => {
              return (
                <Room
                  key={room.id}
                  name={room.name}
                  devices={room.devices}
                />
              );
            })}

          {filteredRooms && filter &&
            filteredRooms.map((room) => {
              return (
                <Room
                  key={room.id}
                  name={room.name}
                  devices={room.devices}
                />
              );
            })}
        </div>
      </div>
    </main>
  );
}

export default Climate;
