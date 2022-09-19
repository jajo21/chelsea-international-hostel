const restoreEndpoint = "https://smarthut.azurewebsites.net/api/restorealarm";

export async function restoreAlarm(deviceId, email) {

    const options = {
        method: "POST",
        body: JSON.stringify({
            "deviceId": deviceId,
            "userName": email
        })
    };

    return fetch(restoreEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}