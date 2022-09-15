import React from "react";
import { useMsal } from "@azure/msal-react";
import { handleLogout } from "../auth/handleAuth";


export const SignOutButton = () => {
  const { instance } = useMsal();

  return (
    <div className="signout-button">
      <button onClick={() => handleLogout(instance)}>Logga ut</button>
    </div>
  );
};