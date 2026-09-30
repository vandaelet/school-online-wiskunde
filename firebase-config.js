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
  apiKey: "AIzaSyD3AcM74bLpQk8dgxO2MllogCIkr2vBPSY",
  authDomain: "school-online-576be.firebaseapp.com",
  projectId: "school-online-576be",
  storageBucket: "school-online-576be.firebasestorage.app",
  messagingSenderId: "662244717899",
  appId: "1:662244717899:web:fbefd83717cc2270dba4ce"
};

/* Optioneel maar aangeraden: beperk het inloggen tot het
   Google-schooldomein (Google Workspace for Education), zodat
   enkel leerlingen met hun schoolaccount kunnen inloggen.
   Voorbeeld: "campuslievegem.be"
   Laat leeg ("") om eender welk Google-account toe te laten. */
const SCHOOL_DOMAIN = "svsl.be";
