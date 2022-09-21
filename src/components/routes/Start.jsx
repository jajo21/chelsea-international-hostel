import React from "react";
import { useMsal } from "@azure/msal-react";
import { handleLogin } from "../../data/auth/handleAuth";
import Button from "../Button";
import logo from "../../img/logo.png";
import "../css/start.css";
import "../css/button.css";

function Start() {
  const { instance } = useMsal();
  return (
    <main>
        <img src={logo} />
      <br />
      <div className="start">
        <h2 className="welcome">Välkommen!</h2>
        <h2 className="login_txt">Logga in för att ta dig vidare</h2>
        <Button className={"startBtn"} onClick={() => handleLogin(instance)}>
          Logga in
        </Button>
      </div>
    </main>
  );
}

export default Start;
