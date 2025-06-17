export const esDuplicado = (cancion, lista) => {
    return lista.some(
        (c) =>
            c.nombre.toLowerCase() === cancion.nombre.toLowerCase() &&
            c.artista.toLowerCase() === cancion.artista.toLowerCase()
    );
};

export const recomendarCanciones = (seleccionadas) => {
    if (!seleccionadas.length) return [];

    const generos = seleccionadas.map((c) => c.genero);
    const frecuencia = generos.reduce((acc, genero) => {
        acc[genero] = (acc[genero] || 0) + 1;
        return acc;
    }, {});
    const generoFrecuente = Object.entries(frecuencia).sort((a, b) => b[1] - a[1])[0][0];

    const sugerencias = [
        { nombre: "Shape of You", artista: "Ed Sheeran", genero: "album" },
        { nombre: "Levitating", artista: "Dua Lipa", genero: "album" },
        { nombre: "Don't Start Now", artista: "Dua Lipa", genero: "album" },
    ];

    return sugerencias.filter(s => s.genero === generoFrecuente);
};
