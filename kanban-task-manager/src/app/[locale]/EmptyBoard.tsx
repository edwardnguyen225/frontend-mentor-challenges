import { useTranslations } from 'next-intl';
import React from 'react';

import { useBoardModalStore } from '@/stores/KanbanStore';

import Button from '../../components/Button';
import Typography from '../../components/Typography';

const EmptyBoard: React.FC = () => {
  const { openBoardModal } = useBoardModalStore();
  const t = useTranslations('Board');

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Typography variant="heading-lg" className="text-medium-grey">
        {t('empty_board_desc')}
      </Typography>
      <Button
        variant="primary"
        className="mt-8"
        size="L"
        onClick={openBoardModal}
      >
        {t('add_new_column')}
      </Button>
    </div>
  );
};

export default EmptyBoard;
