import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { handleLogout } from "../../data/auth/handleAuth";

import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";

import Button from "../button/Button";
import "./navbar.css";

function Navbar() {
  const { instance } = useMsal();

  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <NavLink to="/" className="navbar-item">
          <HomeIcon fontSize="inherit" />
        </NavLink>
        <NavLink to="/climate" className="navbar-item">
          <DeviceThermostatIcon fontSize="inherit" />
        </NavLink>
        <Button className={"logout_btn"} onClick={() => handleLogout(instance)}>
          <LogoutIcon fontSize="inherit" />
        </Button>
      </nav>
      {!mobile &&
        <nav className="sidebar">
          <ul className="sidebar-items">
            <li className="sidebar-item">
              <NavLink to="/" className="sidebar-item1">
                <HomeIcon fontSize="large" />&ensp; Hem
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/climate" className="sidebar-item">
                <DeviceThermostatIcon fontSize="large" />&ensp; Klimat
              </NavLink>
            </li>
          </ul>
          <div className="sidebar-logout">
            <Button
              className={"sidebar-btn"}
              onClick={() => handleLogout(instance)}>
              <LogoutIcon fontSize="large" />&ensp; Logga ut
            </Button>
          </div>
        </nav>
      }
    </>
  );
}
export default Navbar;
