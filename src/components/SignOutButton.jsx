import React from "react";
import { useMsal } from "@azure/msal-react";

function handleLogout(instance) {
  instance.logoutRedirect().catch((e) => {
    console.error(e);
  });
}

export const SignOutButton = () => {
  const { instance } = useMsal();

  return (
    <div className="signoutButton">
      <button onClick={() => handleLogout(instance)}>Logga ut</button>
    </div>
  );
};
