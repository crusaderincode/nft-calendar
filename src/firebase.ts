import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyC957338dIhgjYiZGc8it7HhpWnRFpk_Cs",
    authDomain: "nft-calendar-1e0a1.firebaseapp.com",
    projectId: "nft-calendar-1e0a1",
    storageBucket: "nft-calendar-1e0a1.appspot.com",
    messagingSenderId: "645788711685",
    appId: "1:645788711685:web:34260e6f6899ad579e556c",
    measurementId: "G-MDKTDMQ30Y"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const analytics = getAnalytics(app);

export default db