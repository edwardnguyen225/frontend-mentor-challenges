'use client';

import cx from 'classix';

import Header from '@/components/Header';
import ModalController from '@/components/Modal';
import Sidebar from '@/components/Sidebar/Sidebar';
import useSidebarStore from '@/stores/sidebarStore';

import Board from './Board';

export default function Page() {
  const { isSidebarShown } = useSidebarStore();

  return (
    <div className="relative grid h-screen grid-cols-5 bg-light-grey dark:bg-very-dark-grey-black">
      <Sidebar />
      <div className={cx(isSidebarShown ? 'col-span-4' : 'col-span-5')}>
        <Header />
        <Board />
      </div>
      <ModalController />
    </div>
  );
}
