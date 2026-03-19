import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LibraryHeaderProps {
  totalBooks: number;
  totalCopies: number;
}

const LibraryHeader = ({ totalBooks, totalCopies }: LibraryHeaderProps) => {
  return (
    <header className="border-b bg-card px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold tracking-tight">Library Manager</h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm font-medium px-3 py-1">
            {totalBooks} {totalBooks === 1 ? "Book Title" : "Book Titles"}
          </Badge>
          <Badge variant="outline" className="text-sm font-medium px-3 py-1 border-primary text-primary bg-primary/10">
            {totalCopies} Total {totalCopies === 1 ? "Copy" : "Copies"}
          </Badge>
        </div>
      </div>
    </header>
  );
};

export default LibraryHeader;
