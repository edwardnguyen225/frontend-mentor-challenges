import { z } from 'zod';

/**
 * @deprecated
 */
export interface TaskColumn {
  name: string;
  tasks: Task[];
}

export type ModalType =
  | 'kanban-menu'
  | 'add-board'
  | 'edit-board'
  | 'delete-board'
  | 'add-task'
  | 'edit-task'
  | 'delete-task'
  | 'view-task';

export interface ModalState {
  isOpen: boolean;
  type: ModalType | null;
  props: Record<string, any> | null;
}

export interface Board {
  id: string;
  name: string;
  columnIds: string[];
}

export interface Column {
  id: string;
  name: string;
  taskIds: string[];
}

export interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export const SubtaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  isCompleted: z.boolean(),
});

export const TaskStatusSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export interface Task {
  id: string;
  title: string;
  description: string;
  columnId: string;
  subtasks: Subtask[];
}
