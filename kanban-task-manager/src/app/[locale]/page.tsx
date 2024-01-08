'use client';

import EmptyBoard from '@/components/EmptyBoard';
import Header from '@/components/Header';

export default function Page() {
  return (
    <div className="h-screen bg-light-grey">
      <Header />
      {/* Add your page content here */}
      <EmptyBoard />
    </div>
  );
}
