import React, { useState } from "react";
import { BookSearchResult, AIModel, searchBooksWithAI } from "../services/aiBookSearchService";
import { useTheme } from "../contexts/ThemeContext";

interface BookSearchProps {
  onSelectBook: (book: BookSearchResult) => void;
}

export const BookSearch: React.FC<BookSearchProps> = ({ onSelectBook }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<BookSearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<AIModel>("gemini");
  const [includeCovers, setIncludeCovers] = useState(true);
  const { theme, toggleTheme } = useTheme();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    try {
      setIsLoading(true);
      setError(null);
      setResults([]);
      
      const searchResults = await searchBooksWithAI(searchQuery, {
        model: selectedModel,
        includeCovers
      });
      
      setResults(searchResults);
    } catch (err) {
      setError("Failed to search for books. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div></div> {/* Empty div for spacing */}
        <button 
          className="btn btn-circle btn-ghost" 
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-5 h-5 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-5 h-5 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          )}
        </button>
      </div>

      <div className="alert alert-info mb-6">
        <div className="flex-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>
            Enter a book title, author, or topic to search with Google Books API. The Gemini model focuses on textbooks, 
            while Claude provides a broader range of book results with enhanced details.
          </span>
        </div>
      </div>
  
      <form onSubmit={handleSearch} className="card bg-base-200 shadow-md mb-6">
        <div className="card-body">
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">What book are you looking for?</span>
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter book title, author or topic..."
              className="input input-bordered w-full"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Choose AI Model</span>
              </label>
              <div className="join w-full">
                <button
                  type="button"
                  onClick={() => setSelectedModel("gemini")}
                  className={`join-item btn ${selectedModel === "gemini" ? "btn-primary" : "btn-outline"} flex-1`}
                  title="Optimized for finding textbooks and educational materials"
                >
                  Gemini (Textbooks)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedModel("claude")}
                  className={`join-item btn ${selectedModel === "claude" ? "btn-secondary" : "btn-outline"} flex-1`}
                  title="General book search with comprehensive results"
                >
                  Claude (All Books)
                </button>
              </div>
            </div>
            
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Cover Images</span>
              </label>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">{includeCovers ? "Show cover images" : "Hide cover images"}</span>
                  <input 
                    type="checkbox" 
                    className="toggle toggle-success" 
                    checked={includeCovers}
                    onChange={(e) => setIncludeCovers(e.target.checked)}
                  />
                </label>
              </div>
            </div>
          </div>
          
          <div className="card-actions justify-end">
            <button 
              type="submit" 
              className={`btn ${selectedModel === "gemini" ? "btn-primary" : "btn-secondary"}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Searching with {selectedModel === "gemini" ? "Gemini" : "Claude"}...
                </>
              ) : (
                <span>Search with {selectedModel === "gemini" ? "Gemini" : "Claude"}</span>
              )}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="alert alert-error mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {results.length > 0 && (
        <h3 className="text-lg font-medium mb-4">
          Results from {selectedModel === "gemini" ? "Gemini" : "Claude"} AI
        </h3>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((book) => (
          <div 
            key={book.id}
            className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onSelectBook(book)}
          >
            {includeCovers && book.coverImage && (
              <figure className="relative h-56">
                <img 
                  src={book.coverImage} 
                  alt={`Cover of ${book.title}`} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=300';
                  }}
                />
                {book.genre && (
                  <div className="badge badge-neutral absolute top-2 right-2">
                    {book.genre}
                  </div>
                )}
              </figure>
            )}
            <div className="card-body">
              <h2 className="card-title text-base-content">{book.title}</h2>
              <p className="text-sm opacity-70">
                by {book.author}
                {book.publicationYear && ` (${book.publicationYear})`}
              </p>
              {book.description && (
                <p className="text-sm opacity-70 line-clamp-3 mb-3">{book.description}</p>
              )}
              {book.tableOfContents && book.tableOfContents.length > 0 && (
                <div className="mb-2">
                  <button 
                    className="btn btn-link btn-sm p-0 flex items-center justify-start"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(book.previewLink, '_blank');
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1 stroke-current">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                    View Table of Contents
                  </button>
                </div>
              )}
              <div className="card-actions justify-end">
                <button className="btn btn-success w-full">
                  Add to Library
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {results.length === 0 && !isLoading && searchQuery && (
        <div className="alert alert-warning flex flex-col items-center py-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-12 w-12" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h3 className="font-medium mt-4">No results found</h3>
          <p className="opacity-70">
            Try adjusting your search terms or try a different AI model.
          </p>
        </div>
      )}
      
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="mt-4 opacity-70">Searching with {selectedModel === "gemini" ? "Gemini" : "Claude"} AI...</p>
        </div>
      )}
    </div>
  );
};
