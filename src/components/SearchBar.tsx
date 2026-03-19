import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
}

const SearchBar = ({ query, onQueryChange }: SearchBarProps) => {
  return (
    <div className="relative flex-grow max-w-xl group">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-accent/60 group-focus-within:text-accent transition-all group-focus-within:scale-110" />
      <Input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search the collection catalog..."
        className="pl-11 h-12 bg-card border-accent/20 transition-all focus:ring-accent/20 focus:border-accent font-serif italic rounded-sm shadow-inner"
      />
    </div>
  );
};

export default SearchBar;
