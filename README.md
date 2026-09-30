# Nando Oefentaak — Module 1: Inzicht in getallen

Een interactieve oefentaak (30–40 min) voor leerlingen van het eerste jaar, ter
voorbereiding van de grote herhalingstoets over Module 1 (talstelsels, soorten
getallen, hoofdbewerkingen, veelvouden en delers, verzamelingen en implicatie,
breuken).

**Wat krijg je hier?**
- `index.html` — de oefentaak zelf (wat leerlingen zien)
- `leerkracht.html` — een overzicht van wie de taak al maakte, en met welk resultaat
- `app.js` — alle vragen en de automatische verbetering
- `style.css` — de opmaak
- `firebase-config.js` — hier vul je jouw eigen (gratis) Firebase-gegevens in
- `firestore.rules` — de beveiligingsregels (wie mag wat lezen/schrijven)

**Hoe werkt het?**
Leerlingen loggen in met hun Google-account, kiezen hun klasgroep (NG1, NG2a–e
of NG3), maken de oefeningen (invuloefeningen, aanvinkoefeningen, waar/niet
waar, een sleep-achtige priemfactorisatie-ladder, ...) en krijgen na het
indienen **onmiddellijk hun score en de volledige correctiesleutel** te zien.
Hun resultaat wordt ook opgeslagen, zodat jij op `leerkracht.html` kan zien wie
de taak al maakte en hoe ze scoorden.

Dit alles is **volledig gratis**: de site draait op **GitHub Pages** (gratis
hosting) en gebruikt **Firebase** (gratis "Spark"-abonnement, geen kredietkaart
nodig) voor het Google-inloggen en het opslaan van resultaten. Het gratis
quotum van Firebase (50.000 leesacties en 20.000 schrijfacties per dag) is voor
een school ruim voldoende.

---

## Stap 1 — Firebase-project aanmaken (10 min)

1. Ga naar <https://console.firebase.google.com> en meld je aan met een
   Google-account.
2. Klik op **"Project toevoegen"**, geef het een naam (bv. `nando-oefentaak`).
   Google Analytics mag je uitschakelen — dat heb je niet nodig.
3. Ga in het menu links naar **Build > Authentication** > tabblad
   **"Sign-in method"** > klik op **Google** > schakel het in > **Opslaan**.
4. Ga naar **Build > Firestore Database** > **"Database maken"** > kies een
   locatie in Europa (bv. `eur3 (Europe)`) > start in **Production mode**.
