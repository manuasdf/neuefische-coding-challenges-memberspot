import { fetchBookLibrary, loadFavorites, h } from "./utilities.js";
/**
 * Render page content
 *
 * @param book - The book to save or remove as favorite
 */
let favorites = [];
let book = {
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
async function loadPageContent() {
    const ISBN = getISBNFromURL();
    const APIEndpointGETBookByISBN = `http://localhost:4730/books/${ISBN}`;
    book = await fetchBookLibrary(APIEndpointGETBookByISBN);
    favorites = loadFavorites();
}
await loadPageContent();
renderPageContent();
/**
 * Render page content
 */
function renderPageContent() {
    document.getElementsByClassName("mainnav-number")[0].innerHTML = `${favorites.length}`;
    // Title    image.src = book.cover
    const title = `${book.title}<br /><small>${book.subtitle}</small>`;
    document.getElementsByTagName("h1")[0].innerHTML = title;
    // Abstract
    document.getElementById("abstract").innerHTML = `${book.abstract}`;
    // Details
    const unorderedList = document.getElementById("details");
    unorderedList?.appendChild(h("li", `<strong>Author:</strong> ${book.author}`));
    unorderedList?.appendChild(h("li", `<strong>Publisher:</strong> ${book.publisher}`));
    unorderedList?.appendChild(h("li", `<strong>Pages:</strong> ${book.numPages}`));
    // Image
    const image = document.getElementsByTagName("img")[0];
    image.src = book.cover;
    image.alt = `Cover of: ${book.title}: ${book.subtitle}`;
}
/**
 * Grab ISBN from URL query
 */
function getISBNFromURL() {
    const URL = new URLSearchParams(window.location.search);
    return URL.get("isbn");
}
//# sourceMappingURL=detail.js.map