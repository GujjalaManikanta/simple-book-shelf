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
    <div className="rounded border border-accent/20 bg-card paper-texture overflow-hidden shadow-2xl animate-in">
      <Table>
        <TableHeader>
          <TableRow className="wood-panel hover:bg-primary border-b border-accent/20">
            <SortableHeader label="Title" field="title" activeField={sortField} direction={sortDirection} onSort={onSort} />
            <SortableHeader label="Author" field="author" activeField={sortField} direction={sortDirection} onSort={onSort} />
            <SortableHeader label="Genre" field="genre" activeField={sortField} direction={sortDirection} onSort={onSort} />
            <SortableHeader label="Copies" field="copies" activeField={sortField} direction={sortDirection} onSort={onSort} />
            <TableHead className="text-center font-bold uppercase tracking-widest text-[9px] text-primary-foreground/60">Status</TableHead>
            <TableHead className="text-right font-bold uppercase tracking-widest text-[9px] text-primary-foreground/60">Operations</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow
              key={book.id}
              className={`transition-all duration-300 border-primary/5 hover:bg-accent/5 ${deletingId === book.id ? "opacity-50 grayscale" : ""}`}
            >
              <TableCell className="font-serif font-bold text-lg italic text-primary">{book.title}</TableCell>
              <TableCell className="text-primary/70 font-medium">{book.author}</TableCell>
              <TableCell>
                <div className="px-2 py-0.5 rounded border border-primary/10 bg-primary/5 inline-block text-[10px] uppercase font-bold tracking-tighter text-primary/60">
                  {book.genre}
                </div>
              </TableCell>
              <TableCell className="text-center font-bold font-serif group">
                <div className="flex items-center justify-center gap-2">
                  <span className="bg-primary/5 px-3 py-1 rounded border border-primary/10">{book.copies}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-all hover:text-accent hover:bg-accent/5"
                    onClick={() => {
                      const input = window.prompt(`Update total copies for "${book.title}":`, book.copies.toString());
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
                <div className={`inline-block px-3 py-1 rounded border-2 transform -rotate-3 font-bold text-[9px] uppercase tracking-wider ${book.borrowed < book.copies ? "border-green-800/20 text-green-800/50" : "border-red-800/20 text-red-800/50"}`}>
                  {book.borrowed < book.copies ? "Accepted" : "On Loan"}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-sm border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all uppercase text-[9px] font-bold tracking-widest"
                    disabled={book.borrowed >= book.copies}
                    onClick={() => onBorrow(book.id)}
                  >
                    Borrow
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-sm border-primary/20 hover:bg-secondary transition-all uppercase text-[9px] font-bold tracking-widest"
                    disabled={book.borrowed <= 0}
                    onClick={() => onReturn(book.id)}
                  >
                    Return
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary/40 hover:text-destructive hover:bg-destructive/5 transition-colors"
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
