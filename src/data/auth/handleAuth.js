import { loginRequest } from "./authConfig";

export function handleLogin(instance) {
    instance.loginRedirect(loginRequest).catch(e => {
        console.error(e);
    });
}

export function handleLogout(instance) {
    instance.loginRedirect().catch((e) => {
        console.error(e);
    });
}

export function aquireToken(instance, accounts) {
    const request = {
        loginRequest,
        account: accounts[0]
    };

    return instance.acquireTokenSilent(request).then(res => res.accessToken);
}