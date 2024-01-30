'use client';

import { Menu, Transition } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import cx from 'classix';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React, { Fragment, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import type { ZodType } from 'zod';
import { z } from 'zod';

import IconVerticalEllipsis from '@/public/assets/icon-vertical-ellipsis.svg';
import { useKanbanStore, useModalStore } from '@/stores/newKanbanStore';
import { getTaskById } from '@/stores/selector';
import type { Column, Subtask, Task } from '@/types/kanban';
import { SubtaskSchema, TaskStatusSchema } from '@/types/kanban';

import Dropdown from '../Dropdown';
import SubtaskCheckbox from '../SubtaskCheckbox';
import Typography from '../Typography';
import ModalWrapper from './ModalWrapper';

const TaskMenu: React.FC<{ taskId: Task['id'] }> = ({ taskId }) => {
  const t = useTranslations('Board.view_task_modal.menu');
  const { openEditTaskModal, openDeleteTaskModal } = useModalStore();

  return (
    <div>
      <Menu>
        <Menu.Button
          type="button"
          className={cx(
            'flex h-12 w-12 items-center justify-center rounded-full hover:bg-light-grey',
            'dark:hover:bg-lines-dark',
          )}
          aria-label="Open Board Settings"
        >
          <Image
            src={IconVerticalEllipsis}
            alt="Open Board Settings"
            width={5}
          />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={cx(
              'absolute -right-14 md:-right-24 mt-2 mr-4 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none',
              'dark:bg-dark-grey dark:divide-lines-dark',
              'z-10',
            )}
          >
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={cx(
                    active && 'bg-main-purple',
                    'group flex w-full items-center rounded-md p-2 text-sm',
                  )}
                  onClick={() => openEditTaskModal(taskId)}
                >
                  <Typography
                    variant="body-lg"
                    className="text-medium-grey group-hover:text-white"
                  >
                    {t('edit_task')}
                  </Typography>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={cx(
                    active && 'bg-red',
                    'group flex w-full items-center rounded-md p-2 text-sm',
                  )}
                  onClick={() => openDeleteTaskModal(taskId)}
                >
                  <Typography
                    variant="body-lg"
                    className="text-red group-hover:text-white"
                  >
                    {t('delete_task')}
                  </Typography>
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

interface ViewTaskForm {
  subtasks: Subtask[];
  status: {
    id: Column['id'];
    name: Column['name'];
  };
}

const viewTaskSchema: ZodType<ViewTaskForm> = z.object({
  subtasks: SubtaskSchema.array(),
  status: TaskStatusSchema,
});

export interface ViewTaskModalProps {
  isOpen: boolean;
  closeModal: () => void;
  taskId?: Task['id'];
}

const ViewTaskModal: React.FC<ViewTaskModalProps> = ({
  isOpen,
  closeModal,
  taskId = '',
}) => {
  const t = useTranslations('Board');

  const { getCurrentColumns, updateTask } = useKanbanStore();
  const task = useKanbanStore((state) => getTaskById(state, taskId));
  const columns = getCurrentColumns();

  const { control, getValues, setValue, reset } = useForm<ViewTaskForm>({
    resolver: zodResolver(viewTaskSchema),
  });

  useEffect(() => {
    const taskStatus = columns.find((column) => column.id === task?.columnId);

    reset({
      subtasks: task?.subtasks ?? [],
      status: taskStatus,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task, isOpen]);

  const saveAndCloseModal = () => {
    if (!task) return;

    const updatedTask: Task = {
      ...task,
      subtasks: getValues('subtasks'),
      columnId: getValues('status').id,
    };
    updateTask(updatedTask);
    closeModal();
  };

  if (!task) return null;

  const numberOfCompletedSubtasks = task.subtasks.filter(
    (subtask) => subtask.isCompleted,
  ).length;

  const handleToggleSubtask = (subtaskId: Subtask['id']) => {
    const subtasks = getValues('subtasks');

    for (const subtask of subtasks) {
      if (subtask.id === subtaskId) {
        subtask.isCompleted = !subtask.isCompleted;
        break;
      }
    }
    setValue('subtasks', subtasks);
  };

  return (
    <ModalWrapper isOpen={isOpen} closeModal={saveAndCloseModal}>
      <div className="relative flex flex-col gap-6">
        <div className="flex justify-between">
          <Typography variant="heading-lg">{task.title}</Typography>
          <TaskMenu taskId={taskId} />
        </div>

        {task.description !== '' && (
          <Typography variant="body-lg" className="text-medium-grey">
            {task.description}
          </Typography>
        )}

        {task.subtasks.length > 0 && (
          <div className="flex flex-col gap-2">
            <Typography variant="body-md" className="text-medium-grey">
              {t('view_task_modal.subtasks', {
                count: numberOfCompletedSubtasks,
                total: task.subtasks.length,
              })}
            </Typography>

            <Controller
              name="subtasks"
              control={control}
              render={({ field: { value } }) => (
                <div className="flex max-h-48 flex-col gap-2 overflow-y-auto">
                  {value.map((subtask) => (
                    <SubtaskCheckbox
                      key={`subtask-${subtask.id}`}
                      id={subtask.id}
                      completed={subtask.isCompleted}
                      onChange={() => handleToggleSubtask(subtask.id)}
                    >
                      <Typography
                        variant="body-md"
                        className={cx(
                          'cursor-pointer',
                          subtask.isCompleted
                            ? 'text-black/50 line-through dark:text-white/50'
                            : 'text-black dark:text-white',
                        )}
                      >
                        {subtask.title}
                      </Typography>
                    </SubtaskCheckbox>
                  ))}
                </div>
              )}
            />
          </div>
        )}

        <Controller
          name="status"
          control={control}
          defaultValue={columns[0]}
          render={({ field: { onChange, value } }) => (
            <Dropdown
              label={t('view_task_modal.current_status')}
              options={columns}
              selectedOption={value}
              setSelectedOption={onChange}
            />
          )}
        />
      </div>
    </ModalWrapper>
  );
};

export default ViewTaskModal;
