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
    <div className="rounded-2xl border border-primary/10 bg-card/50 backdrop-blur-sm overflow-hidden shadow-xl animate-in">
      <Table>
        <TableHeader>
          <TableRow className="bg-primary/5 hover:bg-primary/5 border-b border-primary/10">
            <SortableHeader label="Title" field="title" activeField={sortField} direction={sortDirection} onSort={onSort} />
            <SortableHeader label="Author" field="author" activeField={sortField} direction={sortDirection} onSort={onSort} />
            <SortableHeader label="Genre" field="genre" activeField={sortField} direction={sortDirection} onSort={onSort} />
            <SortableHeader label="Copies" field="copies" activeField={sortField} direction={sortDirection} onSort={onSort} />
            <TableHead className="text-center font-bold uppercase tracking-widest text-[10px]">Status</TableHead>
            <TableHead className="text-right font-bold uppercase tracking-widest text-[10px]">Operations</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow
              key={book.id}
              className={`transition-all duration-300 border-primary/5 hover:bg-primary/5 ${deletingId === book.id ? "opacity-50 grayscale" : ""}`}
            >
              <TableCell className="font-serif font-bold text-lg">{book.title}</TableCell>
              <TableCell className="text-muted-foreground font-medium">{book.author}</TableCell>
              <TableCell>
                <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-tighter border-primary/20">
                  {book.genre}
                </Badge>
              </TableCell>
              <TableCell className="text-center font-bold font-serif group">
                <div className="flex items-center justify-center gap-2">
                  <span className="bg-secondary/50 px-3 py-1 rounded-lg border border-primary/5">{book.copies}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-all hover:text-accent hover:bg-accent/10"
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
                <Badge
                  className="px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider transition-all"
                  variant={book.borrowed < book.copies ? "secondary" : "destructive"}
                >
                  {book.borrowed < book.copies ? "Available" : "Checked Out"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-lg border-primary/10 hover:bg-primary hover:text-primary-foreground transition-all"
                    disabled={book.borrowed >= book.copies}
                    onClick={() => onBorrow(book.id)}
                  >
                    Borrow
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-lg border-primary/10 hover:bg-secondary transition-all"
                    disabled={book.borrowed <= 0}
                    onClick={() => onReturn(book.id)}
                  >
                    Return
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
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
