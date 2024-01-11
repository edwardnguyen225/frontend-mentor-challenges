/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';

interface Board {
  id: string;
  name: string;
  columnIds: string[];
}

interface Column {
  id: string;
  name: string;
  taskIds: string[];
}

interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: Column['name'];
  subtasks: Subtask[];
}

interface KanbanStore {
  boards: {
    [key: string]: Board;
  };
  currentBoardId: string | null;
  columns: {
    [key: string]: Column;
  };
  tasks: {
    [key: string]: Task;
  };

  openBoard: (boardId: string) => void;
  addBoard: (boardName: Board['name'], columns: Column['name'][]) => void;
  removeBoard: (boardId: string) => void;
  updateCurrentBoardName: (newName: string) => void;

  getCurrentColumns: () => Omit<Column, 'taskIds'>[];
  getCurrentColumnsWithTaskIds: () => Column[];
  updateCurrentColumns: (columns: { name: string; id?: string }[]) => void;

  getTasksByColumnId: (columnId: Column['id']) => Task[];
  addTask: (columnId: Column['id'], task: Omit<Task, 'id'>) => void;
  updateTask: (task: Task) => void;
  removeTask: (taskId: Task['id']) => void;

  // For testing purposes
  resetStore?: () => void;
}

export const useKanbanStore = create<KanbanStore>((set, get) => ({
  boards: {},
  currentBoardId: null,
  columns: {},
  tasks: {},

  openBoard: (boardId: string) => {
    set(
      produce((state: KanbanStore) => {
        const board = state.boards[boardId];
        if (board === undefined) {
          return;
        }

        state.currentBoardId = boardId;
      }),
    );
  },

  addBoard: (boardName, columns) => {
    const boardId = uuidv4();
    const columnIds = columns.map(() => uuidv4());
    const newBoard: Board = {
      id: boardId,
      name: boardName,
      columnIds,
    };

    set(
      produce((state) => {
        state.boards[boardId] = newBoard;
        state.currentBoardId = boardId;
        state.columns = columnIds.reduce(
          (acc, columnId, index) => {
            const newColumn: Column = {
              id: columnId,
              name: columns[index] as string,
              taskIds: [],
            };
            acc[columnId] = newColumn;
            return acc;
          },
          {} as KanbanStore['columns'],
        );
      }),
    );
  },
  removeBoard: (boardId) => {
    set(
      produce((state: KanbanStore) => {
        const boardToBeRemoved = state.boards[boardId];
        if (boardToBeRemoved === undefined) {
          return;
        }

        const columnIdsToBeRemoved = boardToBeRemoved.columnIds;
        const taskIdsToBeRemoved = columnIdsToBeRemoved.reduce(
          (acc: Task['id'][], columnId: Column['id']) => {
            const column = state.columns[columnId];
            if (column === undefined) {
              return acc;
            }

            const { taskIds } = column;
            return [...acc, ...taskIds];
          },
          [] as string[],
        );

        delete state.boards[boardId];
        columnIdsToBeRemoved.forEach((columnId) => {
          delete state.columns[columnId];
        });
        taskIdsToBeRemoved.forEach((taskId) => {
          delete state.tasks[taskId];
        });
      }),
    );
  },

  updateCurrentBoardName: (newName) => {
    set(
      produce((state: KanbanStore) => {
        const currentBoard = state.boards[state.currentBoardId as string];
        if (currentBoard === undefined) {
          return;
        }

        currentBoard.name = newName;
      }),
    );
  },

  getCurrentColumns: () => {
    return get()
      .getCurrentColumnsWithTaskIds()
      .map((column) => {
        // eslint-disable-next-line unused-imports/no-unused-vars
        const { taskIds, ...rest } = column;
        return rest;
      });
  },
  getCurrentColumnsWithTaskIds: () => {
    const currentBoard = get().boards[get().currentBoardId as string];
    if (currentBoard === undefined) {
      return [];
    }

    const { columnIds } = currentBoard;
    const columns: Column[] = [];
    columnIds.forEach((columnId) => {
      const column = get().columns[columnId];
      if (column) {
        columns.push(column);
      }
    });
    return columns;
  },
  updateCurrentColumns: (columns) => {
    // Remove columns in the board that are not in the new columns
    // Add columns in the new columns that are not in the board
    // Update the columns' names in the board if they are different
    set(
      produce((state: KanbanStore) => {
        const currentBoard = state.boards[state.currentBoardId as string];
        const currentColumns = state.columns;
        if (currentBoard === undefined) {
          return;
        }

        const currentColumnIds = currentBoard.columnIds;

        const newColumnIds = [];

        for (const column of columns) {
          const { id, name } = column;

          if (id === undefined) {
            // Add new columns
            const newColumnId = uuidv4();
            newColumnIds.push(newColumnId);
            currentColumns[newColumnId] = {
              id: newColumnId,
              name,
              taskIds: [],
            };
          } else if (currentColumnIds.includes(id)) {
            // Update existing columns
            newColumnIds.push(id);
            const columnInBoard = currentColumns[id];
            if (columnInBoard && columnInBoard.name !== name) {
              columnInBoard.name = name;
            }
          } else {
            delete currentColumns[id];
          }

          // Update the board's columnIds
          currentBoard.columnIds = newColumnIds;
        }
      }),
    );
  },

  getTasksByColumnId: (columnId) => {
    const column = get().columns[columnId];
    if (column === undefined) {
      return [];
    }

    const { taskIds } = column;
    const tasks: Task[] = [];
    taskIds.forEach((taskId) => {
      const task = get().tasks[taskId];
      if (task) {
        tasks.push(task);
      }
    });
    return tasks;
  },

  addTask: (columnId, task) => {
    const taskId = uuidv4();
    const newTask: Task = {
      id: taskId,
      ...task,
    };

    set(
      produce((state: KanbanStore) => {
        const currentBoard = state.boards[state.currentBoardId as string];
        if (currentBoard === undefined) {
          return;
        }

        const currentColumns = state.columns;

        const column = currentColumns[columnId as string];
        if (column === undefined) {
          return;
        }

        column.taskIds.push(taskId);
        state.tasks[taskId] = newTask;
      }),
    );
  },

  updateTask: (task) => {
    set(
      produce((state: KanbanStore) => {
        const currentTask = state.tasks[task.id];
        if (currentTask === undefined) {
          return;
        }

        state.tasks[task.id] = task;
      }),
    );
  },

  removeTask: (taskId) => {
    set(
      produce((state: KanbanStore) => {
        const currentTask = state.tasks[taskId];
        if (currentTask === undefined) {
          return;
        }

        const currentBoard = state.boards[state.currentBoardId as string];
        if (currentBoard === undefined) {
          return;
        }

        const currentColumnIds = currentBoard.columnIds;
        const currentColumns = state.columns;

        const columnId = currentColumnIds[0];
        const column = currentColumns[columnId as string];
        if (column === undefined) {
          return;
        }

        column.taskIds = column.taskIds.filter((id) => id !== taskId);
        delete state.tasks[taskId];
      }),
    );
  },

  resetStore: () => {
    set({
      boards: {},
      currentBoardId: null,
      columns: {},
      tasks: {},
    });
  },
}));
