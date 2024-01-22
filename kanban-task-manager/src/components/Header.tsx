'use client';

import cx from 'classix';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import LogoDark from '@/public/assets/logo-dark.svg';
import { useKanbanStore } from '@/stores/newKanbanStore';

import BoardMenu from './BoardMenu';
import Button from './Button';
import Typography from './Typography';

const Header: React.FC = () => {
  const { isSidebarOpen, getCurrentBoard } = useKanbanStore();
  const t = useTranslations('Header');

  const currentBoard = getCurrentBoard();
  const { name, columnIds } = currentBoard ?? {};

  return (
    <header className="flex h-24 w-full items-center border-b-2 border-lines-light bg-white dark:border-lines-dark dark:bg-dark-grey">
      {!isSidebarOpen ? (
        <Image
          src={LogoDark}
          alt="Logo"
          className="ml-6 mr-8 h-[25px] w-[152px] shrink-0"
          width={152}
          height={25}
        />
      ) : null}
      <div
        className={cx(
          'flex h-full w-full grow items-center justify-between border-lines-light px-8 pr-2',
          !isSidebarOpen && 'border-l-2',
        )}
      >
        <Typography variant="heading-xl">{name || t('new_board')}</Typography>
        <div className="flex gap-1">
          <Button
            variant="primary"
            size="L"
            disabled={columnIds?.length === 0}
            onClick={() => {
              console.log('clicked');
            }}
          >
            {t('add_new_task')}
          </Button>
          <BoardMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
