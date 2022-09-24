import React, { useContext } from "react";
import Room from "../room/Room";
import DataContext from "../../contexts/DataContext";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { alarmTrue } from "../../data/alarms/handleAlarms";

import Loading from "../loading/Loading";

import "./css/climate.css";

function Climate() {
  const { rooms, alarms, filter, setFilter } = useContext(DataContext);

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


          {rooms && !filter
            ?
            rooms.map((room) => {
              return (
                <Room
                  key={room.id}
                  name={room.name}
                  devices={room.devices}
                />
              );
            })
            :
            <Loading />  /* DEN HÄR BEÖVER LÖSAS SÅ DEN BLIR BRA */
          }

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
