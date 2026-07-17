import type {
    Watchable,
    Film,
    Playlist
} from './films.js';

import {
    formatFilm,
    getUnwachted
} from './films.js'

const films: Film[] = [
    { id: 1, title: "Inception", year: 2010, watched: true, rating: 4 },
{ id: 2, title: "Spirited Away", year: 2001, watched: true, rating: 3 },
{ id: 3, title: "Arrival", year: 2016, watched: false },
{ id: 4, title: "The Dark Knight", year: 2008, watched: true, rating: 4 },
{ id: 5, title: "Her", year: 2013, watched: false, rating: 5 },
];

const playlist: Playlist = {
    name: "Watch Next",
    films: films,
};

console.log(getUnwachted(playlist));
