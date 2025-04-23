import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { BookSearchResult } from '../services/aiBookSearchService';
import SaveBookButton from './SaveBookButton';
import { loadBooks } from '../interfaces/book';
import { Button } from './ui/button';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

interface BookSearchResultCardProps {
  book: BookSearchResult;
  onSave?: () => void;
}

const BookSearchResultCard: React.FC<BookSearchResultCardProps> = ({ book, onSave }) => {
  const [showTableOfContents, setShowTableOfContents] = React.useState(false);
  const savedBooks = loadBooks();
  const isSaved = savedBooks.some(savedBook => savedBook.id === book.id);
  
  const toggleTableOfContents = () => {
    setShowTableOfContents(!showTableOfContents);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex flex-row gap-4">
          {book.coverImage && (
            <div className="flex-shrink-0 w-20 h-30">
              <img
                src={book.coverImage}
                alt={`Cover of ${book.title}`}
                className="object-cover w-full h-full rounded"
              />
            </div>
          )}
          <div className="flex-grow">
            <CardTitle>{book.title}</CardTitle>
            <CardDescription>by {book.author}</CardDescription>
            {book.publicationYear && <CardDescription>Published: {book.publicationYear}</CardDescription>}
            {book.pageCount && <CardDescription>Pages: {book.pageCount}</CardDescription>}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {book.description && <p className="text-sm text-gray-600 mb-2">{book.description}</p>}
        
        {book.tableOfContents && book.tableOfContents.length > 0 && (
          <div className="mt-2">
            <Button 
              variant="ghost" 
              onClick={toggleTableOfContents}
              className="flex items-center text-sm p-1 h-8"
            >
              {showTableOfContents ? (
                <>Hide Table of Contents <ChevronUpIcon className="ml-1" size={16} /></>
              ) : (
                <>Show Table of Contents <ChevronDownIcon className="ml-1" size={16} /></>
              )}
            </Button>
            
            {showTableOfContents && (
              <div className="mt-2 pl-4 border-l-2 border-gray-200">
                <h4 className="text-sm font-semibold mb-1">Table of Contents:</h4>
                <ul className="text-xs space-y-1">
                  {book.tableOfContents.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <SaveBookButton 
          book={book} 
          isSaved={isSaved} 
          onSave={onSave}
        />
        
        {book.previewLink && (
          <Button variant="outline" size="sm" asChild>
            <a href={book.previewLink} target="_blank" rel="noopener noreferrer">
              Preview
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookSearchResultCard;
