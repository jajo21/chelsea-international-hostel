import React from "react";
import { NavLink } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { handleLogout } from "../data/auth/handleAuth";
import Button from "./Button";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import LogoutIcon from "@mui/icons-material/Logout";
import "./navbar.css";

function Navbar() {
  const { instance } = useMsal();
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-item">
        <i className="fa fa-fw fa-home"></i>Hem
      </NavLink>
      <NavLink to="/climate" className="navbar-item">
        <DeviceThermostatIcon />
        Klimatöversikt
      </NavLink>
      <Button className={"logout_btn"} onClick={() => handleLogout(instance)}>
        <LogoutIcon />
      </Button>
    </nav>
  );
}

export default Navbar;
