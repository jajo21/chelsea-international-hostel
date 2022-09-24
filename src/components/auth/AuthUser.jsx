import React from 'react';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { authUserConfig } from '../../data/auth/authConfig';

const userInstance = new PublicClientApplication(authUserConfig);

function AuthUser(props) {
    return (
        <MsalProvider instance={userInstance}>
            {props.children}
        </MsalProvider>
    )
}

export default AuthUser