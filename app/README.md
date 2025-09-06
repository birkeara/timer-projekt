## Opsætning af app

1. Naviger til client mappen: `cd app`
2. Installer dependencies: `npm install`
3. Start udviklingsserveren: `npm run dev`
4. Åbn http://localhost:8000 i browseren

Bemærk: Serveren skal køre på port 3000 for at klienten kan kommunikere med den.

## Løsning af opgave

1. Planlægning
2. Opsætning og build
3. Repostruktur, folders og genbrugelige components
4. Opsætning af basic API med simpel console.log test
5. Navigation og dirigent/viewer page
6. Afrunding og retro
7. Github og aflevering

### Opsætning

Da jeg havde sat mig ind i opgaven og planlagt min fremgangsmåde, samt fundet en god struktur på projektet, løb jeg desværre ind i det klassiske problem: buildfejl. Det gik desværre ud over den tid jeg havde til at løse selve opgaven, fordi jeg i stedet brugte tid på at google fejl på StackOverflow og prøve forskellige ting af. Det viste sig at jeg ikke havde rettigheder til at køre scripts, hvilket nok var blevet fjernet efter min PC har været på besøg hos Microsoft og blevet gendannet.

### Struktur

Min tanke var at jeg ville lave forskellige komponenter som jeg kunne genbruge rundt omkring i opgaven, samt strukturere det i forskellige genbrugelig funktioner og formatteringer, som ville gøre koden lidt mere ren. Desværre nåede jeg ikke så langt med mine genbrugelige komponenter. På fx dirigitent siden ville jeg gerne erstatte de button html elementer med komponent Button i stedet.

### Funktioner

Min timerApi fil vil jeg gerne have delt op i forskellige filer. Fx typer, api, og utility funktioner. Det er højst sandsynligt at koden vil vokse og derfor er det godt at dele den op, også så det giver mere gennemsigtighed senere hen hvorfor man retter i en fil frem for en anden.

### Navigation

I forhold til forretningsdelen af opgaven og hvordan user storyen var ville jeg gerne vise en navigation som gav mening ift til det der blev beskrevet. I den virkelige verden ville jeg have benyttet mig af Router og ikke hardcoded links ind i html'en men fordi jeg var ved at løbe tør for tid havde jeg ikke mulighed for at ændre dette.

### Dirigent/viewer

Min tanke bag disse to sider var, at jeg ville lave forskellige visninger som i sidste ende kunne vises til to forskellige typer brugere (som beskrevet i opgaven). Jeg ville bruge de komponenter jeg lavede til at sætte siderne op med og genbruge komponenter hvor det var muligt.

### Næste skridt

Åbenlyst er der en del der mangler, men ud over det åbenlyse i de funktioner som er beskrevet i opgaven som ikke er med, ville jeg simplificere min kode yderligere, fjerne hardcodede elementer, erstatte gentagende kode med genbrugelige komponenter.

### Hvad jeg ville have gjort hvis jeg sku gøre det hele igen...

I den perfekte verden ville det selvfølgelig havde været rart ikke at skulle sidde og bruge tid på build fejl, men sådan er det nu engang at være udvikler af og til. Derudover, tror jeg ikke at jeg ville have brugt tid på navigationen og i stedet brugt min tid på at få dirigent siden til at blive lidt mere funktionel.

### Etc.
