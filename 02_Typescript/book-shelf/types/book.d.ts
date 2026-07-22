export type EntityId = number | string;

export type Timestamped = {
    createdAt: Date,
    updatedAt: Date
}

export type HasId = {
    id: EntityId
}

export type Book = HasId & Timestamped & {
    title: string,
    author: string,
    isbn: string,
    isAvailable: boolean
} 

export type IsbnParts = [number, string, string];

export type BookCreatePayload = Omit<Book, "id" | "createdAt" | "updatedAt">;

export type BookUpdatePayload = Partial<BookCreatePayload>;

export type BookPreview = Pick<Book, "id" | "author" | "title">;

export interface ApiResponse<T> {
    status: number, 
    message: string,
    data: T
};

export const books: Book[] = [
  {
    id: 1,
    createdAt: new Date("2023-01-10T10:00:00.000Z"),
    updatedAt: new Date("2024-03-05T15:30:00.000Z"),
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "9780132350884",
    isAvailable: true,
  },
  {
    id: "b-2",
    createdAt: new Date("2022-09-20T08:15:00.000Z"),
    updatedAt: new Date("2024-05-01T12:00:00.000Z"),
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    isbn: "9780201616224",
    isAvailable: false,
  },
  {
    id: 3,
    createdAt: new Date("2021-06-30T21:45:00.000Z"),
    updatedAt: new Date("2024-06-18T09:10:00.000Z"),
    title: "Refactoring",
    author: "Martin Fowler",
    isbn: "9780201485677",
    isAvailable: true,
  },
  {
    id: "b-4",
    createdAt: new Date("2020-11-12T13:25:00.000Z"),
    updatedAt: new Date("2024-01-22T18:40:00.000Z"),
    title: "Design Patterns",
    author: "Erich Gamma",
    isbn: "9780201633610",
    isAvailable: true,
  },
  {
    id: 5,
    createdAt: new Date("2024-02-01T00:00:00.000Z"),
    updatedAt: new Date("2024-06-30T23:59:00.000Z"),
    title: "Working Effectively with Legacy Code",
    author: "Michael Feathers",
    isbn: "9780131177055",
    isAvailable: false,
  },
];
