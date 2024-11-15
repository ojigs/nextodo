export interface Task {
  id: number;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  dueDate: number | null;
  completed: boolean;
  createdAt: number;
  completedAt: number | null;
}

export interface FormValues {
  newTask: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  dueDate: string | null;
}
