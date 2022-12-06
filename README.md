# Chelsea-international-hostel

Hotellet Chelsea International Hostel har påbörjat sin digitaliseringsprocess med hjälp av SmartHuts smarta sensorer som kan mäta exempelvis värme och luftfuktighet. Nu vill de ha hjälp att skapa ett användargränssnitt för att kunna styra sina smarta sensorer. Här är nuvarande resultat.

---

## Instruktioner

### Förbered dator

1. Installera node och npm från den här sidan https://nodejs.org/en/download/.
2. Verifiera installationen av node genom att skriva `node -v` i terminalen. Systemet bör visa vilken version du har installerad.
3. Verifiera installationen av npm genom att skriva `npm -v` i terminalen. Systemet bör visa vilken version du har installerad.
4. Installera npm globalet genom att skriva `npm install -g npm` i terminalen.

### Förbered och starta applikationen

1. Ladda ner repot från https://github.com/jajo21/chelsea-international-hostel.
2. Leta upp valfri terminal och utgå från nerladdad chelsea-international-hostel mapp och skriv: `npm ci` nu laddas alla nödvändiga paket för att starta applikationen ner.
3. När alla paket har laddats klart skriver du i terminalen: `npm start` det här transpilerar koden via parcel och startar applikationen.
4. Normalt ska applikationen öppnas i din webbläsare, om den inte gör det, öppna valfri webbläsare och navigera in på https://localhost:5001.

---

## Systemarkitektur

### Sekvensdiagram

_(Tryck på bilden för att göra den större)_

<img src="./documentation/sekvensdiagram.png" width="100%">

Det här är en övergripande bild av hur kommunikationen i applikationen ser ut mot Microsoft Identity Platform, SmartHuts API samt SmartHuts realtidkommunikation.

För mer information om SmartHuts API och åtkomstpunkter gå in på [swagger](https://api.smarthut.se/swagger/index.html)

---

## Externa bibliotek

Man kan tydligt se vilka externa bibliotek som är installerade i package.json. Men här kommer en mindre övergripande förklaring av de bibliotek som har betydelse för applikationen.

### [Parcel](https://www.npmjs.com/package/parcel)
Används för att sätta upp en utvecklingsmiljö med transpilering och bundling.

### [React](https://www.npmjs.com/package/react) och [React-Dom](https://www.npmjs.com/package/react-dom)
React är ett kodbibliotek som enkelt hjälper dig att skapa vy-lagret i en Single Page Applikation.

### [React-Router-Dom](https://www.npmjs.com/package/react-router-dom)
Är ett externt bibliotek som gör det möjligt för react-projekt att via komponenter deklarera olika delar av komponentträdet som olika webbresurser/sidor i webbläsarens historik.

### [@azure/msal-browser](https://www.npmjs.com/package/@azure/msal-browser)
Är ett bibliotek som gör det möjligt att autentisera användare via Microsoft Authentication med JavaScript(MSAL.js).

### [@azure/msal-react](https://www.npmjs.com/package/@azure/msal-react)
Liknande som ovan fast med andra funktioner specifikt för react.

### [@microsoft/signalr](https://www.npmjs.com/package/@microsoft/signalr)
Ett paket som hjälper till att skapa kopplingen mot SignalR för att kunna ta emot realtidskommunikation.

## Syfte - YH-utbildning: Webbutvecklare .NET

- Inlämningsuppgift i kursen Webbapplikationer med realtidskommunikation - Maj 2022
- Gruppuppgift Webbutvecklare.NET. Hotellet Chelsea International Hostel har påbörjat sin digitaliseringsprocess med hjälp av SmartHuts smarta sensorer som kan mäta exempelvis värme och luftfuktighet. Nu vill de ha hjälp att skapa ett användargränssnitt för att kunna styra sina smarta sensorer. Här ska vi arbeta i grupp och leverera en produkt till en fiktiv VD.
- Resultat: 100/100 (G)

## Tekniker

- React.js
- Fetch-API
- WebSockets
- microsoft-signalr
- msal-react
- msal-browser
- Parcel
- HTML
- CSS

## Kravspecifikation och uppgiftsbeskrivning

Uppgiften går ut på att vi får en vag bakgrund av vad ett hotell behöver för digitalisering av sina smarta mätare. Nu är det gruppens uppgift att lösa det här problemet. Vi fick under kursens gång ha korta möten tillsammans med VD för att landa i och komma överens om en kravspecifikation för hela produkten. Under kursens veckor har det funnits olika delmål och leveranser av förstudie, planering & design tillsammans med lägesrapporter & presentationer.  

Här får ni ett smakprov av förstudien: 
[Förstudie Chelsea International Hostel - Johannes, Louice, Emil.pdf](https://github.com/jajo21/chelsea-international-hostel/files/10164404/Forstudie.Chelsea.International.Hostel.-.Johannes.Louice.Emil.pdf)

