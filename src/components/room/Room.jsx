import React, { useState } from "react";
import "./room.css";

function Room({ name, unitName, alarm, value, unit }) {
    return (
        <div className="room">
            <h2>{name}</h2>
            <div className="room-card">
                <p>{unitName} | {alarm} | {value} {unit}</p>
            </div>
        </div>
    )
}
export default Room;