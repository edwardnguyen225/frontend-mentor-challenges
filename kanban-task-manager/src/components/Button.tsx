import cx from 'classix';
import React from 'react';

import { typographyStyles } from './Typography';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'destructive';
  size?: 'L' | 'S';
  width?: string;
}

const colors = {
  primary: cx('bg-main-purple hover:bg-main-purple-light', 'text-white'),
  secondary: cx(
    'bg-[#EFEFF9] hover:bg-[#D8D7F1]',
    'dark:bg-white dark:hover:bg-white',
    'text-main-purple',
  ),
  destructive: cx('bg-red hover:bg-red-hover', 'text-white'),
};

const sizes = {
  L: cx(
    'pt-[15px] pb-[14px] px-6',
    'rounded-3xl',
    typographyStyles['heading-md'],
  ),
  S: cx('py-2 px-6', 'rounded-[20px]', 'text-[13px]'),
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  size = 'S',
  width,
}) => {
  return (
    <button
      type="button"
      className={cx(colors[variant], sizes[size], width, 'font-bold')}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
