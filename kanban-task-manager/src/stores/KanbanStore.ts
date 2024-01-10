import { create } from 'zustand';

import data from '@/public/data.json';
import type { Board, Task } from '@/types/kanban';

const boards: Board[] = JSON.parse(JSON.stringify(data.boards));

interface TaskModalStore {
  isOpen: boolean;
  task: Task | null;
  type: 'view' | 'edit' | 'create' | 'delete' | null;
  openViewTaskModal: (task: Task) => void;
  openEditTaskModal: (task: Task) => void;
  openCreateTaskModal: () => void;
  openDeleteTaskModal: (task: Task) => void;
  closeTaskModal: () => void;
}

interface BoardStore extends Board {
  setBoardName: (name: string) => void;
  taskModal: TaskModalStore;
}

export const useBoardStore = create<BoardStore>()((set) => ({
  name: boards[0]?.name ?? '',
  columns: boards[0]?.columns ?? [],
  setBoardName: (name: string) => {
    set(() => ({ name }));
  },
  taskModal: {
    isOpen: false,
    task: null,
    type: null,
    openViewTaskModal: (task: Task) =>
      set((state: BoardStore) => ({ ...state, task, type: 'view' })),
    openEditTaskModal: (task: Task) =>
      set((state: BoardStore) => ({ ...state, task, type: 'edit' })),
    openCreateTaskModal: () =>
      set((state: BoardStore) => ({ ...state, task: null, type: 'create' })),
    openDeleteTaskModal: (task: Task) =>
      set((state: BoardStore) => ({ ...state, task, type: 'delete' })),
    closeTaskModal: () =>
      set((state: BoardStore) => ({ ...state, task: null, type: null })),
  },
}));

interface BoardModalStore {
  isOpen: boolean;
  openBoardModal: () => void;
  closeBoardModal: () => void;
}
export const useBoardModalStore = create<BoardModalStore>((set) => ({
  isOpen: false,
  openBoardModal: () => set(() => ({ isOpen: true })),
  closeBoardModal: () => set(() => ({ isOpen: false })),
}));
