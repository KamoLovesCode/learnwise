export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  dates: string[]; // ISO date strings for when the task is scheduled
  totalTime: number; // in minutes
  completed: boolean;
  createdAt: string; // ISO date string
}
