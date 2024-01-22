import { useTranslations } from 'next-intl';

import { useKanbanStore } from '@/stores/newKanbanStore';

import Button from '../Button';
import Typography from '../Typography';
import ModalWrapper from './ModalWrapper';

export interface DeleteBoardModalProps {
  isOpen: boolean;
  closeModal: () => void;
}
const DeleteBoardModal: React.FC<DeleteBoardModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const t = useTranslations('Board');
  const { removeBoard, currentBoardId, getCurrentBoard } = useKanbanStore();

  const boardName = getCurrentBoard()?.name;

  const handleRemoveBoard = () => {
    removeBoard(currentBoardId as string);
    closeModal();
  };

  return (
    <ModalWrapper isOpen={isOpen} closeModal={closeModal}>
      <Typography variant="heading-lg" className="mb-6 text-red">
        {t('delete_board_modal.title')}
      </Typography>

      <Typography variant="body-lg" className="mb-6">
        {t('delete_board_modal.description', {
          name: boardName,
        })}
      </Typography>

      <div className="flex w-full gap-2">
        <Button
          type="button"
          size="S"
          variant="destructive"
          onClick={handleRemoveBoard}
          className="grow"
        >
          {t('delete_board_modal.delete')}
        </Button>
        <Button
          type="button"
          size="S"
          variant="secondary"
          onClick={closeModal}
          className="grow"
        >
          {t('delete_board_modal.cancel')}
        </Button>
      </div>
    </ModalWrapper>
  );
};

export default DeleteBoardModal;
