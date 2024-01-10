import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Dropdown from '@/components/Dropdown';
import Modal from '@/components/Modal';
import SubtaskCheckbox from '@/components/SubtaskCheckbox';
import Typography from '@/components/Typography';
import IconVerticalEllipsis from '@/public/assets/icon-vertical-ellipsis.svg';
import { useBoardStore } from '@/stores/KanbanStore';

const ViewTaskModal: React.FC = () => {
  const {
    columns,
    taskModal: { isOpen, closeTaskModal, openEditTaskModal, task, type },
  } = useBoardStore();

  const columnNames = columns.map((col) => col.name);

  const t = useTranslations('Board');

  if (!task) return null;

  const { subtasks } = task || {};

  const handleClickOutside = () => {
    // TODO: Validate the form data
    closeTaskModal();
  };

  const handleOpenEditTaskModal = () => {
    openEditTaskModal(task);
  };

  return (
    <Modal
      className="flex flex-col gap-6 overflow-visible p-8"
      onClose={handleClickOutside}
      isOpen={isOpen && type === 'view'}
    >
      <div className="flex w-full items-center justify-between">
        <Typography variant="heading-lg">{task?.title}</Typography>
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-light-grey"
          onClick={handleOpenEditTaskModal}
          aria-label="Open Board Settings"
        >
          <Image
            src={IconVerticalEllipsis}
            alt="Open Board Settings"
            width={5}
          />
        </button>
      </div>
      <Typography variant="body-lg" className="text-medium-grey">
        {task?.description}
      </Typography>
      {subtasks.length > 0 && (
        <div>
          <Typography variant="body-md" className="text-medium-grey">
            {t('subtasks_and_count', {
              count: subtasks.filter((subtask) => subtask.isCompleted).length,
              total: subtasks.length,
            })}
          </Typography>
          <ul className="mt-4 flex flex-col gap-2">
            {subtasks?.map((subtask, index) => (
              <SubtaskCheckbox
                key={`subtask-${uuidv4()}`}
                id={`subtask-${index}`}
                completed={subtask.isCompleted}
                onChange={() => {}}
              >
                {subtask.title}
              </SubtaskCheckbox>
            ))}
          </ul>
        </div>
      )}
      <Dropdown
        onChange={() => {}}
        label={t('current_status')}
        options={columnNames}
        defaultValue={task.status}
      />
    </Modal>
  );
};

export default ViewTaskModal;
