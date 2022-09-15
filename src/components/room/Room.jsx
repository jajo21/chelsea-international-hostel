import React from "react";
import "./room.css";

function Room({ name, temperature }) {
    return (
        <div className="room">
            <p>{name}</p>
            <p>Temperatur: {temperature}</p>
            <p>Fuktighet:</p>
            <p>Decibel:</p>
        </div>
    )
}
export default Room;