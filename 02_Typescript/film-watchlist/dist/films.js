export function formatFilm(film) {
    let line = "";
    line += `Title: ${film.title} (${film.year}), `;
    line += `${film.watched ? "" : "not "}watched, `;
    if (film.rating) {
        line += `rating: ${film.rating}. `;
    }
    return line;
}
export function getUnwachted(playlist) {
    let films = [];
    playlist.films.forEach((film) => {
        if (!film.watched) {
            films.push(film);
        }
    });
    return films;
}
//# sourceMappingURL=films.js.map