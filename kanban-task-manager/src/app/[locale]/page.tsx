'use client';

import cx from 'classix';

import Header from '@/components/Header';
import { IconShowSidebar } from '@/components/Icons';
import ModalController from '@/components/Modal';
import Sidebar from '@/components/Sidebar/Sidebar';
import useSidebarStore from '@/stores/sidebarStore';

import Board from './Board';

export default function Page() {
  const { isSidebarShown, showSidebar } = useSidebarStore();

  return (
    <div className="relative grid h-screen grid-cols-5 bg-light-grey dark:bg-very-dark-grey-black">
      <Sidebar />
      <button
        type="button"
        onClick={showSidebar}
        aria-label="show sidebar"
        className={cx(
          'left-0 bottom-8 absolute',
          isSidebarShown ? 'hidden' : 'block',
          'w-14 h-12 flex items-center justify-center rounded-r-full z-10 bg-main-purple hover:bg-main-purple-light',
        )}
      >
        <IconShowSidebar />
      </button>
      <div className={cx(isSidebarShown ? 'col-span-4' : 'col-span-5')}>
        <Header />
        <Board />
      </div>
      <ModalController />
    </div>
  );
}
