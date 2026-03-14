import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LibraryHeaderProps {
  totalBooks: number;
}

const LibraryHeader = ({ totalBooks }: LibraryHeaderProps) => {
  return (
    <header className="border-b bg-card px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold tracking-tight">Library Manager</h1>
        </div>
        <Badge variant="secondary" className="text-sm font-medium px-3 py-1">
          {totalBooks} {totalBooks === 1 ? "Book" : "Books"}
        </Badge>
      </div>
    </header>
  );
};

export default LibraryHeader;
