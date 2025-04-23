import React, { useState } from "react"
import { BookSearch } from "../components/BookSearch"
import { BookSearchResult } from "../services/aiBookSearchService"
import { BookOpen } from "lucide-react"

interface Book {
  id: number | string
  title: string
  author: string
  coverImage?: string
}

export function LibraryPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [showModal, setShowModal] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [newBookTitle, setNewBookTitle] = useState("")
  const [newBookAuthor, setNewBookAuthor] = useState("")

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    // Clear input fields on close (optional)
    setNewBookTitle("")
    setNewBookAuthor("")
  }

  const openSearchModal = () => {
    setShowSearchModal(true)
  }
  const closeSearchModal = () => {
    setShowSearchModal(false)
  }

  const addBook = () => {
    if (newBookTitle.trim() && newBookAuthor.trim()) {
      const newBook: Book = {
        id: Date.now(),
        title: newBookTitle,
        author: newBookAuthor,
      }
      setBooks([...books, newBook])
      closeModal()
    }
  }

  const addBookFromSearch = (bookResult: BookSearchResult) => {
    const newBook: Book = {
      id: bookResult.id || Date.now(),
      title: bookResult.title,
      author: bookResult.author,
      coverImage: bookResult.coverImage
    }
    setBooks([...books, newBook])
    closeSearchModal()
  }

  const deleteBook = (id: number | string) => {
    setBooks(books.filter((book) => book.id !== id))
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--md-on-background)" }}>
        My Library
      </h1>

      {/* Action buttons */}
      <div className="mb-8 flex gap-3 flex-wrap">
        <button
          className="md-btn md-btn-primary md-ripple"
          onClick={openSearchModal}
        >
          Search Books with AI
        </button>
        <button
          className="md-btn md-btn-secondary md-ripple"
          onClick={openModal}
        >
          Add Book Manually
        </button>
      </div>

      {/* Cards for existing books */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
        {books.map((book) => (
          <div key={book.id} className="md-card">
            {book.coverImage && (
              <div className="w-full h-56 bg-gray-800 relative">
                <img 
                  src={book.coverImage} 
                  alt={`Cover of ${book.title}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="md-card-content">
              <h2 className="font-medium text-lg" style={{ color: "var(--md-on-surface)" }}>{book.title}</h2>
              <p className="text-sm opacity-80 mb-4">{book.author}</p>
              <button
                onClick={() => deleteBook(book.id)}
                className="md-btn md-btn-text md-ripple"
                style={{ color: "var(--md-error)" }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {books.length === 0 && (
          <div className="col-span-full text-center py-16 md-surface-1 rounded">
            <BookOpen size={48} className="mx-auto mb-4 opacity-40" />
            <p className="opacity-70">Your library is empty. Search for books or add them manually.</p>
          </div>
        )}
      </div>

      {/* Manual Add Book Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white w-11/12 sm:w-96 p-6 rounded shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Add a New Book</h3>
            <input
              type="text"
              placeholder="Book Title"
              value={newBookTitle}
              onChange={(e) => setNewBookTitle(e.target.value)}
              className="border border-gray-300 p-2 w-full mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Author"
              value={newBookAuthor}
              onChange={(e) => setNewBookAuthor(e.target.value)}
              className="border border-gray-300 p-2 w-full mb-4 rounded"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={closeModal} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button onClick={addBook} className="bg-blue-600 text-white px-4 py-2 rounded">
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Books Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white w-11/12 max-w-4xl p-6 rounded shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Search for Books</h3>
              <button 
                onClick={closeSearchModal}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <p className="mb-4 text-gray-600">
              Type a book title and Gemini will search for matching books with cover images.
            </p>
            <BookSearch onSelectBook={addBookFromSearch} />
          </div>
        </div>
      )}
    </div>
  )
}
