import React from "react";
import { useMsal } from "@azure/msal-react";
import { handleLogin } from "../../data/auth/handleAuth";
import Button from "../button/Button";
import logo from "../../img/logo.png";
import "./css/start.css";

function Start() {
  const { instance } = useMsal();
  return (
    <main>

      <div className="space"></div>

      <div className="start-wrapper">
        <img className="startLogo" src={logo} />
        <br />
        <div className="start">
          <h2 className="welcome">Välkommen!</h2>
          <h2 className="login_txt">Logga in för att ta dig vidare</h2>
          <Button className={"startBtn"} onClick={() => handleLogin(instance)}>
            Logga in
          </Button>
        </div>
      </div>
    </main>
  );
}

export default Start;