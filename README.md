# Timer Service

Dette repositorie indeholder filer mv, relateret til opgave i forbindelse med nyansættelse af frontendudvikler hos DBC.

Selve opgaven er beskrevet i [TASK.md](TASK.md). Denne side beskriver den service der leveres med som en del af opgaven.

## Timer servicen

Filen [server.js](server.js) er en meget simpel REST server skrevet i Node.js, der skal bruges til at løse opgaven med. Du kan bruge den direkte eller modificere, hvis du ønsker det. Den stiller et lille sæt endpoints til rådighed:

- `POST /timers` – Opret ny timer-serie. Timeren er paused når den oprettes
- `POST /timers/:id/start` – Start timeren fra pause
- `POST /timers/:id/pause` – Pause timeren
- `POST /timers/:id/reset` – Nulstil timeren og pause den
- `POST /timers/:id/adjust` – Sætter et nyt interval på timeren. Fejler hvis timeren er i gang - kun timere i pause kan justeres
- `GET /timers/:id/status` – Hent nuværende status

> Bemærk: Service-modellen gemmer kun et sluttidspunkt (`endsAt`) men udregner i visse API kald hvor lang tid der er tilbage. Det betyder at klienten selv kan vise en nedtælling lokalt baseret på serverens data og viden om den aktuelle tid.

Der er information om serverens API i [openapi.yaml](openapi.yaml) som også kan besøges direkte i servicen. Servicekoden er inkluderet og kan køres lokalt med node.js.

> Bemærk: Der er åbnet i serveren for at kunne tilgås af klienter fra localhost:8000

### Kørsel af serveren

1. Kør `npm install`
2. Start med `node server.js`
3. API’et kører på http://localhost:3000 - og kan ses i en lokal browser

### Test af serveren

Kør `npm test` for at køre en simpel test.

## Timer klienten

1. Naviger til client mappen: `cd app`
2. Installer dependencies: `npm install`
3. Start udviklingsserveren: `npm run dev`
4. Åbn http://localhost:8000 i browseren

Bemærk: Serveren skal køre på port 3000 for at klienten kan kommunikere med den.
