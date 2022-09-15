import { loginRequest } from "./authConfig";

export function handleLogin(instance) {
    instance.loginRedirect(loginRequest).then(res => {
        console.log("in button", res);
    }).catch(e => {
        console.error(e);
    });
}

export function handleLogout(instance) {
    instance.logoutRedirect().catch((e) => {
        console.error(e);
    });
}