import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, List } from "lucide-react";
import { Book, Concept, loadBooks } from "../interfaces/book";

export function TableOfContentsPage() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the book data from local storage
    const fetchBook = async () => {
      setLoading(true);
      
      // Short timeout to simulate network request and show loading state
      setTimeout(() => {
        const storedBooks = loadBooks();
        const foundBook = storedBooks.find(b => b.id.toString() === bookId);
        setBook(foundBook || null);
        setLoading(false);
      }, 300);
    };

    fetchBook();
  }, [bookId]);

  const handleConceptClick = (conceptId: string) => {
    navigate(`/book/${bookId}/concept/${conceptId}`);
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="py-10 text-center">
        <BookOpen size={48} className="mx-auto mb-4 opacity-40" />
        <h2 className="text-xl font-semibold mb-2">Book Not Found</h2>
        <p className="opacity-70 mb-4">We couldn't find the book you're looking for.</p>
        <button onClick={goBack} className="md-btn md-btn-primary md-ripple">
          Back to Library
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <button 
        onClick={goBack}
        className="flex items-center mb-6 md-btn md-btn-text md-ripple"
      >
        <ArrowLeft size={18} className="mr-1" />
        Back to Library
      </button>

      <div className="flex flex-col md:flex-row md:items-start gap-8 mb-8">
        {book.coverImage && (
          <div className="w-40 shrink-0">
            <img 
              src={book.coverImage} 
              alt={`Cover of ${book.title}`} 
              className="w-full object-cover rounded shadow-md"
            />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--md-on-background)" }}>
            {book.title}
          </h1>
          <p className="text-lg opacity-80 mb-4">{book.author}</p>
          <div className="flex items-center gap-2 mb-6">
            <List size={20} className="opacity-70" />
            <h2 className="text-xl font-semibold">Table of Contents</h2>
          </div>
        </div>
      </div>

      {book.concepts && book.concepts.length > 0 ? (
        <div className="divide-y">
          {book.concepts.map((concept, index) => (
            <div 
              key={concept.id}
              onClick={() => handleConceptClick(concept.id)}
              className="py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors px-2"
            >
              <div className="flex items-center">
                <span className="text-lg font-medium mr-2 text-gray-500 w-8">
                  {index + 1}.
                </span>
                <span className="font-medium">{concept.title}</span>
              </div>
              {concept.pageNumber && (
                <span className="text-sm opacity-60">Page {concept.pageNumber}</span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border rounded">
          <p className="opacity-70">No concepts found for this book.</p>
        </div>
      )}
    </div>
  );
}
