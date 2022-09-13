import React from 'react'
import { NavLink } from 'react-router-dom';
import { SignOutButton } from './SignOutButton';

function Navbar() {
    return (
        <nav className='navbar'>
            <NavLink to="/">Hem</NavLink>
            <NavLink to="/climate">Klimatöversikt</NavLink>
            <SignOutButton />
        </nav>
    )
}

export default Navbar;