export const msalConfig = {
    auth: {
        clientId: "86c88538-2e16-46d1-b3f4-e26cd8d8eabc",
        authority: "https://login.microsoftonline.com/9bfa1706-1ffc-494d-a63e-dbbb34c4796b", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
        redirectUri: "/signin_callback",
        postLogoutRedirectUri: "/signout",
        protocolMode: "AAD"
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
    scopes: [`api://957fee47-d75a-4f21-a073-f68815061809/access_as_a_user`]
};