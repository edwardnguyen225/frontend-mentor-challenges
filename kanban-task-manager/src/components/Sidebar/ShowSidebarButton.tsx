import cx from 'classix';

import useSidebarStore from '@/stores/sidebarStore';

import { IconShowSidebar } from '../Icons';

const ShowSidebarButton = () => {
  const { isSidebarShown, showSidebar } = useSidebarStore();

  return (
    <button
      type="button"
      onClick={showSidebar}
      aria-label="show sidebar"
      className={cx(
        'left-0 bottom-8 absolute',
        isSidebarShown ? 'hidden' : 'block',
        'w-14 h-12 flex items-center justify-center rounded-r-full z-10 bg-main-purple hover:bg-main-purple-light',
      )}
    >
      <IconShowSidebar />
    </button>
  );
};

export default ShowSidebarButton;
