
export interface Textbook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  edition: string;
  coverImage: string;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  sections: Section[];
}

export interface Section {
  id: string;
  number: string;
  title: string;
}

export interface Summary {
  id: string;
  textbookId: string;
  chapterId: string;
  content: string;
}

export interface Question {
  id: string;
  textbookId: string;
  chapterId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
}

export interface StudySchedule {
  id: string;
  textbookId: string;
  userId: string;
  startDate: string;
  endDate: string;
  hoursPerWeek: number;
  sessions: StudySession[];
}

export interface StudySession {
  id: string;
  date: string;
  duration: number;
  chapterId: string;
  completed: boolean;
}

export interface Progress {
  userId: string;
  textbookId: string;
  chaptersProgress: ChapterProgress[];
  overallPercentage: number;
}

export interface ChapterProgress {
  chapterId: string;
  completed: boolean;
  percentageComplete: number;
  questionsAttempted: number;
  questionsCorrect: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
}
