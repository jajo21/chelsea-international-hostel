import React from "react";
import { useMsal } from "@azure/msal-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        Logga ut
      </button>
    </div>
  );
};