5. Klik in Firestore op het tabblad **"Regels"**. Vervang de tekst volledig
   door de inhoud van het bestand `firestore.rules` uit deze map, **maar pas
   eerst de e-mailadressen van de leerkracht(en) aan** (vervang
   `vul.leerkracht1@voorbeeld.be` door je eigen adres, voeg gerust meerdere
   collega's toe). Klik daarna op **"Publiceren"**.
6. Ga naar **Projectinstellingen** (tandwiel-icoon linksboven) > scroll naar
   **"Jouw apps"** > klik het **`</>`**-icoon (web-app) > geef een naam (bv.
   `oefentaak-web`) > **"App registreren"** (Firebase Hosting hoef je niet aan
   te vinken, want we gebruiken GitHub Pages). Er verschijnt een stukje code
   met een object `firebaseConfig = { apiKey: ..., ... }`.
7. Kopieer dat object en plak het in `firebase-config.js` (in deze map), in
   de plaats van de `"VUL_HIER_IN"`-waarden.
8. **(optioneel, maar aangeraden)** Als jouw school met Google Workspace for
   Education werkt, vul dan in `firebase-config.js` de variabele
   `SCHOOL_DOMAIN` in (bv. `"campuslievegem.be"`), zodat enkel leerlingen met
   hun schoolaccount kunnen inloggen. Laat dit veld leeg als je dat niet wil
   beperken.

## Stap 2 — Op GitHub Pages zetten (5 min)

1. Maak (indien nog niet gedaan) een gratis account aan op
   <https://github.com>.
2. Klik rechtsboven op **"+"** > **"New repository"**. Geef een naam (bv.
   `nando-oefentaak`), zet de repository op **Public**, klik **"Create
   repository"**.
3. Klik op **"Add file" > "Upload files"** en sleep alle bestanden uit deze
   map (inclusief het ingevulde `firebase-config.js`) naar het venster. Klik
   **"Commit changes"**.
4. Ga naar het tabblad **"Settings"** van de repository > links naar
   **"Pages"**. Kies bij **"Source"** de branch **`main`** en map **`/
   (root)`**, klik **"Save"**.
5. Wacht 1 à 2 minuten. Je oefentaak staat dan online op:
   `https://<jouw-gebruikersnaam>.github.io/nando-oefentaak/`
6. Het leerkrachtenoverzicht vind je op:
   `https://<jouw-gebruikersnaam>.github.io/nando-oefentaak/leerkracht.html`

Wil je later iets aanpassen (een vraag wijzigen, een klasgroep toevoegen)? Pas
het bestand aan op GitHub (potlood-icoon bij het bestand) en de site werkt
zich vanzelf bij.

## Stap 3 — Delen met je leerlingen

Deel gewoon de link naar `index.html` (bv. via Smartschool, e-mail of een
QR-code). Leerlingen hoeven niets te installeren — enkel een Google-account en
een internetverbinding.

Onderaan de oefentaak staat ook een link **"Leerkracht? Bekijk hier de
resultaten van je leerlingen →"** die rechtstreeks naar `leerkracht.html`
doorklikt. Leerlingen die daarop klikken, zien enkel een melding dat ze geen
toegang hebben (dat wordt afgedwongen door `firestore.rules`), dus dit is
veilig om zichtbaar te laten staan.

---

## Veelgestelde vragen

**Kost dit iets?**
Nee. Zowel GitHub Pages als het Firebase Spark-abonnement zijn gratis, zonder
kredietkaart, en de limieten liggen ver boven wat één of meerdere klassen
gebruiken.

**Kunnen leerlingen de taak meerdere keren maken?**
Ja, dat mag bewust — het is een oefentaak, geen toets. Elke nieuwe indiening
overschrijft hun vorige resultaat in het leerkrachtenoverzicht, maar het
aantal pogingen wordt wel bijgehouden (kolom "Pogingen").

**Wat als een leerling geen Google-account heeft?**
Elk *@gmail.com*-account werkt, en de meeste scholen met Google Workspace for
Education geven elke leerling automatisch een schoolaccount.

**Is dit veilig / GDPR-conform?**
Er worden enkel naam, e-mailadres, klasgroep en score opgeslagen — geen
gevoelige gegevens. Informeer je leerlingen/ouders wel volgens het
privacybeleid van je school, en overweeg om `SCHOOL_DOMAIN` in te stellen
zodat enkel schoolaccounts toegang hebben.

**Ik wil enkel leerlingen met een schoolaccount (bv. @svsl.be) laten inloggen.**
Dat gebeurt op twee plaatsen, allebei al ingesteld in dit project:
1. `firebase-config.js` → `SCHOOL_DOMAIN = "svsl.be"`. Dit laat Google enkel
   schoolaccounts tonen in het inlogvenster, en de site logt iemand automatisch
   weer uit als die toch met een ander account inlogt. Dit is vooral
   gebruiksvriendelijk, geen echte beveiliging (een leerling zou dit met wat
   kennis kunnen omzeilen).
2. `firestore.rules` → de regel `allow write` controleert of
   `request.auth.token.email` eindigt op `@svsl.be`. **Dit is de echte,
   onomzeilbare beveiliging**, want ze wordt afgedwongen door Firebase zelf,
   niet door de website. Vergeet niet deze aangepaste inhoud ook te plakken
   in Firebase Console > Firestore Database > Regels > Publiceren.

Wil je dit nog steviger maken? Als jouw school met **Google Workspace for
Education** werkt én je het Firebase-project aanmaakte met je @svsl.be-account,
kan je in de Google Cloud Console (niet Firebase Console) naar **APIs &
Services > OAuth consent screen** gaan en het **"User type"** op **"Internal"**
zetten. Dan weigert Google zelf al elk account buiten @svsl.be, nog vóór de
leerling de site ziet. Deze optie is enkel beschikbaar als je project onder de
Workspace-organisatie van de school valt.

**Ik wil de vragen aanpassen of uitbreiden.**
Alle vragen staan in `app.js`, telkens in een duidelijk apart blok (`Q1`,
`Q2`, ...). Kopieer een bestaand blok als sjabloon voor een nieuwe vraag.

**Het leerkrachtenoverzicht toont "geen toegang".**
Controleer of je e-mailadres correct in `firestore.rules` staat (in de
Firebase Console, niet enkel in dit lokale bestand!) en of je met datzelfde
adres bent ingelogd op `leerkracht.html`.
