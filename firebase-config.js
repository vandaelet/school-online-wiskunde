/* ============================================================
   FIREBASE-CONFIGURATIE
   ------------------------------------------------------------
   Vul dit bestand in met de gegevens van jouw eigen (gratis)
   Firebase-project. Je vindt deze gegevens in:
   Firebase Console > Projectinstellingen (tandwiel) > "Jouw apps"
   > web-app > SDK-instellingen en -configuratie.

   Volg de stappen in README.md om dit project aan te maken.
   ============================================================ */

const firebaseConfig = {
  apiKey: "VUL_HIER_IN",
  authDomain: "VUL_HIER_IN.firebaseapp.com",
  projectId: "VUL_HIER_IN",
  storageBucket: "VUL_HIER_IN.appspot.com",
  messagingSenderId: "VUL_HIER_IN",
  appId: "VUL_HIER_IN"
};

/* Optioneel maar aangeraden: beperk het inloggen tot het
   Google-schooldomein (Google Workspace for Education), zodat
   enkel leerlingen met hun schoolaccount kunnen inloggen.
   Voorbeeld: "campuslievegem.be"
   Laat leeg ("") om eender welk Google-account toe te laten. */
const SCHOOL_DOMAIN = "svsl.be";
