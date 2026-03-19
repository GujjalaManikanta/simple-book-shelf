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
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border-2 border-dashed rounded-3xl border-primary/10">
        <p className="text-lg font-serif italic">No records found in this section of the archive.</p>
      </div>
    );
  }

  return (
    <div className="rounded-none border border-primary/10 bg-card paper-grain overflow-hidden shadow-sm animate-archive-in">
      <Table>
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary border-b border-primary/20">
            <SortableHeader label="Collection Title" field="title" activeField={sortField} direction={sortDirection} onSort={onSort} />
            <SortableHeader label="Author" field="author" activeField={sortField} direction={sortDirection} onSort={onSort} />
            <SortableHeader label="Genre" field="genre" activeField={sortField} direction={sortDirection} onSort={onSort} />
            <SortableHeader label="Inventory" field="copies" activeField={sortField} direction={sortDirection} onSort={onSort} />
            <TableHead className="text-center academic-label text-primary-foreground/60 py-4">Status</TableHead>
            <TableHead className="text-right academic-label text-primary-foreground/60 py-4">Contextual Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book, i) => (
            <TableRow
              key={book.id}
              className={`transition-all duration-300 border-primary/5 hover:bg-primary/5 ${deletingId === book.id ? "opacity-30" : ""}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <TableCell className="font-serif font-bold text-lg text-primary py-6">{book.title}</TableCell>
              <TableCell className="text-primary/70 font-medium text-sm">{book.author}</TableCell>
              <TableCell>
                <div className="academic-label border border-primary/10 px-2 py-1 inline-block">
                  {book.genre}
                </div>
              </TableCell>
              <TableCell className="text-center font-bold font-serif group">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-lg">{book.copies}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-all hover:text-accent hover:bg-transparent"
                    onClick={() => {
                      const input = window.prompt(`Update inventory for "${book.title}":`, book.copies.toString());
                      if (input) {
                        const val = parseInt(input, 10);
                        if (!isNaN(val)) onUpdateCopies(book.id, val);
                      }
                    }}
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className={`inline-flex items-center gap-2 academic-label px-3 py-1.5 border ${book.borrowed < book.copies ? "border-green-600/20 text-green-700" : "border-accent/20 text-accent"}`}>
                  <div className={`h-1 w-1 rounded-full ${book.borrowed < book.copies ? "bg-green-600" : "bg-accent"}`} />
                  {book.borrowed < book.copies ? "Available" : "Checked Out"}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 rounded-none border-primary/10 hover:bg-primary hover:text-primary-foreground transition-all academic-label px-4"
                    disabled={book.borrowed >= book.copies}
                    onClick={() => onBorrow(book.id)}
                  >
                    Borrow
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 rounded-none border-primary/10 hover:bg-secondary transition-all academic-label px-4"
                    disabled={book.borrowed <= 0}
                    onClick={() => onReturn(book.id)}
                  >
                    Return
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-primary/30 hover:text-destructive hover:bg-transparent transition-colors"
                    onClick={() => onDelete(book.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookTable;
