export type Category = 'Strategy' | 'Personal' | 'Wellness' | 'Creative' | 'Work';
export type Screen = 'home' | 'tasks' | 'history' | 'settings';

export interface Task {
  id: string;
  title: string;
  description?: string;
  time?: string;
  date?: string;
  category: Category;
  completed: boolean;
  completedAt?: string;
  priority?: boolean;
}
