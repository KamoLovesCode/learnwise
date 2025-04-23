import React, { useState } from "react"

interface Book {
  id: number
  title: string	
  author: string
}

export function Libary() { 
  const [books, setBooks] = useState<Book[]>([])
  const [newBookTitle, setNewBookTitle] = useState("")
  const [newBookAuthor, setNewBookAuthor] = useState("")

  const addBook = () => {
    if (newBookTitle.trim() && newBookAuthor.trim()) {
      const newBook: Book = {
        id: Date.now(),
        title: newBookTitle,
        author: newBookAuthor,
      }
      setBooks([...books, newBook])
      setNewBookTitle("")
      setNewBookAuthor("")
    }
  }

  const deleteBook = (id: number) => {
    setBooks(books.filter((book) => book.id !== id))
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Library</h1>
      <p>Manage your books below:</p>

      {/* Add Book Form */}
      <div className="my-4">
        <input
          type="text"
          placeholder="Book Title"
          value={newBookTitle}
          onChange={(e) => setNewBookTitle(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Author"
          value={newBookAuthor}
          onChange={(e) => setNewBookAuthor(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={addBook} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Book
        </button>
      </div>

      {/* Book List */}
      <ul className="list-disc pl-5">
        {books.map((book) => (
          <li key={book.id} className="flex justify-between items-center my-2">
            <span>
              <strong>{book.title}</strong> by {book.author}
            </span>
            <button
              onClick={() => deleteBook(book.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {books.length === 0 && <p>No books added yet.</p>}
    </div>
  )
}
