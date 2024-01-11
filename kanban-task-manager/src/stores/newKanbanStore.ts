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
  addBoard: (boardName: Board['name'], columns: Column['name'][]) => void;
  removeBoard: (boardId: string) => void;

  // For testing purposes
  resetStore?: () => void;
}

export const useKanbanStore = create<KanbanStore>((set) => ({
  boards: {},
  currentBoardId: null,
  columns: {},
  tasks: {},
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
  resetStore: () => {
    set({
      boards: {},
      currentBoardId: null,
      columns: {},
      tasks: {},
    });
  },
}));
