import cx from 'classix';
import type { MouseEvent, ReactNode } from 'react';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  className?: string;
  children: ReactNode;
  onClose: () => void;
}

export const MODAL_ROOT_ID = 'modal-root';

const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  className,
  onClose,
}) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        event.target instanceof Node &&
        !(event.target as Element).closest('.modal-content')
      ) {
        onClose();
      }
    };

    // @ts-ignore
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // @ts-ignore
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-black/75 transition-opacity" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            className={cx(
              'modal-content relative overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg',
              className,
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')!,
  );
};

export default Modal;
