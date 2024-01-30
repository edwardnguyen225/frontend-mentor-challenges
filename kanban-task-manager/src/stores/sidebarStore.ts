import { create } from 'zustand';

type SidebarStore = {
  isSidebarShown: boolean;
  showSidebar: () => void;
  hideSidebar: () => void;
};

const useSidebarStore = create<SidebarStore>((set) => ({
  isSidebarShown: true,
  showSidebar: () => set({ isSidebarShown: true }),
  hideSidebar: () => set({ isSidebarShown: false }),
}));

export default useSidebarStore;
