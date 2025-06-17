export const obtenerToken = async () => {
    const clientId = "7c83b59356ee491b881679e0573ba76f";
    const clientSecret = "3d30a3aa6c7c48eeb9ff01b2f5f9c99cET";

    const credenciales = btoa(`${clientId}:${clientSecret}`);

    try {
        const respuesta = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${credenciales}`,
            },
            body: "grant_type=client_credentials",
        });

        const data = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(`Error al obtener token: ${data.error_description}`);
        }

        console.log("Token Spotify obtenido:", data.access_token);
        return data.access_token;
    } catch (error) {
        console.error("Error al obtener token:", error);
        return null;
    }
};

export const buscarCanciones = async (token, consulta) => {
    if (!token) {
        console.error("Token inválido o no recibido");
        return [];
    }

    try {
        const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(consulta)}&type=track&limit=10`;
        console.log("Buscando canciones con URL:", url);

        const respuesta = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!respuesta.ok) {
            const errorData = await respuesta.json();
            console.error("Error en respuesta Spotify:", respuesta.status, errorData);
            return [];
        }

        const data = await respuesta.json();
        console.log("Datos recibidos de búsqueda:", data);
        return data.tracks?.items || [];
    } catch (error) {
        console.error("Error en buscarCanciones:", error);
        return [];
    }
};
