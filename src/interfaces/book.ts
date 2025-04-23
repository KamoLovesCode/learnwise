export interface Concept {
  id: string;
  title: string;
  summary: string;
  pageNumber?: number;
}

export interface Book {
  id: number | string;
  title: string;
  author: string;
  coverImage?: string;
  concepts?: Concept[];
  tableOfContents?: string[];
}

// Helper functions for book persistence
export const saveBooks = (books: Book[]): void => {
  localStorage.setItem('bookLibrary', JSON.stringify(books));
};

export const loadBooks = (): Book[] => {
  const storedBooks = localStorage.getItem('bookLibrary');
  return storedBooks ? JSON.parse(storedBooks) : [];
};

/**
 * Convert a BookSearchResult to a Book that can be saved in the library
 */
export const bookSearchResultToBook = (searchResult: any): Book => {
  return {
    id: searchResult.id,
    title: searchResult.title,
    author: searchResult.author,
    coverImage: searchResult.coverImage,
    tableOfContents: searchResult.tableOfContents,
  };
};

/**
 * Save a single book to the library
 * If the book already exists (by id), it will update the existing entry
 * Otherwise, it adds the new book to the library
 */
export const saveBook = (book: Book): void => {
  const books = loadBooks();
  const existingBookIndex = books.findIndex(b => b.id === book.id);

  if (existingBookIndex >= 0) {
    // Update existing book
    books[existingBookIndex] = { ...books[existingBookIndex], ...book };
  } else {
    // Add new book
    books.push(book);
  }

  // Save to localStorage
  saveBooks(books);
};
  
  /**
   * Export all books from the library to a downloadable JSON file
   */
  export const exportBooksToJson = (): void => {
  const books = loadBooks();
  const booksJson = JSON.stringify(books, null, 2);
  const blob = new Blob([booksJson], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  // Create a download link and trigger it
  const a = document.createElement('a');
  a.href = url;
  a.download = 'my-book-library.json';
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
  };
  
  /**
   * Import books from a JSON file and add them to the library
   * @param jsonFile - File object containing the JSON data
   * @returns Promise resolving to the number of books imported
   */
  export const importBooksFromJson = (jsonFile: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const importedBooks = JSON.parse(event.target?.result as string) as Book[];
        
        if (!Array.isArray(importedBooks)) {
          reject(new Error('Invalid format: Imported data is not an array of books'));
          return;
        }
        
        const currentBooks = loadBooks();
        
        // Merge imported books with existing ones, avoiding duplicates by ID
        const mergedBooks = [...currentBooks];
        let addedCount = 0;
        
        importedBooks.forEach(importedBook => {
          const existingIndex = mergedBooks.findIndex(book => book.id === importedBook.id);
          
          if (existingIndex >= 0) {
            // Update existing book
            mergedBooks[existingIndex] = { ...mergedBooks[existingIndex], ...importedBook };
          } else {
            // Add new book
            mergedBooks.push(importedBook);
            addedCount++;
          }
        });
        
        // Save merged books
        saveBooks(mergedBooks);
        resolve(addedCount);
      } catch (error) {
        reject(new Error('Failed to parse imported JSON file'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read the file'));
    };
    
    reader.readAsText(jsonFile);
  });
  };
