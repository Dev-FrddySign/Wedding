import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { db } from './firebase';



const firebaseConfig = {
    apiKey: "AIzaSyBJ-QWcL4-RJKW2tEJ-Rh6G25Xn0zsdWpE",
    authDomain: "musicwedding-99827.firebaseapp.com",
    projectId: "musicwedding-99827",
    storageBucket: "musicwedding-99827.appspot.com",
    messagingSenderId: "633760950425",
    appId: "1:633760950425:web:5d2e5d1b84af856e34f008",
};

const app = initializeApp(firebaseConfig);


export const guardarCancion = async (cancion) => {
    try {
        await addDoc(collection(db, "cancionesSeleccionadas"), cancion);
    } catch (error) {
        console.error("Error al guardar canción:", error);
    }
};

export const obtenerCanciones = async () => {
    const snapshot = await getDocs(collection(db, "cancionesSeleccionadas"));
    return snapshot.docs.map((doc) => doc.data());
};

export { db };