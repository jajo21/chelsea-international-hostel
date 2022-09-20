import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { handleLogout } from "../data/auth/handleAuth";
import Button from "./Button";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";
import LogoutIcon from "@mui/icons-material/Logout";
import "./navbar.css";

function Navbar() {
  const { instance } = useMsal();

  const [mobile, setMobile] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 800) {
      setMobile(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setMobile(true);
      } else {
        setMobile(false);
        setSidebar(true);
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
          <HomeIcon />
        </NavLink>
        <NavLink to="/climate" className="navbar-item">
          <DeviceThermostatIcon />
        </NavLink>
        <Button className={"logout_btn"} onClick={() => handleLogout(instance)}>
          <LogoutIcon />
        </Button>
      </nav>
      {!mobile}

      {!mobile}
      <div className={sidebar ? "sidebar active" : "sidebar"}>
        <div className="sidebar-toggle">
          {sidebar ? (
            <MenuIcon
              className="sidebar-toggle-logo"
              onClick={() => setSidebar(!sidebar)}
            />
          ) : (
            <ClearIcon
              className="sidebar-toggle-logo"
              onClick={() => setSidebar(!sidebar)}
            />
          )}
          <ul className="sidebar-items">
            <li className="sidebar-item">
              <NavLink to="/" className="sidebar-item">
                <HomeIcon /> Hem
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/climate" className="sidebar-item">
                <DeviceThermostatIcon /> Klimatöversikt
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="sidebar-logout">
          <Button
            className={"sidebar-btn"}
            onClick={() => handleLogout(instance)}
          >
            <LogoutIcon />
          </Button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
