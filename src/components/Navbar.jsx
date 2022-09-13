import React from 'react'
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav className='navbar'>
            <NavLink to="/home">Hem</NavLink>
            <NavLink to="/climate">Klimatöversikt</NavLink>
            <NavLink to="#">Logga ut</NavLink>
        </nav>
    )
}

export default Navbar;