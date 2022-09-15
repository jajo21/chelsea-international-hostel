import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../auth/authConfig";

function handleLogin(instance) {
    instance.loginRedirect(loginRequest).catch(e => {
        console.error(e);
    });
}

export const SignInButton = () => {
    const { instance } = useMsal();

    return (
        <button onClick={() => {
            handleLogin(instance);
        }
        }>Logga in</button>
    );
}