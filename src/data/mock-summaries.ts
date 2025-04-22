
import { Summary } from '../types';

export const mockSummaries: Summary[] = [
  {
    id: "summary-calculus-chap1",
    textbookId: "calculus-stewart",
    chapterId: "chap-1",
    content: `
# Chapter 1: Functions and Limits

## Key Concepts
- **Functions**: A function is a rule that assigns to each element in a domain exactly one element in the range.
- **Limits**: The limit of a function describes the behavior of the function as the input approaches a particular value.
- **Continuity**: A function is continuous at a point if the limit at that point equals the function value.

## Important Formulas
1. **Limit Laws**:
   - Sum Law: lim[x→a] [f(x) + g(x)] = lim[x→a] f(x) + lim[x→a] g(x)
   - Product Law: lim[x→a] [f(x) × g(x)] = lim[x→a] f(x) × lim[x→a] g(x)
   - Quotient Law: lim[x→a] [f(x)/g(x)] = lim[x→a] f(x) / lim[x→a] g(x), if lim[x→a] g(x) ≠ 0

2. **Continuity Test**: A function f is continuous at x = a if:
   - f(a) is defined
   - lim[x→a] f(x) exists
   - lim[x→a] f(x) = f(a)

## Common Functions and Their Properties
- **Linear Functions**: f(x) = mx + b, continuous everywhere
- **Polynomial Functions**: continuous everywhere
- **Rational Functions**: continuous except where denominator is zero
- **Trigonometric Functions**: sine and cosine are continuous everywhere
    `
  },
  {
    id: "summary-calculus-chap2",
    textbookId: "calculus-stewart",
    chapterId: "chap-2",
    content: `
# Chapter 2: Derivatives

## Key Concepts
- **Derivative**: The derivative of a function represents the rate of change or slope of the function at a particular point.
- **Differentiation**: The process of finding the derivative of a function.
- **Rate of Change**: The derivative as a measure of how quickly a function is changing.

## Important Formulas
1. **Definition of Derivative**:
   f'(x) = lim[h→0] [f(x+h) - f(x)]/h

2. **Basic Differentiation Rules**:
   - Constant Rule: d/dx[c] = 0
   - Power Rule: d/dx[x^n] = n·x^(n-1)
   - Sum Rule: d/dx[f(x) + g(x)] = f'(x) + g'(x)
   - Product Rule: d/dx[f(x)·g(x)] = f'(x)·g(x) + f(x)·g'(x)
   - Quotient Rule: d/dx[f(x)/g(x)] = [f'(x)·g(x) - f(x)·g'(x)]/[g(x)]²
   - Chain Rule: d/dx[f(g(x))] = f'(g(x))·g'(x)

3. **Derivatives of Trigonometric Functions**:
   - d/dx[sin(x)] = cos(x)
   - d/dx[cos(x)] = -sin(x)
   - d/dx[tan(x)] = sec²(x)

## Applications
- Finding the slope of a tangent line
- Calculating rate of change in physical problems
- Analyzing motion (velocity and acceleration)
    `
  },
  {
    id: "summary-linear-chap1",
    textbookId: "linear-algebra-strang",
    chapterId: "chap-1",
    content: `
# Chapter 1: Introduction to Vectors

## Key Concepts
- **Vectors**: Quantities with both magnitude and direction, represented as n-tuples.
- **Linear Combinations**: Combining vectors using scalar multiplication and addition.
- **Dot Product**: A scalar quantity obtained by multiplying corresponding components of two vectors.

## Important Formulas
1. **Vector Operations**:
   - Addition: u + v = (u₁+v₁, u₂+v₂, ..., uₙ+vₙ)
   - Scalar Multiplication: c·v = (c·v₁, c·v₂, ..., c·vₙ)
   - Dot Product: u·v = u₁v₁ + u₂v₂ + ... + uₙvₙ

2. **Vector Length/Norm**:
   ||v|| = √(v₁² + v₂² + ... + vₙ²)

3. **Distance Between Vectors**:
   d(u,v) = ||u-v||

## Key Theorems
- The dot product of orthogonal (perpendicular) vectors is zero
- The Cauchy-Schwarz inequality: |u·v| ≤ ||u||·||v||
- Triangle inequality: ||u + v|| ≤ ||u|| + ||v||

## Applications
- Representing physical quantities like force and velocity
- Computing projections of one vector onto another
- Determining the angle between vectors
    `
  }
];

export const getSummaryByChapter = (textbookId: string, chapterId: string): Summary | undefined => {
  return mockSummaries.find(
    summary => summary.textbookId === textbookId && summary.chapterId === chapterId
  );
};
