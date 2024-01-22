'use client';

import Header from '@/components/Header';
import ModalController from '@/components/Modal';
import Sidebar from '@/components/Sidebar/Sidebar';

import Board from './Board';

export default function Page() {
  return (
    <div className="relative grid h-screen grid-cols-5 bg-light-grey dark:bg-very-dark-grey-black">
      <Sidebar />
      <div className="col-span-4">
        <Header />
        <Board />
      </div>
      <ModalController />
    </div>
  );
}
