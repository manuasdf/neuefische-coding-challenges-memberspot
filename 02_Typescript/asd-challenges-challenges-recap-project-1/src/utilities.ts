import type {
    ElementAttributes,
    Favorite
} from "./types.d.ts";

function h(element: string = "div", child?: string | HTMLElement, attributes?: ElementAttributes): HTMLElement {
    const newElement = document.createElement(element);
    if (child && typeof child === "string")
        newElement.innerHTML = String(child);
    if (child && typeof child !== "string")
        newElement.appendChild(child);
    if (attributes) {
        attributes.forEach(([key, value]) => {
            newElement.setAttribute(key, value);
        });
    }
    return newElement;
}

async function fetchBookLibrary<T>(url: string): Promise<T> {
    try {
        const response = await fetch(url).catch(error => {
            throw new Error(error.message);
        });
        return await response.json().catch(error => {
            throw new Error(error.message);
        });
    } catch(error) {
        console.error(`Error fetching data: ${error}`);
        throw new Error();
    }
}

function uniqueValues<T, K extends keyof T>(arr: readonly T[], key: K): T[K][] {
  return [...new Set(arr.map(item => item[key]))];
}

function intersection<T extends { id: string }>(a: T[], b: T[]): T[] {
  const bIds = new Set(b.map(x => x.id));
  const result: T[] = [];
  for (const item of a) {
    if (bIds.has(item.id)) result.push(item);
  }
  return result;
}

function saveFavorites(data: Favorite[]): void {
    try {
        localStorage.setItem('favorites', JSON.stringify(data));
    } catch (e) {
        console.error('Local storage not saved:', e);
    }
}

function loadFavorites(): Favorite[] {
    try {
        const getItem = localStorage.getItem('favorites');
        return Array.from(JSON.parse(getItem ? getItem : "[]"));
    } catch (e) {
        console.error('Local storage not loaded:', e);
        return [];
    }
}

function addFavorite(item: Favorite) {
    const favorites = loadFavorites();
    favorites.push(item);
    saveFavorites(favorites);
}

function removeFavorite(item: Favorite) {
    const favorites = loadFavorites();
    const newFavoirtues = favorites.filter((favorite) => favorite.id !== item.id);
    saveFavorites(newFavoirtues);
}

export {
    h,
    fetchBookLibrary,
    uniqueValues,
    intersection,
    saveFavorites,
    loadFavorites,
    addFavorite,
    removeFavorite
}