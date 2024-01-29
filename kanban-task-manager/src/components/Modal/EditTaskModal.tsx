import { zodResolver } from '@hookform/resolvers/zod';
import cx from 'classix';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import { useKanbanStore } from '@/stores/newKanbanStore';
import {
  getColumnById,
  getCurrentColumnsWithoutTaskIds,
  getTaskById,
} from '@/stores/selector';
import { SubtaskSchema, type Task } from '@/types/kanban';

import Button from '../Button';
import Dropdown from '../Dropdown';
import { IconCross } from '../Icons';
import TextAreaField from '../TextAreaField';
import TextField from '../TextField';
import Typography, { typographyStyles } from '../Typography';
import ModalWrapper from './ModalWrapper';

interface EditTaskModalProps {
  isOpen: boolean;
  closeModal: () => void;
  taskId?: Task['id'];
}

const TaskFormSchema = (t: (arg: string) => string) =>
  z.object({
    title: z.string({
      required_error: t('errors.required_error'),
    }),
    description: z.string().optional(),
    subtasks: SubtaskSchema.array().optional(),
    status: z.object({
      id: z.string(),
      name: z.string(),
    }),
  });

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  closeModal,
  taskId,
}) => {
  const t = useTranslations('Board');

  const { updateTask } = useKanbanStore();
  const task = useKanbanStore((state) => getTaskById(state, taskId ?? ''));
  const taskColumn = useKanbanStore((state) =>
    getColumnById(state, task?.columnId ?? ''),
  );
  const columns = useKanbanStore((state) =>
    getCurrentColumnsWithoutTaskIds(state),
  );
  const formSchema = TaskFormSchema(t);

  const initFormData = useMemo(
    () => ({
      title: task?.title ?? '',
      description: task?.description ?? '',
      subtasks: task?.subtasks ?? [],
      status: {
        id: taskColumn?.id ?? '',
        name: taskColumn?.name ?? '',
      },
    }),
    [
      task?.description,
      task?.subtasks,
      task?.title,
      taskColumn?.id,
      taskColumn?.name,
    ],
  );
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    return () => {
      reset(initFormData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId, isOpen]);

  const { fields, append, remove } = useFieldArray({
    name: 'subtasks' as never,
    control,
  });
  const handleAddNewSubtask = () => {
    append({ id: uuidv4(), title: '', isCompleted: false });
  };
  const handleRemoveSubtask = (index: number) => {
    remove(index);
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Step 1. Validate task's title
    if (values.title.trim() === '') {
      setError('title', {
        type: 'required',
        message: t('errors.required_error'),
      });
    }

    // Step 2. Validate subtask
    const hasEmptySubtask = values.subtasks?.some(
      ({ title }) => title.trim() === '',
    );
    if (hasEmptySubtask) {
      setError('subtasks', {
        type: 'manual',
        message: t('errors.has_empty_subtask'),
      });
    }

    const hasAnyError = errors.title || errors.subtasks;
    if (hasAnyError) return;

    const updatedTask: Task = {
      ...(task as Task),
      title: values.title,
      description: values.description ?? '',
      columnId: values.status.id,
      subtasks: values.subtasks ?? [],
    };
    updateTask(updatedTask);
    closeModal();
  };

  return (
    <ModalWrapper isOpen={isOpen} closeModal={closeModal}>
      <div className="flex flex-col gap-6">
        <Typography variant="heading-lg">
          {t('add_task_modal.modal_title')}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <TextField
            control={control as any}
            name="title"
            rules={{ required: true }}
            label={t('add_task_modal.title')}
            placeholder={t('add_task_modal.title_placeholder')}
          />

          <TextAreaField
            control={control as any}
            name="description"
            label={t('add_task_modal.description')}
            placeholder={t('add_task_modal.description_placeholder')}
            inputClassName="h-28"
          />

          {/* Subtasks Input */}
          <div>
            <label
              htmlFor="columns-input"
              className={cx(
                'text-xs text-medium-grey font-bold',
                'dark:text-white',
              )}
            >
              {t('add_task_modal.subtasks')}
            </label>

            <ul className="mt-2 flex max-h-36 flex-col gap-3 overflow-y-auto">
              {fields.map((field, index) => (
                <li key={field.id} className="relative flex w-full">
                  <input
                    placeholder={t('add_task_modal.subtask_placeholder')}
                    className={cx(
                      'w-full',
                      typographyStyles['body-lg'],
                      'rounded border border-black/25 px-4 py-2',
                      'placeholder:text-black/25)',
                      'focus:border-main-purple active:border-main-purple',
                      errors.subtasks?.message &&
                        'border-red focus:border-red active:border-red dark:border-red dark:focus:border-red dark:active:border-red',
                      'dark:bg-dark-grey dark:border-lines-dark dark:text-white dark:placeholder:text-lines-dark',
                    )}
                    {...register(`subtasks.${index}.title`)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSubtask(index)}
                    aria-label="Remove"
                    className="group ml-4"
                  >
                    <IconCross className="fill-medium-grey group-hover:fill-slate-800 dark:group-hover:fill-white" />
                  </button>
                </li>
              ))}
            </ul>

            {errors.subtasks && (
              <Typography variant="body-md" className="mt-3 text-red">
                {errors.subtasks.message}
              </Typography>
            )}

            <Button
              type="button"
              className="mt-3 w-full"
              variant="secondary"
              size="S"
              onClick={handleAddNewSubtask}
            >
              {t('add_task_modal.add_new_subtask')}
            </Button>
          </div>

          <Controller
            name="status"
            control={control}
            defaultValue={columns[0]}
            render={({ field: { onChange, value } }) => (
              <Dropdown
                label={t('add_task_modal.status')}
                options={columns}
                selectedOption={value}
                setSelectedOption={onChange}
              />
            )}
          />

          <Button type="submit" className="w-full" variant="primary" size="S">
            {t('save_changes')}
          </Button>
        </form>
      </div>
    </ModalWrapper>
  );
};

export default EditTaskModal;
