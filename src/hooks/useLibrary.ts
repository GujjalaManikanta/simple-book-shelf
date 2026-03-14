import { useState, useMemo, useCallback } from "react";
import { Book, SortField, SortDirection } from "@/lib/types";
import { getAllBooks, addBook, deleteBook, toggleAvailability } from "@/lib/bookDatabase";
import { searchBooks, sortBooks } from "@/lib/searchModule";
import { validateBookInput, ValidationError } from "@/lib/validation";

export function useLibrary() {
  const [books, setBooks] = useState<Book[]>(getAllBooks);
  const [query, setQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("title");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredBooks = useMemo(() => {
    const searched = searchBooks(books, query);
    return sortBooks(searched, sortField, sortDirection);
  }, [books, query, sortField, sortDirection]);

  const handleAddBook = useCallback(
    (title: string, author: string, genre: string): ValidationError[] => {
      const errors = validateBookInput(title, author, genre);
      if (errors.length > 0) return errors;
      addBook({ title: title.trim(), author: author.trim(), genre: genre.trim(), available: true });
      setBooks(getAllBooks());
      return [];
    },
    []
  );

  const handleDeleteBook = useCallback((id: string) => {
    setDeletingId(id);
    setTimeout(() => {
      deleteBook(id);
      setBooks(getAllBooks());
      setDeletingId(null);
    }, 200);
  }, []);

  const handleToggleAvailability = useCallback((id: string) => {
    toggleAvailability(id);
    setBooks(getAllBooks());
  }, []);

  const handleSort = useCallback(
    (field: SortField) => {
      if (field === sortField) {
        setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
      } else {
        setSortField(field);
        setSortDirection("asc");
      }
    },
    [sortField]
  );

  return {
    books: filteredBooks,
    totalBooks: books.length,
    query,
    setQuery,
    sortField,
    sortDirection,
    handleSort,
    handleAddBook,
    handleDeleteBook,
    handleToggleAvailability,
    deletingId,
  };
}
