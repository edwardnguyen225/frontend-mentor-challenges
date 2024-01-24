/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';

import type {
  Board,
  Column,
  ModalState,
  ModalType,
  Task,
} from '@/types/kanban';

import { DUMMY_BOARD, DUMMY_COLUMNS, DUMMY_TASKS } from './dummyVariables';

export interface KanbanStore {
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

  getCurrentBoard: () => Board | undefined;
  openBoard: (boardId: string) => void;
  addBoard: (
    boardName: Board['name'],
    columns: Column['name'][],
  ) => {
    id: string;
  };
  removeBoard: (boardId: string) => void;
  updateCurrentBoardName: (newName: string) => void;

  getCurrentColumns: () => Omit<Column, 'taskIds'>[];
  getCurrentColumnsWithTaskIds: () => Column[];
  updateCurrentColumns: (columns: { name: string; id?: string }[]) => void;

  addTask: (
    task: Omit<Task, 'id' | 'subtasks'>,
    subtaskTitles: string[],
  ) => void;
  updateTask: (task: Task) => void;
  removeTask: (taskId: Task['id']) => void;

  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  isSidebarOpen: boolean;
  hideSidebar: () => void;
  showSidebar: () => void;

  // Modal related properties and methods
  modal: ModalState;
  openModal: (type: ModalType, props?: Record<string, any>) => void;
  closeModal: () => void;

  // For testing purposes
  resetStore?: () => void;
}

const INIT_STATE: Pick<
  KanbanStore,
  | 'boards'
  | 'currentBoardId'
  | 'columns'
  | 'tasks'
  | 'theme'
  | 'isSidebarOpen'
  | 'modal'
> = {
  boards: DUMMY_BOARD,
  currentBoardId: Object.keys(DUMMY_BOARD)[0] as string,
  columns: DUMMY_COLUMNS,
  tasks: DUMMY_TASKS,
  isSidebarOpen: true,
  theme: 'light',

  modal: {
    isOpen: false,
    type: null,
    props: null,
  },
};

/**
 * TODO: Add feature to persist data to local storage
 */
export const useKanbanStore = create<KanbanStore>((set, get) => ({
  ...INIT_STATE,

  getCurrentBoard: () => {
    return get().boards[get().currentBoardId as string];
  },

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

    return {
      id: boardId,
    };
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

        // If the current board is removed, open the first board
        if (state.currentBoardId === boardId) {
          let firstBoardId = Object.keys(state.boards)[0];
          // If there is no board left, create a new board
          if (firstBoardId === undefined) {
            firstBoardId = uuidv4();
            state.boards[uuidv4()] = {
              id: firstBoardId,
              name: 'New Board',
              columnIds: [],
            };
          }
          state.currentBoardId = firstBoardId;
        }
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

  addTask: (task, subtaskTitles) => {
    const taskId = uuidv4();
    const { columnId } = task;

    const newTask: Task = {
      ...task,
      id: taskId,
      subtasks: subtaskTitles.map((title) => ({
        id: uuidv4(),
        title,
        isCompleted: false,
      })),
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
        const previousColumnId = get().tasks[task.id]?.columnId;

        if (previousColumnId && previousColumnId !== task.columnId) {
          const previousColumn = get().columns[previousColumnId] as Column;
          const newColumn = get().columns[task.columnId] as Column;

          state.columns[previousColumn.id] = {
            ...previousColumn,
            taskIds: previousColumn.taskIds.filter((id) => id !== task.id),
          };
          state.columns[newColumn.id] = {
            ...newColumn,
            taskIds: [...newColumn.taskIds, task.id],
          };
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

  setTheme: (theme) => {
    const body = document.querySelector('body');
    if (body) {
      if (theme === 'dark') {
        body.classList.add('dark');
      } else {
        body.classList.remove('dark');
      }
    }

    set(
      produce((state: KanbanStore) => {
        state.theme = theme;
      }),
    );
  },

  hideSidebar: () => {
    set(
      produce((state: KanbanStore) => {
        state.isSidebarOpen = false;
      }),
    );
  },

  showSidebar: () => {
    set(
      produce((state: KanbanStore) => {
        state.isSidebarOpen = true;
      }),
    );
  },

  // Method to open a modal
  openModal: (type, props = {}) => {
    set(
      produce((state: KanbanStore) => {
        state.modal.isOpen = true;
        state.modal.type = type;
        state.modal.props = props;
      }),
    );
  },

  // Method to close a modal
  closeModal: () => {
    set(
      produce((state: KanbanStore) => {
        state.modal.isOpen = false;
        state.modal.type = null;
        state.modal.props = null;
      }),
    );
  },

  resetStore: () => {
    set(INIT_STATE);
  },
}));

export const useModalStore = () => {
  const { modal, openModal, closeModal } = useKanbanStore();

  const openAddBoardModal = () => {
    openModal('add-board');
  };

  const openEditBoardModal = () => {
    openModal('edit-board');
  };

  const openEditBoardAndAddNewColumn = () => {
    openModal('edit-board', { isAddingColumn: true });
  };

  const openDeleteBoardModal = () => {
    openModal('delete-board');
  };

  const openAddTaskModal = () => {
    openModal('add-task');
  };

  const openViewTaskModal = (taskId: string) => {
    openModal('view-task', { taskId });
  };

  const openEditTaskModal = (taskId: string) => {
    openModal('edit-task', { taskId });
  };

  const openDeleteTaskModal = (taskId: string) => {
    openModal('delete-task', { taskId });
  };

  return {
    modal,
    openAddBoardModal,
    openEditBoardModal,
    openDeleteBoardModal,

    openAddTaskModal,
    openViewTaskModal,
    openEditTaskModal,
    openDeleteTaskModal,

    openEditBoardAndAddNewColumn,

    closeModal,
  };
};
