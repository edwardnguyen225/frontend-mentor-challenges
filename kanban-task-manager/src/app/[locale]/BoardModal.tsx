import cx from 'classix';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import Button from '@/components/Button';
import TextField from '@/components/TextField';
import Typography from '@/components/Typography';
import IconCross from '@/public/assets/icon-cross.svg';
import { useBoardModalStore, useBoardStore } from '@/stores/KanbanStore';

import Modal from '../../components/Modal';

interface ColumnFieldProps {
  name: string;
  onChange: (value: string) => void;
  onDelete: () => void;
  className?: string;
}

const ColumnField: React.FC<ColumnFieldProps> = ({
  name,
  onChange,
  onDelete,
  className,
}) => {
  return (
    <div className={cx('flex items-center gap-2', className)}>
      <TextField className="grow" value={name} onChange={onChange} />
      <button type="button" onClick={onDelete}>
        <Image src={IconCross} alt="Delete Column" width={15} />
      </button>
    </div>
  );
};

const BoardModal: React.FC = () => {
  const { isOpen, closeBoardModal: onClose } = useBoardModalStore();
  const {
    name,
    setBoardName: saveBoardName,
    columns: boardColumns,
  } = useBoardStore();

  const [boardName, setBoardName] = useState(name ?? '');
  const [columns, setColumns] = useState(
    boardColumns.map((col) => col.name) ?? [],
  );
  const t = useTranslations('Board');

  const isBoardDataValid = () => {
    return boardName !== '';
  };

  const handleClose = () => {
    if (!isBoardDataValid()) return;

    onClose();
  };

  const handleSave = () => {
    if (!isBoardDataValid()) return;

    saveBoardName(boardName);
    handleClose();
  };

  const handleAddColumn = () => {
    setColumns([...columns, t('new_column')]);
  };

  const boardColumn = (
    <div>
      <Typography variant="body-md" className="mb-2 text-medium-grey">
        {t('board_columns')}
      </Typography>
      {columns.map((column, index) => (
        <ColumnField
          key={`column-${column}`}
          name={column as string}
          onChange={(value: string) => {
            // FIX: Handle rerendering on changing value
            const newColumns = [...columns];
            newColumns[index] = value;
            setColumns(newColumns);
          }}
          onDelete={() => {
            const newColumns = [...columns];
            newColumns.splice(index, 1);
            setColumns(newColumns);
          }}
          className="mt-3"
        />
      ))}
      <Button
        className={cx('w-full', columns.length !== 0 && 'mt-3')}
        variant="secondary"
        onClick={handleAddColumn}
      >
        {t('add_new_column')}
      </Button>
    </div>
  );

  return (
    <Modal
      className="flex flex-col gap-6 p-8"
      isOpen={isOpen}
      onClose={handleClose}
    >
      <Typography variant="heading-lg">{t('edit_board')}</Typography>
      <TextField
        required
        label="Board Name"
        value={boardName}
        onChange={(value) => setBoardName(value)}
      />
      {boardColumn}
      <Button className="w-full" onClick={handleSave}>
        {t('save_changes')}
      </Button>
    </Modal>
  );
};

export default BoardModal;
