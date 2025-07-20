import { collection, addDoc } from "./firebase";
import { db } from "./firebase";

export const guardarCancion = async (cancion) => {
    try {
        await addDoc(collection(db, "cancionesSeleccionadas"), cancion);
    } catch (error) {
        console.error("Error al guardar canción:", error);
    }
};
