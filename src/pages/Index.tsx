import { useLibrary } from "@/hooks/useLibrary";
import LibraryHeader from "@/components/LibraryHeader";
import SearchBar from "@/components/SearchBar";
import AddBookForm from "@/components/AddBookForm";
import BookTable from "@/components/BookTable";

const Index = () => {
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
    <div className="min-h-screen bg-background">
      <LibraryHeader totalBooks={totalBooks} totalCopies={totalCopies} />

      <main className="container mx-auto px-6 py-6 space-y-6">
        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <SearchBar query={query} onQueryChange={setQuery} />
          <AddBookForm onAddBook={handleAddBook} />
        </div>

        {/* Book Table */}
        {isLoading ? (
          <div className="flex justify-center p-12 text-muted-foreground animate-pulse">Loading your library from the cloud...</div>
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
      </main>
    </div>
  );
};

export default Index;
