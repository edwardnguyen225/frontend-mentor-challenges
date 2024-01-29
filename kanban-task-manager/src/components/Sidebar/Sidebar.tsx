import cx from 'classix';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import LogoLight from '@/public/assets/logo-dark.svg';
import LogoDark from '@/public/assets/logo-light.svg';
import { useKanbanStore } from '@/stores/newKanbanStore';
import useSidebarStore from '@/stores/sidebarStore';

import { IconHideSidebar } from '../Icons';
import Typography from '../Typography';
import BoardList from './BoardList';
import ThemeController from './ThemeController';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { isSidebarShown, hideSidebar } = useSidebarStore();
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
      <div className="flex h-24 items-center">
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
        <div className="flex flex-col gap-4 px-6">
          <ThemeController />
          {/* TODO: Add hide sidebar button */}
          <button
            type="button"
            aria-label="hide sidebar"
            className="group flex items-center justify-start gap-4 rounded-lg px-2 py-1 hover:bg-[#F5F7FD] dark:bg-[#20212C] dark:hover:bg-[#2D2E3A]"
            onClick={hideSidebar}
          >
            <IconHideSidebar className="fill-medium-grey group-hover:fill-black dark:group-hover:fill-white" />
            <Typography
              variant="heading-md"
              className="text-medium-grey group-hover:text-black dark:group-hover:text-white"
            >
              {t('hide_sidebar')}
            </Typography>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
