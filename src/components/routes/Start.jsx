import React from "react";
import { SignInButton } from "../SignInButton";
import logo from "../../img/logo.png";

function Start() {
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
        <SignInButton />
      </div>
    </>
  );
}

export default Start;
