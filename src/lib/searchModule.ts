import { Book, SortField, SortDirection } from "./types";

export function searchBooks(books: Book[], query: string): Book[] {
  if (!query.trim()) return books;
  const lower = query.toLowerCase();
  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(lower) ||
      book.author.toLowerCase().includes(lower)
  );
}

export function sortBooks(books: Book[], field: SortField, direction: SortDirection): Book[] {
  return [...books].sort((a, b) => {
    const valA = a[field].toLowerCase();
    const valB = b[field].toLowerCase();
    const cmp = valA.localeCompare(valB);
    return direction === "asc" ? cmp : -cmp;
  });
}
