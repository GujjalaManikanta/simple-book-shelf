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
    <div className={`group relative flex flex-col transition-all duration-500 rounded-lg ${isDeleting ? "opacity-0 scale-95" : "animate-in animate-book-pull"}`}>
      {/* 3D Book Spine Effect */}
      <div className="absolute -left-3 top-2 bottom-2 w-4 bg-primary rounded-l shadow-2xl z-10 hidden md:block border-r border-accent/20" />
      
      <Card className="relative flex-grow flex flex-col overflow-hidden border-primary/20 bg-card shadow-xl paper-texture min-h-[400px]">
        {/* Decorative Gold Border */}
        <div className="absolute inset-2 border border-accent/10 rounded pointer-events-none" />
        
        <CardHeader className="relative z-20 pl-6 pt-10 pb-4">
          <div className="flex justify-between items-start gap-2 mb-4">
            <div className={`px-2 py-1 rounded border-2 transform -rotate-12 font-bold text-[10px] uppercase tracking-tighter ${isAvailable ? "border-green-800/30 text-green-800/60 bg-green-800/5" : "border-red-800/30 text-red-800/60 bg-red-800/5"}`}>
              {isAvailable ? "Accepted" : "On Loan"}
            </div>
            <div className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
              <Tag className="h-3 w-3" />
              {book.genre}
            </div>
          </div>
          <CardTitle className="font-serif text-2xl leading-tight group-hover:text-primary transition-colors line-clamp-3 italic">
            {book.title}
          </CardTitle>
          <div className="h-px w-12 bg-accent/40 my-3" />
          <CardDescription className="flex items-center gap-1.5 text-sm font-medium text-primary">
            <User className="h-3.5 w-3.5 opacity-70" />
            {book.author}
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-20 px-6 py-4 flex-grow flex flex-col justify-end">
          <div className="flex items-center justify-between border-y border-primary/10 py-4 my-2">
            <div className="text-left">
              <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold leading-none mb-1">Stock</p>
              <p className="text-xl font-bold font-serif leading-none">{book.copies}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold leading-none mb-1">Available</p>
              <p className={`text-xl font-bold font-serif leading-none ${isAvailable ? "text-primary" : "text-destructive"}`}>
                {book.copies - book.borrowed}
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="relative z-20 px-6 pb-8 pt-2 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button 
              variant={isAvailable ? "default" : "outline"} 
              className="w-full h-10 rounded-sm font-bold uppercase tracking-widest text-[10px] border-primary/20 shadow-md active:scale-95 transition-all bg-primary hover:bg-primary/90"
              disabled={!isAvailable}
              onClick={() => onBorrow(book.id)}
            >
              <ArrowRightLeft className="mr-2 h-3 w-3" />
              Borrow
            </Button>
            <Button 
              variant="outline" 
              className="w-full h-10 rounded-sm font-bold uppercase tracking-widest text-[10px] border-primary/20 shadow-md active:scale-95 transition-all hover:bg-secondary"
              disabled={book.borrowed <= 0}
              onClick={() => onReturn(book.id)}
            >
              <RotateCcw className="mr-2 h-3 w-3" />
              Return
            </Button>
          </div>
          <div className="flex items-center justify-between w-full opacity-60 hover:opacity-100 transition-opacity">
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 text-[9px] uppercase tracking-widest font-bold hover:text-accent p-0"
              onClick={() => {
                const input = window.prompt(`Update total copies for "${book.title}":`, book.copies.toString());
                if (input) {
                  const val = parseInt(input, 10);
                  if (!isNaN(val)) onUpdateCopies(book.id, val);
                }
              }}
            >
              <Settings2 className="mr-1.5 h-3 w-3" />
              Inventory
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 text-[9px] uppercase tracking-widest font-bold hover:text-destructive p-0"
              onClick={() => onDelete(book.id)}
            >
              <Trash2 className="mr-1.5 h-3 w-3" />
              Remove
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      {/* Visual Depth Shadow */}
      <div className="absolute inset-x-4 bottom-0 h-4 bg-black/40 blur-xl -z-10 rounded-full group-hover:bg-black/60 transition-all" />
    </div>
  );
};

export default BookCard;
