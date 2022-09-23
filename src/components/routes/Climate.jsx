import React, { useContext } from "react";
import Room from "../room/Room";
import DeviceContext from "../../contexts/DeviceContext";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
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
        <span>
          {alarms.length === 0 ? `Allt är OK` : `VARNING LARM! Antal sensorer som larmar: ${alarms.length}`}
        </span>
        <span>
          {alarms.length === 0 ? <SentimentSatisfiedAltIcon fontSize="inherit" /> : <SentimentVeryDissatisfiedIcon fontSize="inherit" />}
        </span>
      </div>
      <div className="climate">
        <div className="rooms">
          <div className="filter">
            <div className="filter-text" >
              {filter ? "Larmade Rum" : "Alla Rum"}
            </div>
            <span title="Filter" className="filter-icon">
              <FilterAltIcon fontSize="inherit" onClick={() => setFilter(!filter)} />
            </span>
          </div>
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
