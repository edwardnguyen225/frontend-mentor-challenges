'use client';

import cx from 'classix';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import { useScreenWidth } from '@/hooks/screen';
import LogoDark from '@/public/assets/logo-dark.svg';
import LogoMobile from '@/public/assets/logo-mobile.svg';
import { useKanbanStore, useModalStore } from '@/stores/newKanbanStore';

import BoardMenu from './BoardMenu';
import Button from './Button';
import { IconChevronDown } from './Icons';
import IconAddTaskMobile from './Icons/IconAddTaskMobile';
import Typography from './Typography';

const Header: React.FC = () => {
  const { openAddTaskModal } = useModalStore();
  const { isSidebarOpen, getCurrentBoard } = useKanbanStore();
  const { screenType } = useScreenWidth();
  const t = useTranslations('Header');

  const currentBoard = getCurrentBoard();
  const { name, columnIds } = currentBoard ?? {};

  return (
    <header className="flex h-16 w-full items-center border-b-2 border-lines-light bg-white md:h-20 dark:border-lines-dark dark:bg-dark-grey">
      {!isSidebarOpen && screenType !== 'mobile' ? (
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
          'flex h-full w-full grow items-center justify-between border-lines-light pl-4 md:pl-8 pr-2',
          !isSidebarOpen && 'border-l-2',
        )}
      >
        {screenType !== 'mobile' && (
          <Typography variant="heading-xl">{name}</Typography>
        )}
        {screenType === 'mobile' && (
          // TODO: Open kanban menu modal
          <button type="button" className="flex items-center">
            <Image
              src={LogoMobile}
              alt="Logo"
              className="h-[25px] w-6 shrink-0"
              width={24}
              height={25}
            />
            <Typography variant="heading-lg" className="ml-4">
              {name}
            </Typography>
            <IconChevronDown className="ml-2" />
          </button>
        )}
        <div className="flex gap-1">
          <Button
            variant="primary"
            disabled={columnIds?.length === 0}
            onClick={openAddTaskModal}
            className="flex !h-8 !w-12 items-center justify-center !p-0 md:!h-12 md:!w-[164px]"
          >
            <span className="hidden md:block">{t('add_new_task')}</span>
            <div className="md:hidden">
              <IconAddTaskMobile />
            </div>
          </Button>
          <BoardMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
