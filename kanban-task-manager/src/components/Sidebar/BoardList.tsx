import cx from 'classix';
import { useTranslations } from 'next-intl';
import React, { useCallback } from 'react';

import { useBoardModalStore } from '@/stores/KanbanStore';
import { useKanbanStore } from '@/stores/newKanbanStore';

import Typography from '../Typography';

const IconBoard: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      width="16"
      height="16"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
    </svg>
  );
};

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
        'flex h-12 items-center px-8 rounded-r-full gap-4',
        isActive
          ? 'bg-main-purple hover:bg-main-purple-light'
          : 'hover:bg-light-grey',
      )}
      style={{
        width: 'calc(100% - 24px)',
      }}
      onClick={handleOpenBoard}
    >
      <IconBoard className={cx(isActive ? 'fill-white' : 'fill-medium-grey')} />
      <Typography
        variant="heading-md"
        className={cx(isActive ? 'text-white' : 'text-medium-grey')}
      >
        {name}
      </Typography>
    </button>
  );
};

const ButtonCreateBoard: React.FC = () => {
  const { openBoardModal } = useBoardModalStore();
  const t = useTranslations('Board');

  return (
    <button
      type="button"
      className="flex h-12 items-center gap-4 rounded-r-full px-8 hover:bg-main-purple/20"
      style={{
        width: 'calc(100% - 24px)',
      }}
      onClick={openBoardModal}
    >
      <IconBoard className="fill-main-purple" />
      <Typography
        variant="heading-md"
        className="text-main-purple dark:text-main-purple"
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
