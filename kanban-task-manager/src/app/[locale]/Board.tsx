import { useTranslations } from 'next-intl';
import React from 'react';

import Typography from '@/components/Typography';
import { useBoardModalStore, useBoardStore } from '@/stores/KanbanStore';

import Column from './Column';
import EmptyBoard from './EmptyBoard';

const Board: React.FC = () => {
  const { columns } = useBoardStore();
  const { openBoardModal } = useBoardModalStore();
  const t = useTranslations('Board');

  if (columns.length === 0) {
    return <EmptyBoard />;
  }

  return (
    <div className="flex gap-6 overflow-x-auto p-6">
      {columns.map((col) => (
        <Column key={`column-${col}`} name={col.name} tasks={col.tasks} />
      ))}
      <button
        type="button"
        className="mt-[38px] flex h-[80vh] w-[280px] shrink-0 items-center justify-center rounded-md bg-gray-300 hover:bg-gray-300/65"
        onClick={openBoardModal}
      >
        <Typography variant="heading-xl" className="text-medium-grey">
          + {t('new_column')}
        </Typography>
      </button>
    </div>
  );
};

export default Board;
