import React from "react";
import { useMsal } from "@azure/msal-react";
import { handleLogin } from "../auth/handleAuth";

export const SignInButton = () => {
    const { instance } = useMsal();

    return (
        <button onClick={() => handleLogin(instance)}>Logga in</button>
    );
}