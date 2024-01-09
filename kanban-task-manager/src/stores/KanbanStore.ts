import { create } from 'zustand';

import data from '@/public/data.json';
import type { Board } from '@/types/kanban';

const boards: Board[] = JSON.parse(JSON.stringify(data.boards));

interface BoardStore extends Board {
  setBoardName: (name: string) => void;
}

export const useBoardStore = create<BoardStore>()((set) => ({
  name: boards[0]?.name ?? '',
  columns: boards[0]?.columns ?? [],
  setBoardName: (name: string) => {
    set(() => ({ name }));
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
