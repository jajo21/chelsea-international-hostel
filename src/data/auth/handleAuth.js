import { loginRequest } from "./authConfig";

export function handleLogin(instance) {
    instance.loginRedirect(loginRequest).catch(e => {
        console.error(e);
    });
}

export function handleLogout(instance) {
    instance.logoutRedirect().catch(e => {
        console.error(e);
    });
}

export function aquireToken(instance, accounts) {
    const request = {
        loginRequest,
        account: accounts[0]
    };

    return instance.acquireTokenSilent(request)
        .then(res => {
            if (!res) throw new Error(res.status);
            const accessToken = res.accessToken
            return [accessToken, null];
        })
        .catch(err => {
            console.error(err.message)
            const error = "Något gick fel vid hämtning av token, försök igen senare!";
            return [null, error];
        });
}