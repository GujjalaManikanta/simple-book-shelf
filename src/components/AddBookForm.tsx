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

  const getError = (field: string) => errors.find((e) => e.field === field)?.message;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await onAddBook(title, author, genre, copies);
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
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a New Book</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. The Great Gatsby" />
            {getError("title") && <p className="text-sm text-destructive">{getError("title")}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="e.g. F. Scott Fitzgerald" />
            {getError("author") && <p className="text-sm text-destructive">{getError("author")}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="genre">Genre</Label>
            <Input id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="e.g. Classic" />
            {getError("genre") && <p className="text-sm text-destructive">{getError("genre")}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="copies">Copies</Label>
            <Input id="copies" type="number" min="1" value={copies} onChange={(e) => setCopies(parseInt(e.target.value) || 1)} />
            {getError("copies") && <p className="text-sm text-destructive">{getError("copies")}</p>}
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full sm:w-auto">Add Book</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookForm;
