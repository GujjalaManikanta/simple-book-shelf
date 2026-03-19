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
    <Card className={`group relative flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-primary/10 bg-card/50 backdrop-blur-sm ${isDeleting ? "animate-out fade-out zoom-out-95" : "animate-in"}`}>
      {/* Visual Spine Accent */}
      <div className="absolute left-0 top-0 h-full w-1.5 bg-primary/40 group-hover:bg-accent transition-colors duration-300" />
      
      <CardHeader className="pl-6 pt-6 pb-2">
        <div className="flex justify-between items-start gap-2 mb-2">
          <Badge variant={isAvailable ? "outline" : "destructive"} className={isAvailable ? "border-accent text-accent bg-accent/5 font-semibold" : "font-semibold"}>
            {isAvailable ? "Available" : "Full"}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-full">
            <Tag className="h-3 w-3" />
            {book.genre}
          </div>
        </div>
        <CardTitle className="font-serif text-xl leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {book.title}
        </CardTitle>
        <CardDescription className="flex items-center gap-1.5 text-sm mt-1">
          <User className="h-3.5 w-3.5 opacity-70" />
          {book.author}
        </CardDescription>
      </CardHeader>

      <CardContent className="pl-6 py-4 flex-grow">
        <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg border border-primary/5">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-0.5">Total</p>
            <p className="text-lg font-bold font-serif">{book.copies}</p>
          </div>
          <div className="h-8 w-px bg-primary/10" />
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-0.5">Left</p>
            <p className={`text-lg font-bold font-serif ${isAvailable ? "text-accent" : "text-destructive"}`}>
              {book.copies - book.borrowed}
            </p>
          </div>
          <div className="h-8 w-px bg-primary/10" />
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 hover:bg-accent/10 hover:text-accent"
            onClick={() => {
              const input = window.prompt(`Update total copies for "${book.title}":`, book.copies.toString());
              if (input) {
                const val = parseInt(input, 10);
                if (!isNaN(val)) onUpdateCopies(book.id, val);
              }
            }}
          >
            <Settings2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>

      <CardFooter className="pl-6 pb-6 pt-2 grid grid-cols-2 gap-2">
        <Button 
          variant={isAvailable ? "default" : "outline"} 
          className="w-full gap-2 shadow-sm active:scale-95 transition-transform"
          disabled={!isAvailable}
          onClick={() => onBorrow(book.id)}
        >
          <ArrowRightLeft className="h-4 w-4" />
          Borrow
        </Button>
        <Button 
          variant="outline" 
          className="w-full gap-2 hover:bg-secondary active:scale-95 transition-transform"
          disabled={book.borrowed <= 0}
          onClick={() => onReturn(book.id)}
        >
          <RotateCcw className="h-4 w-4" />
          Return
        </Button>
        <Button 
          variant="ghost" 
          className="col-span-2 mt-2 h-8 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors gap-1.5"
          onClick={() => onDelete(book.id)}
        >
          <Trash2 className="h-3.5 w-3.5" />
          Archive Record
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
