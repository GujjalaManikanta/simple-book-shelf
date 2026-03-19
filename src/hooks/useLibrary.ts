import { useState, useEffect, useMemo, useCallback } from "react";
import { Book, SortField, SortDirection } from "@/lib/types";
import { getAllBooks, addBook, deleteBook, borrowBook, returnBook, updateCopies } from "@/lib/bookDatabase";
import { searchBooks, sortBooks } from "@/lib/searchModule";
import { validateBookInput, ValidationError } from "@/lib/validation";

export function useLibrary() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("title");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchBooks = useCallback(async () => {
    setIsLoading(true);
    const data = await getAllBooks();
    setBooks(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const filteredBooks = useMemo(() => {
    const searched = searchBooks(books, query);
    return sortBooks(searched, sortField, sortDirection);
  }, [books, query, sortField, sortDirection]);

  const handleAddBook = useCallback(
    async (title: string, author: string, genre: string, copies: number): Promise<ValidationError[]> => {
      const errors = validateBookInput(title, author, genre, copies);
      if (errors.length > 0) return errors;
      
      const newBook = await addBook({ title: title.trim(), author: author.trim(), genre: genre.trim(), borrowed: 0, copies });
      if (newBook) {
        setBooks(prev => [...prev, newBook]);
      }
      return [];
    },
    []
  );

  const handleDeleteBook = useCallback(async (id: string) => {
    setDeletingId(id);
    const success = await deleteBook(id);
    if (success) {
      setBooks(prev => prev.filter(b => b.id !== id));
    }
    setDeletingId(null);
  }, []);

  const handleBorrowBook = useCallback(async (id: string) => {
    const updated = await borrowBook(id);
    if (updated) {
      setBooks(prev => prev.map(b => b.id === id ? updated : b));
    }
  }, []);

  const handleReturnBook = useCallback(async (id: string) => {
    const updated = await returnBook(id);
    if (updated) {
      setBooks(prev => prev.map(b => b.id === id ? updated : b));
    }
  }, []);

  const handleUpdateCopies = useCallback(async (id: string, newCopies: number) => {
    const updated = await updateCopies(id, newCopies);
    if (updated) {
      setBooks(prev => prev.map(b => b.id === id ? updated : b));
    }
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

  const totalCopies = useMemo(() => books.reduce((sum, book) => sum + book.copies, 0), [books]);

  return {
    books: filteredBooks,
    totalBooks: books.length,
    totalCopies,
    isLoading,
    query,
    setQuery,
    sortField,
    sortDirection,
    handleSort,
    handleAddBook,
    handleDeleteBook,
    handleBorrowBook,
    handleReturnBook,
    handleUpdateCopies,
    deletingId,
  };
}
