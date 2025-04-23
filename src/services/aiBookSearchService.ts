// Google Books API integration for book search




// Mock data for demonstration purposes
const sampleBooks: BookSearchResult[] = [
  {
    id: "1",
    title: "Advanced Calculus: A Geometric View",
    author: "James J. Callahan",
    description: "With a fresh geometric approach that incorporates more than 250 illustrations, this textbook sets itself apart from all others in advanced calculus.",
    coverImage: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?q=80&w=2574&auto=format&fit=crop",
    publicationYear: "2010",
    genre: "Calculus",
    previewLink: "https://www.google.com/books/edition/Advanced_Calculus/BtdLZwEACAAJ",
    tableOfContents: [
      "Functions of One Variable",
      "Differentiation",
      "Integration",
      "Series",
      "Functions of Several Variables",
      "Vectors and Matrices",
      "Partial Differentiation"
    ]
  },
  {
    id: "2",
    title: "Linear Algebra and Its Applications",
    author: "Gilbert Strang",
    description: "Renowned professor and author Gilbert Strang demonstrates that linear algebra is a fascinating subject by showing both its beauty and value.",
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2680&auto=format&fit=crop",
    publicationYear: "2006",
    genre: "Linear Algebra",
    previewLink: "https://www.google.com/books/edition/Linear_Algebra_and_Its_Applications/e7FJJVsZBbEC",
    tableOfContents: [
      "Introduction to Vectors",
      "Solving Linear Equations",
      "Vector Spaces",
      "Orthogonality",
      "Determinants",
      "Eigenvalues and Eigenvectors"
    ]
  },
  {
    id: "3",
    title: "A First Course in Probability",
    author: "Sheldon Ross",
    description: "A comprehensive introduction to probability theory at an intermediate level of difficulty that emphasizes the theory and applications of probability theory.",
    coverImage: "https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5?q=80&w=2680&auto=format&fit=crop",
    publicationYear: "2019",
    genre: "Probability",
    previewLink: "https://www.google.com/books/edition/A_First_Course_in_Probability/kwZPvgAACAAJ",
    tableOfContents: [
      "Combinatorial Analysis",
      "Axioms of Probability",
      "Conditional Probability",
      "Random Variables",
      "Continuous Random Variables"
    ]
  }
];

// Mock function has been removed to avoid duplicate declaration with the actual implementation below
export interface BookSearchResult {
  id: string;
  title: string;
  author: string;
  coverImage?: string;
  description?: string;
  publicationYear?: string;
  genre?: string;
  publisher?: string;
  pageCount?: number;
  previewLink?: string;
  tableOfContents?: string[];
}

export type AIModel = 'gemini' | 'claude';

export interface SearchOptions {
  model: AIModel;
  includeCovers: boolean;
  maxResults?: number;
}

const DEFAULT_SEARCH_OPTIONS: SearchOptions = {
  model: 'gemini',
  includeCovers: true,
  maxResults: 10
};

// Interface for Google Books API response
interface GoogleBooksVolume {
  id: string;
  volumeInfo: {
    title: string;
    subtitle?: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    pageCount?: number;
    categories?: string[];
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
      small?: string;
      medium?: string;
      large?: string;
      extraLarge?: string;
    };
    previewLink?: string;
    tableOfContents?: string[] | string;
  };
}

interface GoogleBooksResponse {
  items?: GoogleBooksVolume[];
  totalItems: number;
  error?: {
    message: string;
  };
}

/**
 * Search for books using Google Books API
 */
