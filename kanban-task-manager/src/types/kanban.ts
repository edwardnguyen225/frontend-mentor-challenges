export interface Subtask {
  title: string;
  isCompleted: boolean;
}

export interface Task {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

export interface TaskColumn {
  name: string;
  tasks: Task[];
}

export interface Board {
  name: string;
  columns: TaskColumn[];
}
