import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDnE6quWlq6_17PhQ1v2zot0j4WIasJdmk",
    authDomain: "mcga-final-b318a.firebaseapp.com",
    projectId: "mcga-final-b318a",
    storageBucket: "mcga-final-b318a.appspot.com",
    messagingSenderId: "509135040297",
    appId: "1:509135040297:web:fac449a47ec48936981138",
    measurementId: "G-PXRBRRW6ZE"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;