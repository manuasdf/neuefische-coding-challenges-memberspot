interface Bookmark {
  id: number;
  url: string;
  title: string;
  tag?: string;
}
/*
type BookmarkUpdate = Partial<Omit<Bookmark, "id">>;

type BookmarkCreate = Omit<Bookmark, "url" | "title"> & Required<Pick<Bookmark, "id" | "url" | "title">>;*/

export type {
  Bookmark,
  // BookmarkUpdate,
  // BookmarkCreate
}
