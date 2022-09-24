import React from 'react'
import "./loading.css";

function Loading({ size }) {
    return (
        <div className={`loading-div-${size}`}>
            <div className={`spinner spinner-${size}`}></div>
        </div>
    )
}

export default Loading