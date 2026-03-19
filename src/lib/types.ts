export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  copies: number;
  borrowed: number;
}

export type SortField = "title" | "author" | "genre" | "copies";
export type SortDirection = "asc" | "desc";
