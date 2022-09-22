import React, { useContext } from "react";
import Room from "../room/Room";
import "./climate.css";
import DeviceContext from "../../contexts/DeviceContext";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

function Climate() {
  const { rooms, alarms } = useContext(DeviceContext);

  return (
    <main>
      <div className={alarms.length === 0 ? "greennotis" : "rednotis"}>
        {alarms.length === 0 ? `Allt är OK` : `VARNING LARM! Antal sensorer som larmar: ${alarms.length}`}
        {alarms.length === 0 ? <SentimentSatisfiedIcon /> : ""}
      </div>

      <div className="climate">
        <div className="filter">
          <FilterAltIcon fontSize="large" />
        </div>
        <div className="rooms">
          {rooms &&
            rooms.map((room) => {
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
