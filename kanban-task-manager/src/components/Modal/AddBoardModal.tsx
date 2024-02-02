import { zodResolver } from '@hookform/resolvers/zod';
import cx from 'classix';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useKanbanStore } from '@/stores/newKanbanStore';

import Button from '../Button';
import { IconCross } from '../Icons';
import TextField from '../TextField';
import Typography, { typographyStyles } from '../Typography';
import ModalWrapper from './ModalWrapper';

export interface AddBoardModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const BoardFormSchema = (t: (arg: string) => string) =>
  z.object({
    name: z.string({
      required_error: t('errors.required_error'),
    }),
    columns: z.string().array(),
  });

const AddBoardModal: React.FC<AddBoardModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const t = useTranslations('Board');
  const formSchema = BoardFormSchema(t);
  const { addBoard, openBoard } = useKanbanStore();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      columns: [
        t('board_modal.todo'),
        t('board_modal.doing'),
        t('board_modal.done'),
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'columns' as never,
    control,
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.name.trim() === '') {
      setError('name', {
        type: 'manual',
        message: t('errors.required_error'),
      });
      return;
    }

    let hasUnnamedColumn = false;
    values.columns.forEach((column) => {
      if (column.trim() === '') {
        hasUnnamedColumn = true;
      }
    });
    if (hasUnnamedColumn) {
      setError('columns', {
        type: 'manual',
        message: t('errors.has_unnamed_column'),
      });
      return;
    }

    const { id: newBoardId } = await addBoard(values.name, values.columns);
    closeModal();
    openBoard(newBoardId);
  };

  const handleAddNewColumn = () => {
    append(t('board_modal.new_column'));
  };

  return (
    <ModalWrapper isOpen={isOpen} closeModal={closeModal}>
      <Typography variant="heading-lg" className="mb-6">
        {t('board_modal.add_new_board')}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          control={control as any}
          name="name"
          rules={{ required: true }}
          label={t('board_modal.add_new_board')}
        />

        <div className="mt-6 flex w-full flex-col">
          <label
            htmlFor="columns-input"
            className={cx(
              'mb-2 text-xs text-medium-grey font-bold',
              'dark:text-white',
            )}
          >
            {t('board_modal.columns')}
          </label>

          <ul className="flex flex-col gap-3">
            {fields.map((field, index) => (
              <li key={field.id} className="relative flex w-full">
                <input
                  className={cx(
                    'w-full',
                    typographyStyles['body-lg'],
                    'rounded border border-black/25 px-4 py-2',
                    'placeholder:text-black/25)',
                    'focus:border-main-purple active:border-main-purple',
                    errors.columns?.message &&
                      'border-red focus:border-red active:border-red dark:border-red dark:focus:border-red dark:active:border-red',
                    'dark:bg-dark-grey dark:border-lines-dark dark:text-white dark:placeholder:text-lines-dark',
                  )}
                  {...register(`columns.${index}`)}
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  aria-label="Remove"
                  className="group ml-4"
                >
                  <IconCross className="fill-medium-grey group-hover:fill-slate-800 dark:group-hover:fill-white" />
                </button>
              </li>
            ))}
          </ul>

          {errors.columns && (
            <Typography variant="body-md" className="mt-3 text-red">
              {errors.columns.message}
            </Typography>
          )}

          <Button
            type="button"
            className="mt-3 w-full"
            variant="secondary"
            size="S"
            onClick={handleAddNewColumn}
          >
            {t('board_modal.add_new_column')}
          </Button>
        </div>

        <Button
          type="submit"
          className="mt-6 w-full"
          variant="primary"
          size="S"
        >
          {t('board_modal.create_board')}
        </Button>
      </form>
    </ModalWrapper>
  );
};

export default AddBoardModal;
