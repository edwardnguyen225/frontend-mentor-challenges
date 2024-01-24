import type { Column, Task } from '@/types/kanban';

import type { KanbanStore } from './newKanbanStore';

export const getTasksByColumnId = (
  state: KanbanStore,
  columnId: Column['id'],
): Task[] => {
  const column = state.columns[columnId];
  if (column === undefined) {
    return [];
  }

  const { taskIds } = column;
  const tasks: Task[] = [];
  taskIds.forEach((taskId) => {
    const task = state.tasks[taskId];
    if (task) {
      tasks.push(task);
    }
  });
  return tasks;
};

export const getTaskById = (
  state: KanbanStore,
  taskId: Task['id'],
): Task | undefined => {
  return state.tasks[taskId];
};
