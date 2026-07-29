import type { Book, Favorite } from "./types.d.ts";
import { fetchBookLibrary, loadFavorites, h } from "./utilities.js";

/**
 * Render page content
 * 
 * @param book - The book to save or remove as favorite
 */

let favorites: Favorite[] = [];
let book: Book = {
    id: "",
    title: "",
    isbn: "",
    author: "",
    publisher: "",
    subtitle: "",
    abstract: "",
    price: "",
    numPages: 0,
    cover: ""
};

/**
 * Load page content
 */
async function loadPageContent(): Promise<void> {
    const ISBN = getISBNFromURL();
    const APIEndpointGETBookByISBN: string = `http://localhost:4730/books/${ISBN}`;
    book = await fetchBookLibrary<Book>(APIEndpointGETBookByISBN);
    favorites = loadFavorites();
}
await loadPageContent();
renderPageContent();

/**
 * Render page content
 */
function renderPageContent(): void {
    (document.getElementsByClassName("mainnav-number")[0] as HTMLHeadingElement).innerHTML = `${favorites.length}`;

    // Title    image.src = book.cover

    const title = `${book.title}<br /><small>${book.subtitle}</small>`;
    (document.getElementsByTagName("h1")[0] as HTMLHeadingElement).innerHTML = title;

    // Abstract
    (document.getElementById("abstract") as HTMLHeadingElement).innerHTML = `${book.abstract}`;

    // Details
    const unorderedList = document.getElementById("details") as HTMLUListElement;
    unorderedList?.appendChild(h("li", `<strong>Author:</strong> ${book.author}`));
    unorderedList?.appendChild(h("li", `<strong>Publisher:</strong> ${book.publisher}`));
    unorderedList?.appendChild(h("li", `<strong>Pages:</strong> ${book.numPages}`));

    // Image
    const image = document.getElementsByTagName("img")[0] as HTMLImageElement;
    image.src = book.cover;
    image.alt = `Cover of: ${book.title}: ${book.subtitle}`;
}

/**
 * Grab ISBN from URL query
 */
function getISBNFromURL(): string {
    const URL = new URLSearchParams(window.location.search);
    return URL.get("isbn") as string;
}