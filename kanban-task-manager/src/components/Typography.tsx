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
  'heading-xl': 'text-2xl font-bold leading-[30px]',
  'heading-lg': 'text-lg font-bold leading-[23px]',
  'heading-md': 'text-[15px] font-bold leading-[19px]',
  'heading-sm': 'text-xs font-bold leading-[15px]',
  'body-lg': 'text-[13px] font-normal leading-[23px]',
  'body-md': 'text-xs font-bold leading-[15px]',
};

export const typographyColors = {
  'heading-xl': 'text-black dark:text-white',
  'heading-lg': 'text-black dark:text-white',
  'heading-md': 'text-black dark:text-white',
  'heading-sm': 'text-medium-grey',
  'body-lg': 'text-dark-grey dark:text-medium-grey',
  'body-md': 'text-dark-grey dark:text-medium-grey',
};

const Typography: React.FC<TypographyProps> = ({
  variant,
  className = '',
  children,
}) => {
  return (
    <p
      className={cx(
        typographyColors[variant],
        typographyStyles[variant],
        className,
      )}
    >
      {children}
    </p>
  );
};

export default Typography;
