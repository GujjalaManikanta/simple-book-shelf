import { ArrowUpDown, Trash2 } from "lucide-react";
import { Book, SortField, SortDirection } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BookTableProps {
  books: Book[];
  sortField: SortField;
  sortDirection: SortDirection;
  deletingId: string | null;
  onSort: (field: SortField) => void;
  onDelete: (id: string) => void;
  onToggleAvailability: (id: string) => void;
}

const SortableHeader = ({
  label,
  field,
  activeField,
  direction,
  onSort,
}: {
  label: string;
  field: SortField;
  activeField: SortField;
  direction: SortDirection;
  onSort: (f: SortField) => void;
}) => (
  <TableHead
    className="cursor-pointer select-none hover:bg-muted/50 transition-colors duration-150"
    onClick={() => onSort(field)}
  >
    <span className="inline-flex items-center gap-1">
      {label}
      <ArrowUpDown className={`h-3.5 w-3.5 ${activeField === field ? "text-primary" : "text-muted-foreground/50"}`} />
      {activeField === field && (
        <span className="text-xs text-primary">{direction === "asc" ? "↑" : "↓"}</span>
      )}
    </span>
  </TableHead>
);

const BookTable = ({
  books,
  sortField,
  sortDirection,
  deletingId,
  onSort,
  onDelete,
  onToggleAvailability,
}: BookTableProps) => {
  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <p className="text-lg font-medium">No books found</p>
        <p className="text-sm">Try a different search or add a new book.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30 hover:bg-muted/30">
            <SortableHeader label="Title" field="title" activeField={sortField} direction={sortDirection} onSort={onSort} />
            <SortableHeader label="Author" field="author" activeField={sortField} direction={sortDirection} onSort={onSort} />
            <SortableHeader label="Genre" field="genre" activeField={sortField} direction={sortDirection} onSort={onSort} />
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow
              key={book.id}
              className={`transition-all duration-150 ${deletingId === book.id ? "animate-fade-out" : ""}`}
            >
              <TableCell className="font-serif font-semibold">{book.title}</TableCell>
              <TableCell className="text-muted-foreground">{book.author}</TableCell>
              <TableCell className="text-muted-foreground">{book.genre}</TableCell>
              <TableCell className="text-center">
                <Badge
                  className="cursor-pointer select-none transition-colors duration-150"
                  variant={book.available ? "default" : "destructive"}
                  style={book.available ? { backgroundColor: "hsl(var(--success))", color: "hsl(var(--success-foreground))" } : undefined}
                  onClick={() => onToggleAvailability(book.id)}
                >
                  {book.available ? "Available" : "Checked Out"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => onDelete(book.id)}
                >
                  <Trash2 className="mr-1 h-3.5 w-3.5" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookTable;