async function searchGoogleBooks(query: string, maxResults: number = 10): Promise<GoogleBooksVolume[]> {
  console.log(`Searching Google Books for: "${query}"`);

  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=${maxResults}`;

  try {
    const response = await fetch(url);
    const data = await response.json() as GoogleBooksResponse;

    if (data.error) {
      console.error("Google Books API Error:", data.error.message);
      return [];
    }

    return data.items || [];
  } catch (error) {
    console.error("Error searching Google Books:", error);
    return [];
  }
}

/**
 * Convert Google Books volume data to our BookSearchResult format
 */
function convertGoogleBookToSearchResult(book: GoogleBooksVolume, includeCovers: boolean): BookSearchResult {
  // Get the best available cover image
  let coverImage = '';
  if (includeCovers && book.volumeInfo.imageLinks) {
    coverImage = book.volumeInfo.imageLinks.extraLarge || 
                 book.volumeInfo.imageLinks.large || 
                 book.volumeInfo.imageLinks.medium || 
                 book.volumeInfo.imageLinks.small || 
                 book.volumeInfo.imageLinks.thumbnail || 
                 book.volumeInfo.imageLinks.smallThumbnail || 
                 '';
  }

  // Extract year from published date (if available)
  let publicationYear: string | undefined;
  if (book.volumeInfo.publishedDate) {
    const dateMatch = book.volumeInfo.publishedDate.match(/^(\d{4})/);
    if (dateMatch) {
      publicationYear = dateMatch[1];
    }
  }

  // Get primary genre from categories if available
  const genre = book.volumeInfo.categories && book.volumeInfo.categories.length > 0 
    ? book.volumeInfo.categories[0] 
    : undefined;

  // Extract table of contents if available
  let tableOfContents: string[] | undefined;
  if (book.volumeInfo.tableOfContents) {
    if (Array.isArray(book.volumeInfo.tableOfContents)) {
      tableOfContents = book.volumeInfo.tableOfContents;
    } else if (typeof book.volumeInfo.tableOfContents === 'string') {
      tableOfContents = book.volumeInfo.tableOfContents
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
    }
  }

  return {
    id: book.id,
    title: book.volumeInfo.title,
    author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown',
    coverImage,
    description: book.volumeInfo.description,
    publicationYear,
    genre,
    publisher: book.volumeInfo.publisher,
    pageCount: book.volumeInfo.pageCount,
    previewLink: book.volumeInfo.previewLink,
    tableOfContents
  };
}

/**
 * Get book details for a specific volume ID
 */
export async function getBookDetails(bookId: string): Promise<BookSearchResult | null> {
  console.log(`Getting details for book ID: ${bookId}`);

  const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;

  try {
    const response = await fetch(url);
    const data = await response.json() as GoogleBooksVolume;

    if (!data || !data.volumeInfo) {
      console.error("No valid book data returned");
      return null;
    }

    return convertGoogleBookToSearchResult(data, true);
  } catch (error) {
    console.error("Error getting book details:", error);
    return null;
  }
}

/**
 * Search for books using Google Books API with AI categorization
 */
export const searchBooksWithAI = async (
  query: string, 
  options: Partial<SearchOptions> = {}
): Promise<BookSearchResult[]> => {
  const searchOptions: SearchOptions = { ...DEFAULT_SEARCH_OPTIONS, ...options };

  console.log(`Searching for "${query}" using ${searchOptions.model} model`);

  try {
    // Add "textbook" to queries when using textbook-focused model
    let searchQuery = query;
    if (searchOptions.model === 'gemini') {
      searchQuery = `${query} textbook`;
    }

    // Use the Google Books API to get actual book results
    const bookResults = await searchGoogleBooks(searchQuery, searchOptions.maxResults || 10);

    // Filter and process results based on the selected model
    let processedResults = bookResults;

    if (searchOptions.model === 'gemini') {
      // Filter for books more likely to be textbooks or educational
      processedResults = bookResults.filter(book => {
        const categories = book.volumeInfo.categories || [];
        const title = book.volumeInfo.title || "";
        const subtitle = book.volumeInfo.subtitle || "";

        // Look for indicators that this is a textbook
        return categories.some(cat => 
            cat.toLowerCase().includes("education") || 
            cat.toLowerCase().includes("textbook") ||
            cat.toLowerCase().includes("academic")) ||
          title.toLowerCase().includes("textbook") ||
          subtitle.toLowerCase().includes("textbook") ||
          title.toLowerCase().includes("introduction to") ||
          title.toLowerCase().includes("principles of") ||
          title.toLowerCase().includes("fundamentals of");
      });

      // If no textbooks found, fallback to original results
      if (processedResults.length === 0) {
        processedResults = bookResults;
      }
    } else if (searchOptions.model === 'claude') {
      // For Claude, prioritize books with more comprehensive data
      processedResults = bookResults.sort((a, b) => {
        const scoreA = (a.volumeInfo.description ? 2 : 0) + 
                      (a.volumeInfo.imageLinks ? 1 : 0) + 
                      (a.volumeInfo.categories?.length || 0);
        const scoreB = (b.volumeInfo.description ? 2 : 0) + 
                      (b.volumeInfo.imageLinks ? 1 : 0) + 
                      (b.volumeInfo.categories?.length || 0);
        return scoreB - scoreA;
      });
    }

    // Convert to our application's BookSearchResult format
    return processedResults.map(book => 
      convertGoogleBookToSearchResult(book, searchOptions.includeCovers)
    );
  } catch (error) {
    console.error("Error in book search:", error);
    throw new Error("Failed to search for books. Please try again.");
  }
};
