import cx from 'classix';
import React from 'react';

import { typographyStyles } from './Typography';

interface ButtonProps {
  type?: 'submit' | 'reset' | 'button' | undefined;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'destructive';
  className?: string;
  size?: 'L' | 'S';
  disabled?: boolean;
}

const colors = {
  primary: cx(
    'bg-main-purple enabled:hover:bg-main-purple-light',
    'text-white',
  ),
  secondary: cx(
    'bg-[#EFEFF9] enabled:hover:bg-[#D8D7F1]',
    'dark:bg-white dark:enabled:hover:bg-white',
    'text-main-purple',
  ),
  destructive: cx('bg-red enabled:hover:bg-red-hover', 'text-white'),
};

const sizes = {
  L: cx(
    'pt-[15px] pb-[14px] px-6 h-12',
    'rounded-3xl',
    typographyStyles['heading-md'],
  ),
  S: cx('py-2 px-6 h-10', 'rounded-[20px]', 'text-[13px]'),
};

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  children,
  onClick,
  variant = 'primary',
  size = 'S',
  className,
  disabled,
}) => {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={cx(
        colors[variant],
        sizes[size],
        className,
        'font-bold',
        'disabled:opacity-50',
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
