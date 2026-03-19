import { BookOpen, Library, LayoutGrid, List as ListIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LibraryHeaderProps {
  totalBooks: number;
  totalCopies: number;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

const LibraryHeader = ({ 
  totalBooks, 
  totalCopies, 
  viewMode, 
  onViewModeChange 
}: LibraryHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-primary/10 px-8 py-5 mb-16 shadow-sm wood-trim">
      <div className="container mx-auto max-w-7xl flex items-center justify-between">
        <div className="flex items-center gap-5 group cursor-default">
          <div className="bg-primary p-2.5 rounded shadow-lg shadow-primary/10 group-hover:-translate-y-0.5 transition-transform duration-300">
            <Library className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-serif tracking-tight text-primary leading-none">The Academic Archive</h1>
            <p className="academic-label mt-2.5">Institutional Access • Vol. MMXXIV</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex bg-secondary p-1 rounded shadow-inner">
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 rounded-sm transition-all duration-300 ${viewMode === "grid" ? "bg-background text-primary shadow-sm ring-1 ring-primary/5" : "text-muted-foreground hover:text-primary"}`}
              onClick={() => onViewModeChange("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 rounded-sm transition-all duration-300 ${viewMode === "list" ? "bg-background text-primary shadow-sm ring-1 ring-primary/5" : "text-muted-foreground hover:text-primary"}`}
              onClick={() => onViewModeChange("list")}
            >
              <ListIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LibraryHeader;

