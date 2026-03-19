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
    <header className="sticky top-0 z-50 glass border-b px-6 py-3 mb-8">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-default">
          <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
            <Library className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-serif tracking-tight leading-none">Midnight Archive</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mt-1">Universal Library Management</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3 mr-4 py-1 px-4 bg-secondary/50 rounded-full border border-primary/5">
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-muted-foreground leading-none">Titles</span>
              <span className="text-sm font-bold">{totalBooks}</span>
            </div>
            <div className="h-6 w-px bg-primary/10" />
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-muted-foreground leading-none">Copies</span>
              <span className="text-sm font-bold">{totalCopies}</span>
            </div>
          </div>

          <div className="flex bg-secondary/80 p-1 rounded-lg border border-white/5">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8 rounded-md"
              onClick={() => onViewModeChange("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8 rounded-md"
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

