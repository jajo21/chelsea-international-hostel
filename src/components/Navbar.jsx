import React from "react";
import { NavLink } from "react-router-dom";
import { SignOutButton } from "./SignOutButton";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-item">
        <i className="fa fa-fw fa-home"></i>Hem
      </NavLink>
      <NavLink to="/climate" className="navbar-item">
        Klimatöversikt
      </NavLink>
      <SignOutButton className="navbar-item" />
    </nav>
  );
}

export default Navbar;
