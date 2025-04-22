
import { Textbook } from '../types';

export const mockTextbooks: Textbook[] = [
  {
    id: "calculus-stewart",
    title: "Calculus: Early Transcendentals",
    author: "James Stewart",
    isbn: "978-1285741550",
    edition: "8th",
    coverImage: "https://placehold.co/400x600/1a365d/FFF?text=Calculus",
    chapters: [
      {
        id: "chap-1",
        number: 1,
        title: "Functions and Limits",
        sections: [
          { id: "sec-1-1", number: "1.1", title: "Functions and Their Representations" },
          { id: "sec-1-2", number: "1.2", title: "Mathematical Models" },
          { id: "sec-1-3", number: "1.3", title: "Limits: A Numerical and Graphical Approach" },
          { id: "sec-1-4", number: "1.4", title: "Computing Limits" }
        ]
      },
      {
        id: "chap-2",
        number: 2,
        title: "Derivatives",
        sections: [
          { id: "sec-2-1", number: "2.1", title: "Derivatives and Rates of Change" },
          { id: "sec-2-2", number: "2.2", title: "The Derivative as a Function" },
          { id: "sec-2-3", number: "2.3", title: "Differentiation Rules" },
          { id: "sec-2-4", number: "2.4", title: "Derivatives of Trigonometric Functions" }
        ]
      },
      {
        id: "chap-3",
        number: 3,
        title: "Applications of Differentiation",
        sections: [
          { id: "sec-3-1", number: "3.1", title: "Maximum and Minimum Values" },
          { id: "sec-3-2", number: "3.2", title: "The Mean Value Theorem" },
          { id: "sec-3-3", number: "3.3", title: "Derivatives and the Shapes of Graphs" },
          { id: "sec-3-4", number: "3.4", title: "Optimization Problems" }
        ]
      }
    ]
  },
  {
    id: "linear-algebra-strang",
    title: "Introduction to Linear Algebra",
    author: "Gilbert Strang",
    isbn: "978-0980232776",
    edition: "5th",
    coverImage: "https://placehold.co/400x600/7c3aed/FFF?text=Linear+Algebra",
    chapters: [
      {
        id: "chap-1",
        number: 1,
        title: "Introduction to Vectors",
        sections: [
          { id: "sec-1-1", number: "1.1", title: "Vectors and Linear Combinations" },
          { id: "sec-1-2", number: "1.2", title: "Lengths and Dot Products" },
          { id: "sec-1-3", number: "1.3", title: "Matrices" }
        ]
      },
      {
        id: "chap-2",
        number: 2,
        title: "Solving Linear Equations",
        sections: [
          { id: "sec-2-1", number: "2.1", title: "Vectors and Linear Equations" },
          { id: "sec-2-2", number: "2.2", title: "The Idea of Elimination" },
          { id: "sec-2-3", number: "2.3", title: "Elimination Using Matrices" }
        ]
      },
      {
        id: "chap-3",
        number: 3,
        title: "Vector Spaces and Subspaces",
        sections: [
          { id: "sec-3-1", number: "3.1", title: "Spaces of Vectors" },
          { id: "sec-3-2", number: "3.2", title: "The Nullspace of A: Solving Ax = 0" },
          { id: "sec-3-3", number: "3.3", title: "The Complete Solution to Ax = b" }
        ]
      }
    ]
  },
  {
    id: "discrete-rosen",
    title: "Discrete Mathematics and Its Applications",
    author: "Kenneth H. Rosen",
    isbn: "978-0073383095",
    edition: "7th",
    coverImage: "https://placehold.co/400x600/0ea5e9/FFF?text=Discrete+Math",
    chapters: [
      {
        id: "chap-1",
        number: 1,
        title: "The Foundations: Logic and Proofs",
        sections: [
          { id: "sec-1-1", number: "1.1", title: "Propositional Logic" },
          { id: "sec-1-2", number: "1.2", title: "Propositional Equivalences" },
          { id: "sec-1-3", number: "1.3", title: "Predicates and Quantifiers" }
        ]
      },
      {
        id: "chap-2",
        number: 2,
        title: "Basic Structures",
        sections: [
          { id: "sec-2-1", number: "2.1", title: "Sets" },
          { id: "sec-2-2", number: "2.2", title: "Set Operations" },
          { id: "sec-2-3", number: "2.3", title: "Functions" }
        ]
      },
      {
        id: "chap-3",
        number: 3,
        title: "Algorithms",
        sections: [
          { id: "sec-3-1", number: "3.1", title: "Algorithms" },
          { id: "sec-3-2", number: "3.2", title: "The Growth of Functions" },
          { id: "sec-3-3", number: "3.3", title: "Complexity of Algorithms" }
        ]
      }
    ]
  }
];

export const getTextbookById = (id: string): Textbook | undefined => {
  return mockTextbooks.find(textbook => textbook.id === id);
};

export const searchTextbooks = (query: string): Textbook[] => {
  const lowerQuery = query.toLowerCase();
  return mockTextbooks.filter(textbook => 
    textbook.title.toLowerCase().includes(lowerQuery) || 
    textbook.author.toLowerCase().includes(lowerQuery)
  );
};
