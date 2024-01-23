'use client';

import { Menu, Transition } from '@headlessui/react';
import cx from 'classix';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React, { Fragment } from 'react';

import IconVerticalEllipsis from '@/public/assets/icon-vertical-ellipsis.svg';
import { useModalStore } from '@/stores/newKanbanStore';

import { IconDelete, IconEdit } from './Icons';

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
              'absolute right-0 mt-2 mr-4 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none',
              'dark:bg-dark-grey dark:divide-lines-dark',
            )}
          >
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={`${
                    active
                      ? 'bg-main-purple text-white'
                      : 'text-gray-900 dark:text-white'
                  } group flex w-full items-center rounded-md p-2 text-sm`}
                  onClick={openEditBoardModal}
                >
                  <IconEdit
                    className={cx(
                      'mr-2 h-5 w-5',
                      active
                        ? 'fill-main-purple stroke-white'
                        : 'fill-white stroke-main-purple dark:fill-dark-grey dark:stroke-lines-light',
                    )}
                    aria-hidden="true"
                  />
                  {t('edit_board')}
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={`${
                    active
                      ? 'bg-red text-white'
                      : 'text-gray-900 dark:text-white'
                  } group flex w-full items-center rounded-md p-2 text-sm`}
                  onClick={openDeleteBoardModal}
                >
                  <IconDelete
                    className={cx(
                      'mr-2 h-5 w-5',
                      active
                        ? 'fill-red stroke-white'
                        : 'fill-white stroke-red dark:fill-dark-grey',
                    )}
                    aria-hidden="true"
                  />
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
