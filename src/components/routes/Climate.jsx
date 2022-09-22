import React, { useContext } from "react";
import Room from "../room/Room";
import "./climate.css";
import DeviceContext from "../../contexts/DeviceContext";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

function Climate() {
  const { rooms } = useContext(DeviceContext);
  const alarm = true;
  const alarmNotis = "Allt är OK";
  return (
    <main>
      <div className="climate">
        {alarm && (
          <div className={alarm ? "greennotis" : "rednotis"}>
            {alarmNotis}
            <SentimentSatisfiedIcon />
          </div>
        )}
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
