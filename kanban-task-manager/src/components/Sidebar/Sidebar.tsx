import cx from 'classix';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import LogoLight from '@/public/assets/logo-dark.svg';
import LogoDark from '@/public/assets/logo-light.svg';
import { useKanbanStore } from '@/stores/newKanbanStore';
import useSidebarStore from '@/stores/sidebarStore';

import Typography from '../Typography';
import BoardList from './BoardList';
import HideSidebarButton from './HideSidebarButton';
import ThemeController from './ThemeController';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { isSidebarShown } = useSidebarStore();
  const { boards, theme } = useKanbanStore();
  const t = useTranslations('Board');

  const numberOfBoards = Object.keys(boards).length;

  return (
    <aside
      className={cx(
        'bg-white dark:bg-dark-grey border-r-2 border-lines-light dark:border-lines-dark flex flex-col',
        className,
        !isSidebarShown && 'hidden',
      )}
    >
      <div className="flex h-20 items-center">
        <Image
          src={theme === 'dark' ? LogoDark : LogoLight}
          alt="Logo"
          className="ml-6 mr-8 h-[25px] w-[152px] grow-0"
          width={152}
          height={25}
        />
      </div>
      <div className="flex grow flex-col justify-between pb-9 pt-4">
        <div>
          <Typography variant="heading-sm" className="ml-8">
            {t('all_boards', { count: numberOfBoards })}
          </Typography>
          <BoardList />
        </div>
        <div className="flex flex-col gap-2">
          <ThemeController className="mx-6" />
          <div className="w-full pr-6">
            <HideSidebarButton />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
