import React, { useState, useEffect } from 'react';
import { 
  loadBooks, 
  Book, 
  exportBooksToJson, 
  importBooksFromJson 
} from '../interfaces/book';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ChevronDownIcon, ChevronUpIcon, DownloadIcon, TrashIcon, UploadIcon } from 'lucide-react';
import { toast } from 'sonner';

const BookLibraryPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  useEffect(() => {
    const loadedBooks = loadBooks();
    setBooks(loadedBooks);
  }, []);
  
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleExport = () => {
    try {
      exportBooksToJson();
      toast.success('Books exported successfully');
    } catch (error) {
      console.error('Failed to export books:', error);
      toast.error('Failed to export books');
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleImport = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to import');
      return;
    }
    
    try {
      const addedCount = await importBooksFromJson(selectedFile);
      setBooks(loadBooks()); // Refresh the books list
      toast.success(`Imported ${addedCount} new books successfully`);
      setSelectedFile(null);
    } catch (error) {
      console.error('Failed to import books:', error);
      toast.error('Failed to import books');
    }
  };
  
  const BookCard: React.FC<{ book: Book }> = ({ book }) => {
    const [showTableOfContents, setShowTableOfContents] = useState(false);
    
    return (
      <Card className="w-full mb-4">
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
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {book.tableOfContents && book.tableOfContents.length > 0 && (
            <div className="mt-2">
              <Button 
                variant="ghost" 
                onClick={() => setShowTableOfContents(!showTableOfContents)}
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
      </Card>
    );
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Book Library</h1>
      
      <Tabs defaultValue="books" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="import-export">Import/Export</TabsTrigger>
        </TabsList>
        
        <TabsContent value="books">
          <div className="mb-4">
            <Input
              placeholder="Search books by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
          
          {filteredBooks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No books found in your library.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="import-export">
          <div className="grid gap-6 max-w-md">
            <Card>
              <CardHeader>
                <CardTitle>Export Books</CardTitle>
                <CardDescription>
                  Download your book library as a JSON file
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button onClick={handleExport} className="w-full">
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  Export Library
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Import Books</CardTitle>
                <CardDescription>
                  Import books from a JSON file
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="book-import">Select File</Label>
                  <Input 
                    id="book-import" 
                    type="file" 
                    accept=".json"
                    onChange={handleFileChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleImport} 
                  disabled={!selectedFile}
                  className="w-full"
                >
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Import Books
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookLibraryPage;
