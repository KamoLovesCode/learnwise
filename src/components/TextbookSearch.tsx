
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface TextbookSearchProps {
  onSearch: (query: string) => void;
}

export const TextbookSearch = ({ onSearch }: TextbookSearchProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-lg items-center space-x-2">
      <Input
        type="text"
        placeholder="Search for textbooks by title or author..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" variant="default" className="gap-2">
        <Search className="h-4 w-4" />
        <span>Search</span>
      </Button>
    </form>
  );
};
