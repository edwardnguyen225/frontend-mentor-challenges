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

export interface EditBoardModalProps {
  isOpen: boolean;
  closeModal: () => void;
  isAddingColumn?: boolean;
}

const BoardFormSchema = (t: (arg: string) => string) =>
  z.object({
    name: z.string({
      required_error: t('errors.required_error'),
    }),
    columns: z
      .object({
        name: z.string(),
        id: z.string().optional(),
      })
      .array(),
  });

const EditBoardModal: React.FC<EditBoardModalProps> = ({
  isOpen,
  closeModal,
  isAddingColumn,
}) => {
  const t = useTranslations('Board');
  const formSchema = BoardFormSchema(t);
  const {
    currentBoardId,
    updateCurrentBoardName,
    updateCurrentColumns,
    getCurrentBoard,
    getCurrentColumns,
  } = useKanbanStore();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    setFocus,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: getCurrentBoard()?.name,
      columns: getCurrentColumns(),
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'columns' as never,
    control,
  });

  useEffect(() => {
    return () => {
      reset({
        name: getCurrentBoard()?.name,
        columns: getCurrentColumns(),
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBoardId, isOpen]);

  const handleAddNewColumn = () => {
    append({
      name: t('board_modal.new_column'),
    });
  };

  useEffect(() => {
    if (isAddingColumn) {
      handleAddNewColumn();
      const lastColumnIndex = fields.length - 1;
      setFocus(`columns.${lastColumnIndex}.name`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddingColumn]);

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
      if (column.name.trim() === '') {
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

    updateCurrentBoardName(values.name);
    updateCurrentColumns(values.columns);

    closeModal();
  };

  return (
    <ModalWrapper isOpen={isOpen} closeModal={closeModal}>
      <Typography variant="heading-lg" className="mb-6">
        {t('board_modal.edit_board')}
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
            {t('board_modal.board_columns')}
          </label>

          <ul className="flex max-h-[196px] flex-col gap-3 overflow-y-auto">
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
                      'border-red focus:border-red active:border-red',
                    'dark:bg-dark-grey dark:border-lines-dark dark:text-white dark:placeholder:text-lines-dark',
                  )}
                  {...register(`columns.${index}.name`)}
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  aria-label="Remove"
                  className="group ml-4"
                >
                  <IconCross className="fill-medium-grey group-hover:fill-red" />
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
          {t('board_modal.save_changes')}
        </Button>
      </form>
    </ModalWrapper>
  );
};

export default EditBoardModal;
