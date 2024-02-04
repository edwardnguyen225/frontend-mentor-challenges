'use client';

import cx from 'classix';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import ModalController from '@/components/Modal';
import { ShowSidebarButton } from '@/components/Sidebar';
import Sidebar from '@/components/Sidebar/Sidebar';
import { useScreenWidth } from '@/hooks/screen';
import { useModalStore } from '@/stores/newKanbanStore';
import useSidebarStore from '@/stores/sidebarStore';

import Board from './Board';

const Header = dynamic(() => import('@/components/Header'), { ssr: false });

export default function Page() {
  const { isSidebarShown, hideSidebar, showSidebar } = useSidebarStore();
  const { screenType } = useScreenWidth();

  const { modal, closeModal } = useModalStore();

  useEffect(() => {
    if (screenType === 'mobile') {
      hideSidebar();
    } else if (screenType === 'tablet') {
      showSidebar();
    }

    if (modal.type === 'kanban-menu') {
      closeModal();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenType]);

  return (
    <div className="relative flex h-screen bg-light-grey dark:bg-very-dark-grey-black">
      <Sidebar
        className={cx(
          'w-[260px] max-w=[260px] flex-auto flex-grow-0 xl:w-[300px] flex-shrink-0 transition-all',
          isSidebarShown ? 'translate-x-0' : '-translate-x-full',
        )}
      />
      <ShowSidebarButton />
      <div
        className={cx(
          'flex-auto transition-all w-main-on-tablet lg:w-main-on-desktop',
          isSidebarShown ? 'ml-0' : '',
        )}
      >
        <Header />
        <Board />
      </div>
      <ModalController />
    </div>
  );
}
