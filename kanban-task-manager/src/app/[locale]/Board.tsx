import cx from 'classix';
import { useTranslations } from 'next-intl';
import React from 'react';

import Typography from '@/components/Typography';
import { useKanbanStore, useModalStore } from '@/stores/newKanbanStore';

import Column from './Column';
import EmptyBoard from './EmptyBoard';

const Board: React.FC = () => {
  const { getCurrentColumns } = useKanbanStore();
  const columns = getCurrentColumns();

  const { openEditBoardAndAddNewColumn } = useModalStore();
  const t = useTranslations('Board');

  if (columns.length === 0) {
    return <EmptyBoard />;
  }

  return (
    <div className="flex gap-6 overflow-x-auto p-6">
      {columns.map((col, index) => (
        <Column
          className={cx('grow-0 shrink-0 w-[280px]')}
          columnId={col.id}
          key={`column-${col.name}`}
          name={col.name}
          index={index}
        />
      ))}
      <button
        type="button"
        className="mt-[38px] flex h-[80vh] w-[280px] shrink-0 items-center justify-center rounded-md bg-gray-300 hover:bg-gray-300/65"
        onClick={openEditBoardAndAddNewColumn}
      >
        <Typography variant="heading-xl" className="text-medium-grey">
          + {t('new_column')}
        </Typography>
      </button>
    </div>
  );
};

export default Board;
