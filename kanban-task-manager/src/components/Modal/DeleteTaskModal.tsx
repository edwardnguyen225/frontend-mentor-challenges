'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { useKanbanStore } from '@/stores/newKanbanStore';
import { getTaskById } from '@/stores/selector';
import type { Task } from '@/types/kanban';

import Button from '../Button';
import Typography from '../Typography';
import ModalWrapper from './ModalWrapper';

interface DeleteTaskModalProps {
  isOpen: boolean;
  closeModal: () => void;
  taskId?: Task['id'];
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({
  isOpen,
  closeModal,
  taskId = '',
}) => {
  const t = useTranslations('Board.delete_task_modal');

  const { removeTask } = useKanbanStore();
  const task = useKanbanStore((state) => getTaskById(state, taskId));

  const handleRemoveTask = () => {
    removeTask(taskId);
    closeModal();
  };

  return (
    <ModalWrapper isOpen={isOpen} closeModal={closeModal}>
      <div className="flex flex-col gap-6">
        <Typography variant="heading-lg">{t('title')}</Typography>
        <Typography variant="body-lg">
          {t('description', { title: task?.title })}
        </Typography>

        <div className="flex w-full gap-2">
          <Button
            type="button"
            size="S"
            variant="destructive"
            onClick={handleRemoveTask}
            className="grow"
          >
            {t('submit')}
          </Button>
          <Button
            type="button"
            size="S"
            variant="secondary"
            onClick={closeModal}
            className="grow"
          >
            {t('cancel')}
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default DeleteTaskModal;
