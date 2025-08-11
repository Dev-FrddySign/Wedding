import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

// Guardar selección (máximo una vez por invitado)
export const guardarSeleccion = async (codigo, canciones) => {
  const docRef = doc(db, "cancionesSeleccionadas", codigo);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    throw new Error("Este invitado ya envió su selección");
  }

  await setDoc(docRef, {
    canciones,
    fecha: new Date().toISOString(),
  });
};
