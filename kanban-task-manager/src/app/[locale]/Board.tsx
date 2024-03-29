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
    <div className="mt-6 flex h-board-on-mobile gap-6 overflow-x-auto pl-6 md:h-board-on-tablet lg:h-board-on-desktop">
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
        className={cx(
          'group',
          'h-new-column-mobile md:h-new-column-tablet xl:h-new-column-desktop w-[280px] ',
          'mt-[38px] flex shrink-0 items-center justify-center rounded-md ',
          'bg-new-column hover:bg-new-column-hover',
          'dark:bg-new-column-dark dark:hover:bg-new-column-dark-hover',
        )}
        onClick={openEditBoardAndAddNewColumn}
      >
        <Typography
          variant="heading-xl"
          className="text-medium-grey group-hover:text-main-purple"
        >
          + {t('new_column')}
        </Typography>
      </button>
    </div>
  );
};

export default Board;
