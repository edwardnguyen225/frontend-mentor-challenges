'use client';

import Header from '@/components/Header';
import { MODAL_ROOT_ID } from '@/components/Modal';

import Board from './Board';
import BoardModal from './BoardModal';
import ViewTaskModal from './ViewTaskModal';

export default function Page() {
  return (
    <div id={MODAL_ROOT_ID} className="h-screen bg-light-grey">
      <Header />
      <Board />
      <BoardModal />
      <ViewTaskModal />
    </div>
  );
}
