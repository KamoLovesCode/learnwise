
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TextbookSearch } from "@/components/TextbookSearch";
import { TextbookCard } from "@/components/TextbookCard";
import { searchTextbooks, mockTextbooks } from "@/data/mock-textbooks";
import { Textbook } from "@/types";
import { Search } from "lucide-react";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState<Textbook[]>(mockTextbooks);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      setSearchResults(mockTextbooks);
    } else {
      setSearchResults(searchTextbooks(query));
    }
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="bg-math-50 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Find Your Math Textbook</h1>
            <div className="max-w-2xl mx-auto">
              <TextbookSearch onSearch={handleSearch} />
            </div>
          </div>
        </section>
        
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">
                {hasSearched 
                  ? `${searchResults.length} textbooks found` 
                  : "All Available Textbooks"}
              </h2>
            </div>
            
            {searchResults.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map(textbook => (
                  <TextbookCard key={textbook.id} textbook={textbook} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No textbooks found</h3>
                <p className="text-gray-600">
                  Try searching with different keywords or browse our collection.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchPage;
