import type {
    Favorite
} from "./types.d.ts";

import {
    ButtonClear
} from "./components.js";

import {
    h,
    fetchBookLibrary,
    uniqueValues,
    intersection,
    loadFavorites,
    removeFavorite
} from "./utilities.js";

let favorites: Favorite[] = [];

/**
 * Initial load of favorites from local strage
 */
function loadPageContent(): void {
    favorites = loadFavorites();
    populateTable(favorites);
}
loadPageContent();

/**
 * Writes/replaces values in the table in the DOM
 * 
 * @param tableData - The data to write in the table
 */
function populateTable(tableData: Favorite[]): void {
    const tableBody = document.getElementsByTagName("tbody")[0] as HTMLTableSectionElement;
    const newTableBody = h("tbody") as HTMLTableSectionElement;
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
 * Render Favorite Remove Button
 * 
 * @param favorite - The favorite to remove
 */
function renderButtonFavorite(favorite: Favorite): HTMLElement {
    let button: HTMLElement = ButtonClear() as HTMLElement;
    button.addEventListener("click", () => { 
        removeFavorite(favorite);
        loadPageContent();  
    });
    return button;
}

/**
 * React to search input
 */
const searchInput = document.getElementById("search") as HTMLInputElement;
searchInput.value = "";
searchInput.addEventListener("change", async (event) => {
    event.preventDefault();
    const APIEndpointGETAllBooks = `http://localhost:4730/books?q=${searchInput.value}`;
    const books: Favorite[] = await fetchBookLibrary(APIEndpointGETAllBooks);
    const storedFavorites: Favorite[] = loadFavorites();
    favorites = intersection(books, storedFavorites);
    populateTable(favorites);
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
const uniquePublisherList = uniqueValues(favorites, "publisher");
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
        populateTable(favorites);
        return;
    }
    const favoritesFiltered: Favorite[] = favorites.filter(
        (favorite) => favorite.publisher === filter
    );
    populateTable(favoritesFiltered);
});