import React, { useContext } from "react";
import Room from "../room/Room";
import DataContext from "../../contexts/DataContext";
import { alarmTrue } from "../../data/alarms/handleAlarms";

import Loading from "../loading/Loading";
import Filter from "../filter/Filter";
import Notification from "../notification/Notification";

import "./css/climate.css";

function Climate() {
  const { rooms, alarms, filter, setFilter } = useContext(DataContext);

  let filteredRooms = null;
  if (filter) {
    filteredRooms = rooms.filter(room => alarmTrue(room.devices));
  }

  return (
    <main>
      {rooms && <Notification alarms={alarms} />}
      <div className="climate">
        <div className="rooms">
          {rooms && <Filter filter={filter} setFilter={setFilter} />}
          {!rooms && <Loading size={"large"} />}
          {rooms && !filter &&
            rooms.map((room) => {
              return (
                <Room
                  key={room.id}
                  name={room.name}
                  devices={room.devices}
                />
              );
            })
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
