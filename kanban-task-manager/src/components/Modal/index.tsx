import React from 'react';

import { useModalStore } from '@/stores/newKanbanStore';

import AddBoardModal from './AddBoardModal';
import AddTaskModal from './AddTaskModal';
import DeleteBoardModal from './DeleteBoardModal';
import DeleteTaskModal from './DeleteTaskModal';
import EditBoardModal from './EditBoardModal';
import ViewTaskModal from './ViewTaskModal';

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

      <AddTaskModal
        isOpen={isOpen && type === 'add-task'}
        closeModal={closeModal}
        {...props}
      />
      <ViewTaskModal
        isOpen={isOpen && type === 'view-task'}
        closeModal={closeModal}
        {...props}
      />
      <DeleteTaskModal
        isOpen={isOpen && type === 'delete-task'}
        closeModal={closeModal}
        {...props}
      />
    </>
  );
};

export default ModalController;
