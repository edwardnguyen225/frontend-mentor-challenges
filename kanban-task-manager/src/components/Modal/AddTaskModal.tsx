import { zodResolver } from '@hookform/resolvers/zod';
import cx from 'classix';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useKanbanStore } from '@/stores/newKanbanStore';

import Button from '../Button';
import Dropdown from '../Dropdown';
import { IconCross } from '../Icons';
import TextAreaField from '../TextAreaField';
import TextField from '../TextField';
import Typography, { typographyStyles } from '../Typography';
import ModalWrapper from './ModalWrapper';

export interface AddTaskModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const BoardFormSchema = (t: (arg: string) => string) =>
  z.object({
    title: z.string({
      required_error: t('errors.required_error'),
    }),
    description: z.string().optional(),
    subtasks: z
      .object({
        title: z.string(),
      })
      .array()
      .optional(),
    status: z.object({
      id: z.string(),
      name: z.string(),
    }),
  });

/**
 * TODO:
 * - [x] Task title
 * - [x] Task description
 * - [x] Task status
 * - [ ] Task subtasks
 * - [ ] Validation
 * - [ ] Submit
 */
const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, closeModal }) => {
  const t = useTranslations('Board');

  const { addTask, getCurrentColumns } = useKanbanStore();
  const columns = getCurrentColumns();

  const formSchema = BoardFormSchema(t);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      subtasks: [],
      status: columns[0],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'subtasks' as never,
    control,
  });
  const handleAddNewSubtask = () => {
    append({ title: '' });
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

    const subtasks = values.subtasks?.map(({ title }) => title) ?? [];
    addTask(
      {
        title: values.title,
        description: values.description ?? '',
        columnId: values.status.id,
      },
      subtasks,
    );
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
            {t('add_task_modal.submit')}
          </Button>
        </form>
      </div>
    </ModalWrapper>
  );
};

export default AddTaskModal;
