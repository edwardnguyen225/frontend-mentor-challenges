'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import IconVerticalEllipsis from '@/public/assets/icon-vertical-ellipsis.svg';
import LogoDark from '@/public/assets/logo-dark.svg';
import { useBoardModalStore, useBoardStore } from '@/stores/KanbanStore';

import Button from './Button';
import Typography from './Typography';

const Header: React.FC = () => {
  const { openBoardModal } = useBoardModalStore();
  const { name, columns } = useBoardStore();
  const t = useTranslations('Header');

  return (
    <header className="flex h-24 w-full items-center border-b-2 border-lines-light bg-white">
      <Image
        src={LogoDark}
        alt="Logo"
        className="ml-6 mr-8 h-[25px] w-[152px] grow-0"
        width={152}
        height={25}
      />
      <div className="flex h-full w-full grow items-center justify-between border-l-2 border-lines-light px-8 pr-2">
        <Typography variant="heading-xl">{name || t('new_board')}</Typography>
        <div className="flex gap-1">
          <Button
            variant="primary"
            size="L"
            disabled={columns.length === 0}
            onClick={() => {
              console.log('clicked');
            }}
          >
            {t('add_new_task')}
          </Button>
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-light-grey"
            onClick={openBoardModal}
            aria-label="Open Board Settings"
          >
            <Image
              src={IconVerticalEllipsis}
              alt="Open Board Settings"
              width={5}
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
