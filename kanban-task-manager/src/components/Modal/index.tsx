import React from 'react';

import { useModalStore } from '@/stores/newKanbanStore';

import AddBoardModal from './AddBoardModal';
import DeleteBoardModal from './DeleteBoardModal';
import EditBoardModal from './EditBoardModal';

const ModalController = () => {
  const {
    modal: { isOpen, type, props },
    closeModal,
  } = useModalStore();

  /**
   * NOTE: Do not return null here, so as to keep the animation of the modal
   * when it is closed.
   */

  return (
    <>
      <AddBoardModal
        isOpen={isOpen && type === 'add-board'}
        closeModal={closeModal}
        {...props}
      />
      <DeleteBoardModal
        isOpen={isOpen && type === 'delete-board'}
        closeModal={closeModal}
        {...props}
      />
      <EditBoardModal
        isOpen={isOpen && type === 'edit-board'}
        closeModal={closeModal}
        {...props}
      />
    </>
  );
};

export default ModalController;