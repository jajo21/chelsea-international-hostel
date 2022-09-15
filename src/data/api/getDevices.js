const smartHutEndpoint = "https://api.smarthut.se";

export async function getBuilding(accessToken) {
    const headers = new Headers();
    const url = `${smartHutEndpoint}/BuildingInfo/GetMyBuilding`

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

export async function getBuildingDevices(accessToken, buildingId) {
    const headers = new Headers();
    const url = `${smartHutEndpoint}/BuildingInfo/${buildingId}/true`

    headers.append("Authorization", "Bearer " + accessToken);
    headers.append('Content-type', 'application/json; charset=UTF-8')

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(url, options)
        .then(response => response.json())
        .then(res => res.devices)
        .catch(error => console.log(error));
}