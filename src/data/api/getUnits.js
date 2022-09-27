const smartHutEndpoint = "https://api.smarthut.se";

export async function getUnits(accessToken) {
    const headers = new Headers();
    const url = `${smartHutEndpoint}/Unit`

    headers.append("Authorization", "Bearer " + accessToken);
    headers.append('Content-type', 'application/json; charset=UTF-8')

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(url, options)
        .then(async response => {
            if (!response.ok) throw new Error(response.status)
            const units = await response.json();
            return [units, null];
        })
        .catch(err => {
            console.error(err);
            const error = "Något gick fel vid hämtning av sensorenheter från API:et, försök igen senare!";
            return [null, error];
        });
}