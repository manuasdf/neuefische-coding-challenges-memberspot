interface Book {
  id: string,
  title: string,
  isbn: string,
  author: string,
  publisher: string,
  subtitle: string,
  abstract: string,
  price: string,
  numPages: number,
  cover: string,
};

interface Favorite extends Book {};

type Filter = Pick<Book, "publisher">;

type SafeWebAttributes =
  | "value"
  | "href"
  | "class";

type ElementAttributes = Array<[SafeWebAttributes, string]>;

export {
    Book,
    Favorite,
    Filter,
    SafeWebAttributes,
    ElementAttributes
}