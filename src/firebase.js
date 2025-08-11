import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCoVzOWOK2hSm3a7YDF5sNXDBd4gP7aJNY",
    authDomain: "finstak-52dd6.firebaseapp.com",
    projectId: "finstak-52dd6",
    storageBucket: "finstak-52dd6.firebasestorage.app",
    messagingSenderId: "356290515922",
    appId: "1:356290515922:web:a5ef3d43125326432aae0b",
    // measurementId: "G-SJCFGJSTXQ" // Dihapus karena kita belum pakai analytics
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);