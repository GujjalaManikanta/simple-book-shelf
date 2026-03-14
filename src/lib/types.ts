export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  available: boolean;
}

export type SortField = "title" | "author" | "genre";
export type SortDirection = "asc" | "desc";
