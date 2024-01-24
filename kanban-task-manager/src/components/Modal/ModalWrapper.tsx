import { Dialog, Transition } from '@headlessui/react';
import cx from 'classix';
import { Fragment, useCallback, useEffect } from 'react';

export interface ModalWrapperProps {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen,
  closeModal,
  children,
}) => {
  const removePaddingRightOfHtml = useCallback(() => {
    setTimeout(() => {
      document.documentElement.style.paddingRight = '0px';
    }, 0); // This is to prevent the scrollbar from flickering
  }, []);

  useEffect(() => {
    if (isOpen) {
      removePaddingRightOfHtml();
    } else {
      removePaddingRightOfHtml();
    }
    return () => {
      removePaddingRightOfHtml();
    };
  }, [isOpen, removePaddingRightOfHtml]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={cx(
                  'w-full max-w-md rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all',
                  'dark:bg-dark-grey dark:text-white',
                )}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalWrapper;
