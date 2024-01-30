import cx from 'classix';
import { useTranslations } from 'next-intl';

import useSidebarStore from '@/stores/sidebarStore';

import { IconHideSidebar } from '../Icons';
import Typography from '../Typography';

interface HideSidebarButtonProps {
  className?: string;
}

const HideSidebarButton: React.FC<HideSidebarButtonProps> = ({ className }) => {
  const { hideSidebar } = useSidebarStore();
  const t = useTranslations('Board');

  return (
    <button
      type="button"
      aria-label="hide sidebar"
      className={cx(
        'pl-8 h-12 w-full rounded-r-full',
        'group flex items-center justify-start gap-4',
        'hover:bg-main-purple/10 dark:hover:bg-white',
        className,
      )}
      onClick={hideSidebar}
    >
      <IconHideSidebar className="fill-medium-grey group-hover:fill-main-purple" />
      <Typography
        variant="heading-md"
        className="text-medium-grey group-hover:text-main-purple"
      >
        {t('hide_sidebar')}
      </Typography>
    </button>
  );
};

export default HideSidebarButton;
