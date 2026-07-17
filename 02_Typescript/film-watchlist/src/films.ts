export interface Watchable {
    id: number,
    title: string,
    year: number
}

export interface Film extends Watchable {
    watched: boolean,
    rating?: number
}

export interface Playlist {
    name: string,
    films: Film[]
}

export function formatFilm(film: Film): string {
    let line: string = "";
    line += `Title: ${film.title} (${film.year}), `;
    line += `${film.watched ? "" : "not "}watched, `;
    if (film.rating) {
        line += `rating: ${film.rating}. `;
    }
    return line;
}

export function getUnwachted(playlist: Playlist): Film[] {
    let films: Film[] = [];
    playlist.films.forEach((film) => {
        if (!film.watched) {
            films.push(film);
        }
    });
    return films;
}
