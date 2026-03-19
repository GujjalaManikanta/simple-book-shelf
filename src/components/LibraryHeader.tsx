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
    <header className="sticky top-0 z-50 wood-panel border-b border-accent/20 px-6 py-4 mb-12 shadow-2xl">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4 group cursor-default">
          <div className="bg-accent/20 p-2.5 rounded border border-accent/30 shadow-inner group-hover:rotate-3 transition-transform">
            <Library className="h-7 w-7 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-serif tracking-tight leading-none text-primary-foreground italic">The Grand Library</h1>
            <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-accent/80 mt-2">Established MMXXIV • Private Collection</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-6 mr-4 py-2 px-6 bg-black/20 rounded border border-white/5">
            <div className="flex flex-col items-center">
              <span className="text-[9px] uppercase font-bold text-accent/60 leading-none mb-1.5">Volumes</span>
              <span className="text-base font-bold text-primary-foreground leading-none">{totalBooks}</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex flex-col items-center">
              <span className="text-[9px] uppercase font-bold text-accent/60 leading-none mb-1.5">Total Stock</span>
              <span className="text-base font-bold text-primary-foreground leading-none">{totalCopies}</span>
            </div>
          </div>

          <div className="flex bg-black/30 p-1 rounded border border-white/5">
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 rounded transition-all ${viewMode === "grid" ? "bg-accent text-accent-foreground shadow-lg" : "text-primary-foreground/60 hover:text-primary-foreground"}`}
              onClick={() => onViewModeChange("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 rounded transition-all ${viewMode === "list" ? "bg-accent text-accent-foreground shadow-lg" : "text-primary-foreground/60 hover:text-primary-foreground"}`}
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

