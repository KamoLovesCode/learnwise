import React, { useState, useEffect } from "react"
import { BookSearch } from "../components/BookSearch"
import { BookSearchResult } from "../services/aiBookSearchService"
import { BookOpen } from "lucide-react"
import { loadBooks, saveBooks } from '../interfaces/book'
import { Link } from "react-router-dom";

interface Book {
  id: number | string
  title: string
  author: string
  coverImage?: string
  contents?: string; // added contents property
}

export const LibraryPage = () => {
	const defaultBooks: Book[] = [
		{
			id: 1,
			title: "1984",
			author: "George Orwell",
			coverImage: "https://covers.openlibrary.org/b/id/7222246-L.jpg"
		},
		{
			id: 2,
			title: "To Kill a Mockingbird",
			author: "Harper Lee",
			coverImage: "https://covers.openlibrary.org/b/id/8226190-L.jpg"
		},
		{
			id: 3,
			title: "The Great Gatsby",
			author: "F. Scott Fitzgerald",
			coverImage: "https://covers.openlibrary.org/b/id/7432156-L.jpg"
		}
	];
	const [books, setBooks] = useState<Book[]>(defaultBooks);

	useEffect(() => {
		try {
			const loadedBooks: Book[] = loadBooks();
			// Merge or override default books as needed; here we simply replace them.
			if (loadedBooks.length) {
				setBooks(loadedBooks);
			}
		} catch {
			// fallback to defaultBooks if load fails
			setBooks(defaultBooks);
		}
	}, []);

	return (
		<div>
			{books.map((book) => (
				<div 
					key={book.id}
					style={{
						border: "1px solid #ccc",
						borderRadius: "8px",
						padding: "16px",
						margin: "8px"
					}}
				>
					<h2>{book.title}</h2>
					<p>{book.author}</p>
					{book.coverImage && (
						<img src={book.coverImage} alt={book.title} style={{ maxWidth: "100%" }}/>
					)}
					<Link 
						to={`/book/${book.id}`} 
						state={{ contents: book.contents }} // passing book contents
					>
						Open Table of Contents
					</Link>
				</div>
			))}
		</div>
	);
};
