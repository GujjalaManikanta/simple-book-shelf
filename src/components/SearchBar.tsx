import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
}

const SearchBar = ({ query, onQueryChange }: SearchBarProps) => {
  return (
    <div className="relative flex-grow max-w-xl group">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-accent transition-colors transition-transform group-focus-within:scale-110" />
      <Input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Filter the archive by title, author, or genre..."
        className="pl-11 h-12 bg-card/50 backdrop-blur-md border-primary/10 transition-all focus:ring-accent/20 focus:border-accent font-medium rounded-2xl"
      />
    </div>
  );
};

export default SearchBar;
