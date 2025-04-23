import React from 'react';
import { Button } from './ui/button';
import { BookSearchResult } from '../services/aiBookSearchService';
import { bookSearchResultToBook, saveBook } from '../interfaces/book';
import { toast } from 'sonner';
import { BookmarkPlusIcon, CheckIcon } from 'lucide-react';

interface SaveBookButtonProps {
  book: BookSearchResult;
  isSaved?: boolean;
  onSave?: () => void;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const SaveBookButton: React.FC<SaveBookButtonProps> = ({
  book,
  isSaved = false,
  onSave,
  variant = 'secondary',
  size = 'sm'
}) => {
  const [saved, setSaved] = React.useState(isSaved);

  const handleSave = () => {
    try {
      const bookToSave = bookSearchResultToBook(book);
      saveBook(bookToSave);
      setSaved(true);
      toast.success('Book saved to your library');
      if (onSave) onSave();
    } catch (error) {
      console.error('Failed to save book:', error);
      toast.error('Failed to save book to library');
    }
  };

  return (
    <Button 
      onClick={handleSave} 
      variant={variant} 
      size={size}
      disabled={saved}
      className="gap-1"
    >
      {saved ? (
        <>
          <CheckIcon size={16} />
          Saved
        </>
      ) : (
        <>
          <BookmarkPlusIcon size={16} />
          Save Book
        </>
      )}
    </Button>
  );
};

export default SaveBookButton;
