import { Book } from "./types";

const STORAGE_KEY = "library_books";

const defaultBooks: Book[] = [
  { id: "1", title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", available: true },
  { id: "2", title: "1984", author: "George Orwell", genre: "Dystopian", available: false },
  { id: "3", title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", available: true },
  { id: "4", title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", available: true },
  { id: "5", title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Fiction", available: false },
];

function loadBooks(): Book[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // fall through to defaults
  }
  saveBooks(defaultBooks);
  return defaultBooks;
}

function saveBooks(books: Book[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

export function getAllBooks(): Book[] {
  return loadBooks();
}

export function addBook(book: Omit<Book, "id">): Book {
  const books = loadBooks();
  const newBook: Book = { ...book, id: crypto.randomUUID() };
  books.push(newBook);
  saveBooks(books);
  return newBook;
}

export function deleteBook(id: string): boolean {
  const books = loadBooks();
  const filtered = books.filter((b) => b.id !== id);
  if (filtered.length === books.length) return false;
  saveBooks(filtered);
  return true;
}

export function toggleAvailability(id: string): Book | null {
  const books = loadBooks();
  const book = books.find((b) => b.id === id);
  if (!book) return null;
  book.available = !book.available;
  saveBooks(books);
  return book;
}
