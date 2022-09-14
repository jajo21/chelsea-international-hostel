const smartHutEndpoint = "https://api.smarthut.se";

export async function getMyBuilding(accessToken) {
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