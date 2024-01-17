'use client';

import Header from '@/components/Header';
import { MODAL_ROOT_ID } from '@/components/Modal';
import Sidebar from '@/components/Sidebar/Sidebar';

import Board from './Board';
import BoardModal from './BoardModal';
import ViewTaskModal from './ViewTaskModal';

export default function Page() {
  return (
    <div
      id={MODAL_ROOT_ID}
      className="relative grid min-h-screen grid-cols-5 bg-light-grey dark:bg-very-dark-grey-black"
    >
      <Sidebar />
      <div className="col-span-4 h-full ">
        <Header />
        <Board />
      </div>
      <BoardModal />
      <ViewTaskModal />
    </div>
  );
}
