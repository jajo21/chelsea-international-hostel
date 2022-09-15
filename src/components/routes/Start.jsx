import React from "react";
import { useMsal } from "@azure/msal-react";
import { handleLogin } from "../../data/auth/handleAuth";
import Button from "../Button";
import logo from "../../img/logo.png";

function Start() {
  const { instance } = useMsal();
  return (
    <>
      <div className="logoContainer">
        <img src={logo} />
      </div>
      <br />
      <div className="start">
        <h2>Välkommen!</h2>
        <br />
        <h2>Logga in för att ta dig vidare</h2>
        <Button onClick={() => handleLogin(instance)}>Logga in</Button>
      </div>
    </>
  );
}

export default Start;
