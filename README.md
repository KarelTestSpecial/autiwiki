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
