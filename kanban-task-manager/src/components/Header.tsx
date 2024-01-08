'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import LogoDark from '@/public/assets/logo-dark.svg';

import Button from './Button';
import Typography from './Typography';

const Header: React.FC = () => {
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
      <div className="flex h-full w-full grow items-center justify-between border-l-2 border-lines-light px-8">
        <Typography variant="heading-xl">Platform Launch</Typography>
        <Button
          variant="primary"
          size="L"
          disabled
          onClick={() => {
            console.log('clicked');
          }}
        >
          {t('add_new_task')}
        </Button>
      </div>
    </header>
  );
};

export default Header;
