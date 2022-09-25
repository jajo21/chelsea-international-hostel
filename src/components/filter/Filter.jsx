import React from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import "./filter.css";

function Filter({ filter, setFilter }) {
    return (
        <div className="filter">
            <div className="filter-text" >
                {filter ? "Larmade Rum" : "Alla Rum"}
            </div>
            <span title="Filter" className="filter-icon">
                <FilterAltIcon fontSize="inherit" onClick={() => setFilter(!filter)} />
            </span>
        </div>
    )
}

export default Filter