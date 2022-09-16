import { aquireToken } from "../auth/handleAuth";

const smartHutEndpoint = "https://api.smarthut.se";

export async function getUnits(instance, accounts) {
    const accessToken = await aquireToken(instance, accounts);

    const headers = new Headers();
    const url = `${smartHutEndpoint}/Unit`

    headers.append("Authorization", "Bearer " + accessToken);
    headers.append('Content-type', 'application/json; charset=UTF-8')

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(url, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}