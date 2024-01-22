'use client';

import { Menu, Transition } from '@headlessui/react';
import cx from 'classix';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React, { Fragment } from 'react';

import IconVerticalEllipsis from '@/public/assets/icon-vertical-ellipsis.svg';
import { useModalStore } from '@/stores/newKanbanStore';

const EditInactiveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 13V16H7L16 7L13 4L4 13Z"
      fill="#EDE9FE"
      stroke="#A78BFA"
      strokeWidth="2"
    />
  </svg>
);

const EditActiveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 13V16H7L16 7L13 4L4 13Z"
      fill="#8B5CF6"
      stroke="#C4B5FD"
      strokeWidth="2"
    />
  </svg>
);

const DeleteInactiveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x="5"
      y="6"
      width="10"
      height="10"
      fill="#fff"
      stroke="#ea5555"
      strokeWidth="2"
    />
    <path d="M3 6H17" stroke="#ea5555" strokeWidth="2" />
    <path d="M8 6V4H12V6" stroke="#ea5555" strokeWidth="2" />
  </svg>
);

const DeleteActiveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x="5"
      y="6"
      width="10"
      height="10"
      fill="#ea5555"
      stroke="#fff"
      strokeWidth="2"
    />
    <path d="M3 6H17" stroke="#fff" strokeWidth="2" />
    <path d="M8 6V4H12V6" stroke="#fff" strokeWidth="2" />
  </svg>
);

const BoardMenu: React.FC = () => {
  const t = useTranslations('Board');
  const { openEditBoardModal, openDeleteBoardModal } = useModalStore();

  return (
    <div>
      <Menu>
        <Menu.Button
          type="button"
          className={cx(
            'flex h-12 w-12 items-center justify-center rounded-full hover:bg-light-grey',
            'dark:hover:bg-lines-dark',
          )}
          aria-label="Open Board Settings"
        >
          <Image
            src={IconVerticalEllipsis}
            alt="Open Board Settings"
            width={5}
          />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={cx(
              'absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none',
            )}
          >
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={`${
                    active ? 'bg-violet-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md p-2 text-sm`}
                  onClick={openEditBoardModal}
                >
                  {active ? (
                    <EditActiveIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <EditInactiveIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  {t('edit_board')}
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={`${
                    active ? 'bg-red text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md p-2 text-sm`}
                  onClick={openDeleteBoardModal}
                >
                  {active ? (
                    <DeleteActiveIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <DeleteInactiveIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  {t('delete_board')}
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default BoardMenu;
