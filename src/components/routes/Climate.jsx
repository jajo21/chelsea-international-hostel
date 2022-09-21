import React, { useContext } from "react";
import Room from '../room/Room';
import "./climate.css";
import DeviceContext from "../../contexts/DeviceContext";


function Climate() {
    const { accounts, rooms } = useContext(DeviceContext);

    return (
        <main>
            <div className="climate">

                <div className='rooms'>
                    {rooms && rooms.map(room => {

                        return (
                            <Room
                                key={room.id}
                                name={room.name}
                                devices={room.devices}
                                email={accounts[0].username}
                            />
                        )
                    })}
                </div>
            </div>
        </main>
    )
}

export default Climate;
