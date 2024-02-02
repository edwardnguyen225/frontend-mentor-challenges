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

export const getCurrentColumns = (state: KanbanStore) => {
  const currentBoard = state.boards[state.currentBoardId as string];
  if (currentBoard === undefined) {
    return [];
  }

  const { columnIds } = currentBoard;
  const columns: Column[] = [];
  columnIds.forEach((columnId) => {
    const column = state.columns[columnId];
    if (column) {
      columns.push(column);
    }
  });
  return columns;
};

export const getCurrentColumnsWithoutTaskIds = (
  state: KanbanStore,
): Omit<Column, 'taskIds'>[] => {
  return getCurrentColumns(state).map((column) => {
    // eslint-disable-next-line unused-imports/no-unused-vars
    const { taskIds, ...rest } = column;
    return rest;
  });
};

export const getColumnById = (state: KanbanStore, columnId: Column['id']) => {
  return state.columns[columnId];
};
