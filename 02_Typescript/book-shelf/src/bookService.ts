import type {
    EntityId,
    Timestamped,
    HasId,
    Book,
    IsbnParts,
    BookCreatePayload,
    BookUpdatePayload,
    BookPreview,
    ApiResponse
} from '../types/book.d.ts';

import { books } from '../types/book.d.ts';


async function fetchBooks(): Promise<ApiResponse<BookPreview[]>> {
    return {
        status: 0, 
        message: "test",
        data: [{
            id: "",
            author: "",
            title: ""
        }]
    };
}
async function fetchBook(id: EntityId): Promise<ApiResponse<Book>> {
    return {
        status: 0, 
        message: "test",
        data: {
            createdAt: new Date(),
            updatedAt: new Date(),
            id: "",
            title: "",
            author: "",
            isbn: "",
            isAvailable: false
        }
    };
}
async function createBook(payload: BookCreatePayload): Promise<ApiResponse<Book>> {
    return {
        status: 0, 
        message: "test",
        data: {
            createdAt: new Date(),
            updatedAt: new Date(),
            id: "",
            title: "",
            author: "",
            isbn: "",
            isAvailable: false
        }
    };
}
async function updateBook(id: EntityId, changes: BookUpdatePayload): Promise<ApiResponse<Book>> {
    return {
        status: 0, 
        message: "test",
        data: {
            createdAt: new Date(),
            updatedAt: new Date(),
            id: "",
            title: "",
            author: "",
            isbn: "",
            isAvailable: false
        }
    };
}
function parseIsbn(isbn: string): IsbnParts {
    return [0, "", ""];
}


function groupBy<T, K extends keyof T>(items: T[], key: K): Record<string, T[]> {
    let collection: Record<string, T[]> = {};
    items.forEach((item) => {
        const groupNameString = String(item[key]);
        (collection[groupNameString] ??= []).push(item);
    })
    return collection;
}

console.log("groupBy: ", groupBy(books, "author"));

function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
    let collection: T[K][] = [];
    items.forEach((item) => {
        collection.push(item[key]);
    })
    return collection;
}

console.log("pluck: ", pluck(books, "title"));

function merge<T>(base: T, updates: Partial<T>): T {
    return {...base, ...updates} as T;
}

console.log("merge: ", merge(books[0], {updatedAt: new Date()}));

