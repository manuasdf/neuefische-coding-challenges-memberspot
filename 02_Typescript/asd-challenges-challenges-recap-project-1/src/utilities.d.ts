import type { ElementAttributes, Favorite } from "./types.d.ts";
declare function h(element?: string, child?: string | HTMLElement, attributes?: ElementAttributes): HTMLElement;
declare function fetchBookLibrary<T>(url: string): Promise<T>;
declare function uniqueValues<T, K extends keyof T>(arr: readonly T[], key: K): T[K][];
declare function intersection<T extends {
    id: string;
}>(a: T[], b: T[]): T[];
declare function saveFavorites(data: Favorite[]): void;
declare function loadFavorites(): Favorite[];
declare function addFavorite(item: Favorite): void;
declare function removeFavorite(item: Favorite): void;
export { h, fetchBookLibrary, uniqueValues, intersection, saveFavorites, loadFavorites, addFavorite, removeFavorite };
//# sourceMappingURL=utilities.d.ts.map