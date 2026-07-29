import type {
    Book,
    Favorite
} from "./types.d.ts";

import {
    ButtonFavoritesActive,
    ButtonFavoritesInactive
} from "./components.js";

import {
    h,
    fetchBookLibrary,
    uniqueValues,
    loadFavorites,
    addFavorite,
    removeFavorite
} from "./utilities.js";

let books: Book[] = [];
let favorites: Favorite[] = [];

/**
 * Initial load of book data
 */
async function loadPageContent(): Promise<void> {
    const APIEndpointGETAllBooks = "http://localhost:4730/books";
    books = await fetchBookLibrary<Book[]>(APIEndpointGETAllBooks);
    populateTable(books);
}
await loadPageContent();

/**
 * Writes/replaces values in the table in the DOM
 * 
 * @param tableData - The data to write in the table
 */
function populateTable(tableData: Book[]): void {
    const tableBody = document.getElementsByTagName("tbody")[0] as HTMLTableSectionElement;
    const newTableBody = h("tbody") as HTMLTableSectionElement;
    favorites = loadFavorites();
    tableData.forEach((row) => {
        const tableRow = h("tr");
        tableRow.appendChild(h("td", renderButtonFavorite(row)));
        tableRow.appendChild(h("td", row.title));
        tableRow.appendChild(h("td", row.isbn));
        tableRow.appendChild(h("td", row.author));
        tableRow.appendChild(h("td", row.publisher));
        tableRow.appendChild(h("td", h("a", "Detail", [
            ["href", `detail.html?isbn=${row.isbn}`],
            ["class", "button"]
        ])));
        newTableBody.appendChild(tableRow);
    })
    tableBody.parentNode?.replaceChild(newTableBody, tableBody);
    (document.getElementsByTagName("h2")[0] as HTMLHeadingElement).innerHTML = `${tableData.length} Books displayed`;
    (document.getElementsByClassName("mainnav-number")[0] as HTMLHeadingElement).innerHTML = `${favorites.length}`;
}

/**
 * Render Favorite Button conditionally
 * 
 * @param book - The book to save or remove as favorite
 */
function renderButtonFavorite(book: Book): HTMLElement {
    const bookWId: Favorite = {...book, ...{ id: book.isbn }};
    if (Array.from(favorites).some((favorite) => favorite.id === book.isbn)) {
        let button: HTMLElement = ButtonFavoritesActive() as HTMLElement;
        button.addEventListener("click", () => { 
            removeFavorite(bookWId);
            populateTable(books);
        });
        return button;
    } else {
        let button: HTMLElement = ButtonFavoritesInactive() as HTMLElement;
        button.addEventListener("click", () => { 
            addFavorite(bookWId);
            populateTable(books);
        });
        return button;
    }
}

/**
 * React to search input
 */
const searchInput = document.getElementById("search") as HTMLInputElement;
searchInput.value = "";
searchInput.addEventListener("change", async (event) => {
    event.preventDefault();
    const APIEndpointGETAllBooks = `http://localhost:4730/books?q=${searchInput.value}`;
    books = await fetchBookLibrary(APIEndpointGETAllBooks);
    populateTable(books);
});

/**
 * Populate filter select form
 */
const publisherSelect = document.getElementById("by-publisher") as HTMLSelectElement;
while (publisherSelect.lastChild) {
    publisherSelect.removeChild(publisherSelect.lastChild);
  }
publisherSelect.appendChild(h("option", "---", [
    ["value", ""]
]));
const uniquePublisherList = uniqueValues(books, "publisher");
console.log(uniquePublisherList);
uniquePublisherList.forEach((publisher: string) => {
    publisherSelect.appendChild(h("option", publisher, [
        ["value", publisher]
    ]))
});

/**
 * React to filter select
 */
publisherSelect.addEventListener("change", (event) => {
    const filter = (event.target as HTMLInputElement).value;
    if (filter === "") {
        populateTable(books);
        return;
    }
    const booksFiltered: Book[] = books.filter(
        (book) => book.publisher === filter
    );
    populateTable(booksFiltered);
});