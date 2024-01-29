import cx from 'classix';
import { useTranslations } from 'next-intl';
import React, { useCallback } from 'react';

import { useKanbanStore, useModalStore } from '@/stores/newKanbanStore';

import { IconBoard } from '../Icons';
import Typography from '../Typography';

interface BoardItemProps {
  id: string;
  name: string;
}
const BoardItem: React.FC<BoardItemProps> = ({ id, name }) => {
  const { currentBoardId, openBoard } = useKanbanStore();
  const isActive = currentBoardId === id;

  const handleOpenBoard = useCallback(() => {
    openBoard(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <button
      type="button"
      className={cx(
        'group flex h-12 items-center px-8 rounded-r-full gap-4',
        isActive
          ? 'bg-main-purple hover:bg-main-purple-light'
          : 'hover:bg-main-purple/10',
      )}
      style={{
        width: 'calc(100% - 24px)',
      }}
      onClick={handleOpenBoard}
    >
      <IconBoard className={cx(isActive ? 'fill-white' : 'fill-medium-grey')} />
      <Typography
        variant="heading-md"
        className={cx(
          'text-left',
          isActive
            ? 'text-white'
            : 'text-medium-grey group-hover:text-main-purple',
        )}
      >
        {name}
      </Typography>
    </button>
  );
};

const ButtonCreateBoard: React.FC = () => {
  const { openAddBoardModal } = useModalStore();
  const t = useTranslations('Board');

  return (
    <button
      type="button"
      className="flex h-12 items-center gap-4 rounded-r-full px-8 hover:bg-main-purple/20"
      style={{
        width: 'calc(100% - 24px)',
      }}
      onClick={openAddBoardModal}
    >
      <IconBoard className="fill-main-purple" />
      <Typography
        variant="heading-md"
        className="text-left text-main-purple dark:text-main-purple"
      >
        {t('create_new_board')}
      </Typography>
    </button>
  );
};
const BoardList: React.FC = () => {
  const { boards } = useKanbanStore();

  return (
    <ul className="mt-5">
      {Object.entries(boards).map(([id, board]) => (
        <li key={`board-${id}`}>
          <BoardItem id={id} name={board.name} />
        </li>
      ))}
      <li>
        <ButtonCreateBoard />
      </li>
    </ul>
  );
};

export default BoardList;
