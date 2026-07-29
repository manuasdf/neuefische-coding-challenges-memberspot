import { ButtonClear } from "./components.js";
import { h, fetchBookLibrary, uniqueValues, intersection, loadFavorites, removeFavorite } from "./utilities.js";
let favorites = [];
/**
 * Initial load of favorites from local strage
 */
function loadPageContent() {
    favorites = loadFavorites();
    populateTable(favorites);
}
loadPageContent();
/**
 * Writes/replaces values in the table in the DOM
 *
 * @param tableData - The data to write in the table
 */
function populateTable(tableData) {
    const tableBody = document.getElementsByTagName("tbody")[0];
    const newTableBody = h("tbody");
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
    });
    tableBody.parentNode?.replaceChild(newTableBody, tableBody);
    document.getElementsByTagName("h2")[0].innerHTML = `${tableData.length} Books displayed`;
    document.getElementsByClassName("mainnav-number")[0].innerHTML = `${favorites.length}`;
}
/**
 * Render Favorite Remove Button
 *
 * @param favorite - The favorite to remove
 */
function renderButtonFavorite(favorite) {
    let button = ButtonClear();
    button.addEventListener("click", () => {
        removeFavorite(favorite);
        loadPageContent();
    });
    return button;
}
/**
 * React to search input
 */
const searchInput = document.getElementById("search");
searchInput.value = "";
searchInput.addEventListener("change", async (event) => {
    event.preventDefault();
    const APIEndpointGETAllBooks = `http://localhost:4730/books?q=${searchInput.value}`;
    const books = await fetchBookLibrary(APIEndpointGETAllBooks);
    const storedFavorites = loadFavorites();
    favorites = intersection(books, storedFavorites);
    populateTable(favorites);
});
/**
 * Populate filter select form
 */
const publisherSelect = document.getElementById("by-publisher");
while (publisherSelect.lastChild) {
    publisherSelect.removeChild(publisherSelect.lastChild);
}
publisherSelect.appendChild(h("option", "---", [
    ["value", ""]
]));
const uniquePublisherList = uniqueValues(favorites, "publisher");
uniquePublisherList.forEach((publisher) => {
    publisherSelect.appendChild(h("option", publisher, [
        ["value", publisher]
    ]));
});
/**
 * React to filter select
 */
publisherSelect.addEventListener("change", (event) => {
    const filter = event.target.value;
    if (filter === "") {
        populateTable(favorites);
        return;
    }
    const favoritesFiltered = favorites.filter((favorite) => favorite.publisher === filter);
    populateTable(favoritesFiltered);
});
//# sourceMappingURL=favorite.js.map