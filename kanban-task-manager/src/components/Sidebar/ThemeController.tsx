import { Switch } from '@headlessui/react';
import cx from 'classix';
import React from 'react';

import { useKanbanStore } from '@/stores/newKanbanStore';

import { IconDarkTheme, IconLightTheme } from '../Icons';

const ThemeController = () => {
  const { theme, setTheme } = useKanbanStore();
  const isToggleRight = theme === 'dark';
  const handleToggle = () => {
    setTheme(isToggleRight ? 'light' : 'dark');
  };

  return (
    <div className="flex items-center  justify-center gap-4 rounded-lg bg-[#F5F7FD] py-4 dark:bg-[#20212C]">
      <IconLightTheme className="fill-medium-grey" />
      <input
        type="checkbox"
        checked={isToggleRight}
        onChange={handleToggle}
        className="hidden"
        id="theme-switcher"
      />
      <Switch
        checked={isToggleRight}
        onChange={handleToggle}
        className={cx(
          'bg-main-purple',
          'relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75',
        )}
      >
        <span className="sr-only">Theme Setting</span>
        <span
          aria-hidden="true"
          className={cx(
            isToggleRight ? 'translate-x-7' : 'translate-x-0',
            'pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
          )}
        />
      </Switch>
      <IconDarkTheme className="fill-medium-grey" />
    </div>
  );
};

export default ThemeController;
