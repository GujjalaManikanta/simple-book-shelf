import { ArrowUpDown, Trash2, Edit2 } from "lucide-react";
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
  onBorrow: (id: string) => void;
  onReturn: (id: string) => void;
  onUpdateCopies: (id: string, newCopies: number) => void;
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
  onBorrow,
  onReturn,
  onUpdateCopies,
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
            <SortableHeader label="Copies" field="copies" activeField={sortField} direction={sortDirection} onSort={onSort} />
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
              <TableCell className="text-muted-foreground text-center font-medium group relative">
                <div className="flex items-center justify-center gap-2">
                  <span>{book.copies}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => {
                      const input = window.prompt(`Update total copies for "${book.title}":`, book.copies.toString());
                      if (input !== null) {
                        const val = parseInt(input, 10);
                        if (!isNaN(val)) {
                          if (val < book.borrowed) {
                            alert(`Cannot reduce total copies below checked out copies (${book.borrowed}).`);
                          } else if (val < 1) {
                            alert("Must have at least 1 copy.");
                          } else {
                            onUpdateCopies(book.id, val);
                          }
                        }
                      }
                    }}
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Badge
                  className="select-none transition-colors duration-150"
                  variant={book.borrowed < book.copies ? "default" : "destructive"}
                  style={book.borrowed < book.copies ? { backgroundColor: "hsl(var(--success))", color: "hsl(var(--success-foreground))" } : undefined}
                >
                  {book.borrowed < book.copies ? `Available (${book.copies - book.borrowed}/${book.copies})` : "Checked Out"}
                </Badge>
              </TableCell>
              <TableCell className="text-right flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={book.borrowed >= book.copies}
                  onClick={() => onBorrow(book.id)}
                >
                  Borrow
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={book.borrowed <= 0}
                  onClick={() => onReturn(book.id)}
                >
                  Return
                </Button>
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
