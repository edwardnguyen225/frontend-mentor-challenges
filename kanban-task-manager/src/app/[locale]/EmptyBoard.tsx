import { useTranslations } from 'next-intl';
import React from 'react';

import { useModalStore } from '@/stores/newKanbanStore';

import Button from '../../components/Button';
import Typography from '../../components/Typography';

// TODO: Fix overflow
const EmptyBoard: React.FC = () => {
  const { openEditBoardAndAddNewColumn } = useModalStore();
  const t = useTranslations('Board');

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Typography variant="heading-lg" className="text-medium-grey">
        {t('empty_board_desc')}
      </Typography>
      <Button
        variant="primary"
        className="mt-8"
        size="L"
        onClick={openEditBoardAndAddNewColumn}
      >
        {t('add_new_column')}
      </Button>
    </div>
  );
};

export default EmptyBoard;
