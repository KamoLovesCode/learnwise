import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookText, List } from "lucide-react";
import { Book, Concept, loadBooks } from "../interfaces/book";

export function ConceptSummaryPage() {
  const { bookId, conceptId } = useParams<{ bookId: string; conceptId: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [concept, setConcept] = useState<Concept | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch book and concept data from localStorage
    const fetchData = async () => {
      setLoading(true);
      
      // Short timeout to simulate network request and show loading state
      setTimeout(() => {
        const storedBooks = loadBooks();
        const foundBook = storedBooks.find(b => b.id.toString() === bookId);
        setBook(foundBook || null);
        
        if (foundBook && foundBook.concepts) {
          const foundConcept = foundBook.concepts.find(c => c.id === conceptId);
          setConcept(foundConcept || null);
        }
        
        setLoading(false);
      }, 300);
    };

    fetchData();
  }, [bookId, conceptId]);

  const goBack = () => {
    navigate(`/book/${bookId}/contents`);
  };

  const goToContents = () => {
    navigate(`/book/${bookId}/contents`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!book || !concept) {
    return (
      <div className="py-10 text-center">
        <BookText size={48} className="mx-auto mb-4 opacity-40" />
        <h2 className="text-xl font-semibold mb-2">Content Not Found</h2>
        <p className="opacity-70 mb-4">We couldn't find the concept you're looking for.</p>
        <button onClick={() => navigate('/library')} className="md-btn md-btn-primary md-ripple">
          Back to Library
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={goBack}
          className="flex items-center md-btn md-btn-text md-ripple"
        >
          <ArrowLeft size={18} className="mr-1" />
          Back
        </button>
        
        <button 
          onClick={goToContents}
          className="flex items-center md-btn md-btn-text md-ripple"
        >
          <List size={18} className="mr-1" />
          Table of Contents
        </button>
      </div>

      <div className="mb-8">
        <div className="text-sm opacity-60 mb-1">
          From {book.title} by {book.author}
          {concept.pageNumber && ` · Page ${concept.pageNumber}`}
        </div>
        <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--md-on-background)" }}>
          {concept.title}
        </h1>
      </div>

      <div className="prose max-w-none dark:prose-invert">
        {concept.summary.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
