Je hebt eigenlijk twee verschillende “versies” van dezelfde opdracht, maar je zet ze beide op dezelfde main‑branch aan, waardoor de GitHub‑Action elkaar in de weg zit. Een paar manieren om dit op te lossen:
1. Elke oplossing in een eigen repository zetten
Maak een nieuwe repo (bijv. opdracht‑oplossing‑2).
Push de branch die je wilt verhuizen naar die nieuwe repo:
Bash
git checkout oplossing‑2
git remote add nieuw https://github.com/gebruiker/opdracht-oplossing-2.git
git push nieuw oplossing‑2:main
Zet GH‑Pages in de nieuwe repo aan (standaard kijkt hij naar main).
Nu hebben beide oplossingen hun eigen GH‑Pages‑URL en kunnen ze onafhankelijk gebouwd worden.
2. Binnen dezelfde repo twee “deployment‑branches” gebruiken
Laat de bestaande main alleen de “primaire” oplossing bevatten.
Maak een tweede branch (bijv. oplossing‑2) en zet GH‑Pages in de repository‑instellingen op die branch (onder “Source” kies je gh-pages ← oplossing‑2).
Pas de workflow aan zodat hij alleen naar de branch pusht waar de build vandaan komt. Bijvoorbeeld:
YAML
on:
  push:
    branches:
      - main          # bouwt oplossing‑1
      - oplossing‑2   # bouwt oplossing‑2
In de job kun je met ${{ github.ref }} bepalen welke branch actief is en de output naar de juiste map (bijv. build/opl1 of build/opl2) sturen.
3. Subfolders gebruiken op één GH‑Pages‑site
Blijf op main werken, maar laat de workflow twee builds maken: één voor oplossing 1 (output naar build/opl1) en één voor oplossing 2 (output naar build/opl2).
Push beide mappen naar de gh-pages‑branch. De site wordt dan bereikbaar via gebruiker.github.io/repo/build/opl1 en .../build/opl2.
Hiervoor hoef je geen nieuwe repo aan te maken, maar je moet wel de workflow aanpassen om de juiste pad‑structuur te genereren.
Wat praktisch vaak het makkelijkst is:
Als de twee oplossingen echt aparte projecten zijn, zet ze in twee aparte repositories. Dan heb je geen conflicten met de GH‑Pages‑instellingen en kun je elk project gewoon blijven pushen naar main. Als je ze graag samen wilt houden, gebruik dan twee branches met aangepaste workflows (optie 2) of een enkele GH‑Pages‑site met subfolders (optie 3).
Kies wat het beste past bij jouw workflow; alle drie de oplossingen werken zonder dat je handmatig hoeft te mergen of de geschiedenis te herschrijven. Als je een stap‑voor‑stap guide nodig hebt voor een van de opties, laat het me weten!
 (algemene uitleg over branchen en mergen)
 (strategieën voor repo‑structuur)

# AutiWiki SPA

Dit project is een Single Page Application (SPA) gebouwd met Vite en vanilla JavaScript, ontworpen om de inhoud van het "Werkboek rond Autisme" op een interactieve en gebruiksvriendelijke manier weer te geven. Het vervangt de vorige, op PDF gebaseerde, statische website.

## Functies

-   **Dynamische Navigatie:** Een hiërarchische navigatiekolom die automatisch wordt gegenereerd op basis van de structuur in `autiwiki-nl.md`.
-   **Gecentraliseerde Citaten:** Alle citaten worden beheerd in één `quotes.json` bestand om herhaling te voorkomen en onderhoud te vereenvoudigen.
-   **Routing & Breadcrumbs:** De URL wordt bijgewerkt bij het navigeren naar een term, en er worden "breadcrumbs" getoond om de hiërarchische positie van de term aan te duiden.
-   **Modern Ontwerp:** Een schone, leesbare en responsieve lay-out.

## Ontwikkeling

### Vereisten

-   [Node.js](https://nodejs.org/) (versie 18 of hoger)
-   [Python](https://www.python.org/) (versie 3.6 of hoger, voor contentbeheer)

### Installatie

Clone de repository en installeer de Node.js afhankelijkheden:

```bash
npm install
```

### Development Server

Start de lokale development server:

```bash
npm run dev
```

De applicatie is nu beschikbaar op `http://localhost:5173` (of een andere poort als deze bezet is).

### Productie Build

Om een geoptimaliseerde versie voor productie te bouwen, voer je het volgende commando uit:

```bash
npm run build
```

De bestanden worden klaargezet in de `dist/` map.

## Contentbeheer

De volledige inhoud van de website wordt beheerd vanuit één bronbestand: `autiwiki-nl.md`. De website zelf laadt de data uit twee JSON-bestanden:

-   `public/glossary.json`: Bevat de hiërarchische structuur van de woordenlijst.
-   `public/quotes.json`: Bevat alle unieke citaten met een ID.

### Content Aanpassen

Als je de inhoud van de website wilt aanpassen, volg je deze stappen:

1.  Bewerk het `autiwiki-nl.md` bestand.
2.  Voer het `parser.py` script uit om de JSON-bestanden opnieuw te genereren:

    ```bash
    python parser.py
    ```

3.  De `public/glossary.json` en `public/quotes.json` bestanden zijn nu bijgewerkt. Start de development server (`npm run dev`) om je wijzigingen te bekijken.
