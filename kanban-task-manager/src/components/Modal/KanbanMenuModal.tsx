'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { useKanbanStore } from '@/stores/newKanbanStore';

import BoardList from '../Sidebar/BoardList';
import ThemeController from '../Sidebar/ThemeController';
import Typography from '../Typography';
import ModalWrapper from './ModalWrapper';

export interface KanbanMenuModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const KanbanMenuModal: React.FC<KanbanMenuModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const { boards } = useKanbanStore();
  const t = useTranslations('Board');

  const numberOfBoards = Object.keys(boards).length;

  return (
    <ModalWrapper
      isOpen={isOpen}
      closeModal={closeModal}
      shouldUseDefaultPadding={false}
      className="!w-[264px] py-4"
      rootClassName="!items-start mt-20"
    >
      <Typography variant="heading-sm" className="ml-8">
        {t('all_boards', { count: numberOfBoards })}
      </Typography>
      <BoardList />
      <ThemeController className="mx-6" />
    </ModalWrapper>
  );
};

export default KanbanMenuModal;
