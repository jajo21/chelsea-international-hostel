const negotiateEndpoint = "https://smarthut.azurewebsites.net/api/negotiate";

export async function callSmarthut(email) {
    const headers = new Headers();

    headers.append("X-MS-SIGNALR-USERID", email)

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(negotiateEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}