import fetch from "node-fetch";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = "https://tusitio.com/callback"; // Cambia por tu dominio real

function encodeFormData(data) {
    return Object.entries(data)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join("&");
}

export default async function handler(req, res) {
    if (req.method === "GET") {
        // Paso 1: redirigir a Spotify para autorizar
        const scope = "playlist-modify-private playlist-modify-public";
        const auth_url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(
            scope
        )}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
        res.redirect(auth_url);
    } else if (req.method === "POST") {
        // Paso 3: recibir código y obtener tokens
        const { code } = req.body;
        const body = encodeFormData({
            grant_type: "authorization_code",
            code,
            redirect_uri,
            client_id,
            client_secret,
        });
        const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body,
        });
        const tokenData = await tokenRes.json();
        res.status(200).json(tokenData);
    } else if (req.method === "PUT") {
        // Paso 4: agregar canciones a playlist
        const { access_token, playlist_id, track_uris } = req.body;
        const addRes = await fetch(
            `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ uris: track_uris }),
            }
        );
        const addData = await addRes.json();
        res.status(addRes.status).json(addData);
    } else {
        res.status(405).send("Method Not Allowed");
    }
}
