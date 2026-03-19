import { useState } from "react";
import { useLibrary } from "@/hooks/useLibrary";
import LibraryHeader from "@/components/LibraryHeader";
import SearchBar from "@/components/SearchBar";
import AddBookForm from "@/components/AddBookForm";
import BookTable from "@/components/BookTable";
import BookCard from "@/components/BookCard";

const Index = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const {
    books,
    totalBooks,
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
  } = useLibrary();

  return (
    <div className="min-h-screen bg-background pb-20">
      <LibraryHeader 
        totalBooks={totalBooks} 
        totalCopies={totalCopies} 
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <main className="container mx-auto px-6 py-6 space-y-6">
        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <SearchBar query={query} onQueryChange={setQuery} />
          <AddBookForm onAddBook={handleAddBook} />
        </div>

        {/* Content Area */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-20 space-y-4">
            <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground font-medium animate-pulse">Consulting the archives...</p>
          </div>
        ) : (
          <div className="transition-all duration-500 transform">
            {viewMode === "grid" ? (
              <div className="book-grid">
                {books.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    deletingId={deletingId}
                    onDelete={handleDeleteBook}
                    onBorrow={handleBorrowBook}
                    onReturn={handleReturnBook}
                    onUpdateCopies={handleUpdateCopies}
                  />
                ))}
                {books.length === 0 && (
                  <div className="col-span-full py-20 text-center border-2 border-dashed rounded-3xl border-primary/10">
                    <p className="text-lg font-serif italic text-muted-foreground">No records found in this section of the archive.</p>
                  </div>
                )}
              </div>
            ) : (
              <BookTable
                books={books}
                sortField={sortField}
                sortDirection={sortDirection}
                deletingId={deletingId}
                onSort={handleSort}
                onDelete={handleDeleteBook}
                onBorrow={handleBorrowBook}
                onReturn={handleReturnBook}
                onUpdateCopies={handleUpdateCopies}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
