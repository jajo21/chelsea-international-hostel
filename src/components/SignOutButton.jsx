import React from "react";
import { useMsal } from "@azure/msal-react";

function handleLogout(instance) {
  instance.logoutRedirect().catch((e) => {
    console.error(e);
  });
}

/**
 * Renders a button which, when selected, will open a popup for logout
 */
export const SignOutButton = () => {
  const { instance } = useMsal();

  return (
    <div>
      <button className="signoutButton" onClick={() => handleLogout(instance)}>
        <i className="fa-solid fa-right-from-bracket"></i>
        Logga ut
      </button>
    </div>
  );
};
