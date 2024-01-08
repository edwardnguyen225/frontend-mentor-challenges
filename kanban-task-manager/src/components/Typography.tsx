import cx from 'classix';
import React from 'react';

type TypographyProps = {
  children: string;
  variant:
    | 'heading-xl'
    | 'heading-lg'
    | 'heading-md'
    | 'heading-sm'
    | 'body-lg'
    | 'body-md';
  className?: string;
};

export const typographyStyles = {
  'heading-xl': 'text-2xl font-bold leading-[30px] text-black dark:text-white',
  'heading-lg': 'text-lg font-bold leading-[23px] text-black dark:text-white',
  'heading-md':
    'text-[15px] font-bold leading-[19px] text-black dark:text-white',
  'heading-sm': 'text-xs font-bold leading-[15px] text-medium-grey',
  'body-lg':
    'text-[13px] font-normal leading-[23px] text-dark-grey dark:text-medium-grey',
  'body-md':
    'text-xs font-bold leading-[15px] text-dark-grey dark:text-medium-grey',
};

const Typography: React.FC<TypographyProps> = ({
  variant,
  className = '',
  children,
}) => {
  return <p className={cx(typographyStyles[variant], className)}>{children}</p>;
};

export default Typography;
