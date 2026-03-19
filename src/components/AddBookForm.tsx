import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { ValidationError } from "@/lib/validation";

interface AddBookFormProps {
  onAddBook: (title: string, author: string, genre: string, copies: number) => Promise<ValidationError[]>;
}

const AddBookForm = ({ onAddBook }: AddBookFormProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [copies, setCopies] = useState(1);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getError = (field: string) => errors.find((e) => e.field === field)?.message;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await onAddBook(title, author, genre, copies);
    setIsSubmitting(false);
    
    if (result.length === 0) {
      setTitle("");
      setAuthor("");
      setGenre("");
      setCopies(1);
      setErrors([]);
      setOpen(false);
    } else {
      setErrors(result);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-12 px-8 rounded-sm shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5 transition-all bg-accent hover:bg-accent/90 text-accent-foreground border border-white/10 uppercase tracking-[0.2em] font-bold text-[10px]">
          <Plus className="mr-2 h-4 w-4" />
          Accession New Volume
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card paper-texture border-accent/30 rounded-none overflow-hidden p-0 shadow-2xl">
        <div className="bg-primary p-6 border-b border-accent/20 wood-panel">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-primary-foreground italic">Catalog Accession</DialogTitle>
          </DialogHeader>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-xs uppercase tracking-widest font-bold text-muted-foreground ml-1">Title</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="e.g. The Great Gatsby" 
              className="rounded-xl border-primary/10 bg-secondary/30 h-11 focus:border-accent"
            />
            {getError("title") && <p className="text-[10px] font-bold text-destructive uppercase ml-1 animate-in fade-in slide-in-from-left-2">{getError("title")}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="author" className="text-xs uppercase tracking-widest font-bold text-muted-foreground ml-1">Author</Label>
              <Input 
                id="author" 
                value={author} 
                onChange={(e) => setAuthor(e.target.value)} 
                placeholder="Name" 
                className="rounded-xl border-primary/10 bg-secondary/30 h-11 focus:border-accent"
              />
              {getError("author") && <p className="text-[10px] font-bold text-destructive uppercase ml-1 animate-in fade-in slide-in-from-left-2">{getError("author")}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="genre" className="text-xs uppercase tracking-widest font-bold text-muted-foreground ml-1">Genre</Label>
              <Input 
                id="genre" 
                value={genre} 
                onChange={(e) => setGenre(e.target.value)} 
                placeholder="Category" 
                className="rounded-xl border-primary/10 bg-secondary/30 h-11 focus:border-accent"
              />
              {getError("genre") && <p className="text-[10px] font-bold text-destructive uppercase ml-1 animate-in fade-in slide-in-from-left-2">{getError("genre")}</p>}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="copies" className="text-xs uppercase tracking-widest font-bold text-muted-foreground ml-1">Inventory Count</Label>
            <Input 
              id="copies" 
              type="number" 
              min="1" 
              value={copies} 
              onChange={(e) => setCopies(parseInt(e.target.value) || 1)} 
              className="rounded-xl border-primary/10 bg-secondary/30 h-11 focus:border-accent"
            />
            {getError("copies") && <p className="text-[10px] font-bold text-destructive uppercase ml-1 animate-in fade-in slide-in-from-left-2">{getError("copies")}</p>}
          </div>
          <DialogFooter className="pt-2">
            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Confirm Archive Accession"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookForm;
