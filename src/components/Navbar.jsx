import React from "react";
import { NavLink } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { handleLogout } from "../data/auth/handleAuth";
import Button from "./Button";
import "./navbar.css";

function Navbar() {
  const { instance } = useMsal();
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-item">
        <i className="fa fa-fw fa-home"></i>Hem
      </NavLink>
      <NavLink to="/climate" className="navbar-item">
        <i className="fa-solid fa-temperature-high"></i>
        Klimatöversikt
      </NavLink>
      <Button onClick={() => handleLogout(instance)} className="navbar-item">Logga ut</Button>
    </nav>
  );
}

export default Navbar;
