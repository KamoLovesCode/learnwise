
import { Question } from '../types';

export const mockQuestions: Question[] = [
  // Calculus Chapter 1 Questions
  {
    id: "q-calc-1-1",
    textbookId: "calculus-stewart",
    chapterId: "chap-1",
    difficulty: "easy",
    question: "Find the limit: lim(x→2) (x² - 4)/(x - 2)",
    answer: "4",
    explanation: "We can rewrite the expression as (x - 2)(x + 2)/(x - 2) = x + 2 for x ≠ 2. As x approaches 2, this becomes 2 + 2 = 4."
  },
  {
    id: "q-calc-1-2",
    textbookId: "calculus-stewart",
    chapterId: "chap-1",
    difficulty: "medium",
    question: "Determine if the function f(x) = |x|/x is continuous at x = 0.",
    options: ["Yes, it is continuous", "No, it is not continuous", "It's continuous from the right only", "It's continuous from the left only"],
    answer: "No, it is not continuous",
    explanation: "The function f(x) = |x|/x equals 1 when x > 0 and -1 when x < 0. Since the limit from the left and right are different at x = 0, the function is not continuous at x = 0."
  },
  {
    id: "q-calc-1-3",
    textbookId: "calculus-stewart",
    chapterId: "chap-1",
    difficulty: "hard",
    question: "Find the limit: lim(x→0) (sin(3x)/x)",
    answer: "3",
    explanation: "Using the limit lim(x→0) sin(x)/x = 1, we can rewrite this as lim(x→0) (sin(3x)/3x) × 3. The first term equals 1 by the standard limit, so the answer is 1 × 3 = 3."
  },
  
  // Calculus Chapter 2 Questions
  {
    id: "q-calc-2-1",
    textbookId: "calculus-stewart",
    chapterId: "chap-2",
    difficulty: "easy",
    question: "Find the derivative of f(x) = 3x² - 2x + 1",
    answer: "f'(x) = 6x - 2",
    explanation: "Using the power rule and linearity of the derivative: f'(x) = 3·2x - 2·1 + 0 = 6x - 2."
  },
  {
    id: "q-calc-2-2",
    textbookId: "calculus-stewart",
    chapterId: "chap-2",
    difficulty: "medium",
    question: "Calculate the derivative of f(x) = x·sin(x)",
    options: ["f'(x) = sin(x)", "f'(x) = sin(x) + x·cos(x)", "f'(x) = cos(x)", "f'(x) = x·cos(x)"],
    answer: "f'(x) = sin(x) + x·cos(x)",
    explanation: "Using the product rule: f'(x) = 1·sin(x) + x·cos(x) = sin(x) + x·cos(x)."
  },
  {
    id: "q-calc-2-3",
    textbookId: "calculus-stewart",
    chapterId: "chap-2",
    difficulty: "hard",
    question: "Find the derivative of f(x) = (x²+1)/(x-1)",
    answer: "f'(x) = (x² + 2x - 1)/(x-1)²",
    explanation: "Using the quotient rule: f'(x) = [(2x)(x-1) - (x²+1)(1)]/[(x-1)²] = [2x² - 2x - x² - 1]/[(x-1)²] = (x² + 2x - 1)/(x-1)²."
  },
  
  // Linear Algebra Chapter 1 Questions
  {
    id: "q-linear-1-1",
    textbookId: "linear-algebra-strang",
    chapterId: "chap-1",
    difficulty: "easy",
    question: "What is the dot product of vectors u = [1, 2, 3] and v = [4, 5, 6]?",
    options: ["32", "14", "38", "42"],
    answer: "32",
    explanation: "Dot product is calculated as u·v = u₁v₁ + u₂v₂ + u₃v₃ = 1·4 + 2·5 + 3·6 = 4 + 10 + 18 = 32."
  },
  {
    id: "q-linear-1-2",
    textbookId: "linear-algebra-strang",
    chapterId: "chap-1",
    difficulty: "medium",
    question: "Find the length of the vector v = [3, 4, 12]",
    answer: "13",
    explanation: "The length of a vector is ||v|| = √(v₁² + v₂² + v₃²) = √(3² + 4² + 12²) = √(9 + 16 + 144) = √169 = 13."
  },
  {
    id: "q-linear-1-3",
    textbookId: "linear-algebra-strang",
    chapterId: "chap-1",
    difficulty: "hard",
    question: "Determine if the vectors u = [1, 2, 3] and v = [6, -3, 0] are orthogonal.",
    options: ["Yes", "No"],
    answer: "Yes",
    explanation: "Two vectors are orthogonal if their dot product is zero. u·v = 1·6 + 2·(-3) + 3·0 = 6 - 6 + 0 = 0. Since the dot product is 0, the vectors are orthogonal."
  }
];

export const getQuestionsByChapter = (textbookId: string, chapterId: string, difficulty?: 'easy' | 'medium' | 'hard'): Question[] => {
  return mockQuestions.filter(question => 
    question.textbookId === textbookId && 
    question.chapterId === chapterId &&
    (difficulty ? question.difficulty === difficulty : true)
  );
};
