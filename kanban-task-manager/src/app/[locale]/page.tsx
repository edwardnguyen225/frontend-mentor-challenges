'use client';

import EmptyBoard from '@/components/EmptyBoard';
import Header from '@/components/Header';
import { MODAL_ROOT_ID } from '@/components/Modal';

export default function Page() {
  return (
    <div id={MODAL_ROOT_ID} className="h-screen bg-light-grey">
      <Header />
      {/* Add your page content here */}
      <EmptyBoard />
    </div>
  );
}
