


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // ✅ Importa Firestore


const firebaseConfig = {
    apiKey: "AIzaSyBJ-QWcL4-RJKW2tEJ-Rh6G25Xn0zsdWpE",
    authDomain: "musicwedding-99827.firebaseapp.com",
    projectId: "musicwedding-99827",
    storageBucket: "musicwedding-99827.firebasestorage.app",
    messagingSenderId: "633760950425",
    appId: "1:633760950425:web:5d2e5d1b84af856e34f008",
    measurementId: "G-3ZF7CPVCWM"
};

// Inicialización de la app
const app = initializeApp(firebaseConfig);

// Inicializa Analytics (opcional)
const analytics = getAnalytics(app);

// ✅ Inicializa Firestore y expórtalo
export const db = getFirestore(app);
