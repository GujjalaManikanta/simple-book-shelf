import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
}

const SearchBar = ({ query, onQueryChange }: SearchBarProps) => {
  return (
    <div className="relative flex-grow max-w-xl group">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60 group-focus-within:text-primary transition-all group-focus-within:scale-110" />
      <Input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search the archive catalog..."
        className="pl-11 h-12 bg-card border-primary/10 transition-all focus:ring-primary/5 focus:border-primary/40 font-serif italic rounded-none shadow-sm"
      />
    </div>
  );
};

export default SearchBar;
