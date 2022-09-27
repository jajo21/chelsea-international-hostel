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
        .then(async response => {
            if (!response.ok) throw new Error(response.status)
            const building = await response.json();
            return [building, null];
        })
        .catch(err => {
            console.error(err);
            const error = "Något gick fel vid hämtning av byggnad från API:et, försök igen senare!";
            return [null, error];
        });
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
        .then(async response => {
            if (!response.ok) throw new Error(response.status)
            const building = await response.json()
            const devices = building.devices;
            return [devices, null];
        })
        .catch(err => {
            console.error(err);
            const error = "Något gick fel vid hämtning av byggnad och sensorer från API:et, försök igen senare!";
            return [null, error];
        });
}