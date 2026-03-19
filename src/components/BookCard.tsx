import { Book } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Book as BookIcon, 
  User, 
  Tag, 
  Trash2, 
  ArrowRightLeft,
  RotateCcw,
  Settings2
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface BookCardProps {
  book: Book;
  deletingId: string | null;
  onDelete: (id: string) => void;
  onBorrow: (id: string) => void;
  onReturn: (id: string) => void;
  onUpdateCopies: (id: string, newCopies: number) => void;
}

const BookCard = ({
  book,
  deletingId,
  onDelete,
  onBorrow,
  onReturn,
  onUpdateCopies,
}: BookCardProps) => {
  const isAvailable = book.borrowed < book.copies;
  const isDeleting = deletingId === book.id;

  return (
    <Card className={`archive-card flex flex-col min-h-[460px] rounded-none ${isDeleting ? "opacity-0 scale-95" : "animate-archive-in"}`}>
      <CardHeader className="p-8 pb-4">
        <div className="flex justify-between items-start gap-2 mb-6 uppercase tracking-[0.2em] font-bold text-[9px] text-muted-foreground/60">
          <div className="flex items-center gap-2">
            <div className={`h-1.5 w-1.5 rounded-full ${isAvailable ? "bg-green-600 shadow-[0_0_8px_rgba(22,163,74,0.4)]" : "bg-accent/40"}`} />
            {isAvailable ? "Available" : "Checked Out"}
          </div>
          <div className="flex items-center gap-1.5 group">
            <Tag className="h-3 w-3 opacity-40 group-hover:opacity-100 transition-opacity" />
            {book.genre}
          </div>
        </div>
        <CardTitle className="font-serif text-2xl leading-tight group-hover:text-primary transition-colors line-clamp-3 font-bold mb-4">
          {book.title}
        </CardTitle>
        <CardDescription className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-primary/60 border-t border-primary/5 pt-4 group">
          <User className="h-3 w-3 opacity-50 group-hover:text-primary transition-colors" />
          {book.author}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-8 py-4 flex-grow flex flex-col justify-end">
        <div className="grid grid-cols-2 gap-8 border-y border-primary/5 py-6">
          <div className="space-y-1">
            <p className="academic-label">Inventory</p>
            <p className="text-2xl font-bold font-serif">{book.copies}</p>
          </div>
          <div className="space-y-1">
            <p className="academic-label">On Shelf</p>
            <p className={`text-2xl font-bold font-serif ${isAvailable ? "text-primary" : "text-destructive/60"}`}>
              {book.copies - book.borrowed}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-8 pb-8 pt-4 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3 w-full">
          <Button 
            variant="default" 
            className="w-full h-11 rounded-none font-bold uppercase tracking-[0.2em] text-[9px] shadow-sm active:scale-95 transition-all bg-primary hover:bg-primary/95 text-primary-foreground"
            disabled={!isAvailable}
            onClick={() => onBorrow(book.id)}
          >
            <ArrowRightLeft className="mr-2 h-3.5 w-3.5" />
            Borrow
          </Button>
          <Button 
            variant="outline" 
            className="w-full h-11 rounded-none font-bold uppercase tracking-[0.2em] text-[9px] border-primary/10 shadow-sm active:scale-95 transition-all hover:bg-secondary"
            disabled={book.borrowed <= 0}
            onClick={() => onReturn(book.id)}
          >
            <RotateCcw className="mr-2 h-3.5 w-3.5" />
            Return
          </Button>
        </div>
        <div className="flex items-center justify-between w-full">
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 academic-label hover:text-accent p-0 transition-colors"
            onClick={() => {
              const input = window.prompt(`Update inventory for "${book.title}":`, book.copies.toString());
              if (input) {
                const val = parseInt(input, 10);
                if (!isNaN(val)) onUpdateCopies(book.id, val);
              }
            }}
          >
            <Settings2 className="mr-2 h-3.5 w-3.5" />
            Records
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 academic-label hover:text-destructive p-0 transition-colors"
            onClick={() => onDelete(book.id)}
          >
            <Trash2 className="mr-2 h-3.5 w-3.5" />
            De-accession
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
