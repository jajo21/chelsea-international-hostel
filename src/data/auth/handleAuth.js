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