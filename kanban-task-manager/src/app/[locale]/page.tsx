'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar/Sidebar';

import Board from './Board';

const MODAL_ROOT_ID = 'modal-root';

export default function Page() {
  return (
    <div
      id={MODAL_ROOT_ID}
      className="relative grid h-screen grid-cols-5 bg-light-grey dark:bg-very-dark-grey-black"
    >
      <Sidebar />
      <div className="col-span-4">
        <Header />
        <Board />
      </div>
    </div>
  );
}
