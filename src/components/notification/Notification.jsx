import React from 'react'

import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import "./notification.css"

function Notification({ alarms }) {
    return (
        <div className={alarms.length === 0 ? "greennotis" : "rednotis"}>
            <span>
                {alarms.length === 0 ? `Allt är OK` : `VARNING LARM! Antal sensorer som larmar: ${alarms.length}`}
            </span>
            <span>
                {alarms.length === 0 ? <SentimentSatisfiedAltIcon fontSize="inherit" /> : <SentimentVeryDissatisfiedIcon fontSize="inherit" />}
            </span>
        </div>
    )
}

export default Notification