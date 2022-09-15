import * as signalR from '@microsoft/signalr';

export const initializeSignalRConnection = (url, token) => {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl(url, { accessTokenFactory: () => token })
        .configureLogging(signalR.LogLevel.Information)
        .build();

    connection.start().catch(err => console.error(err.toString()));
    return connection;
}