import cx from 'classix';
import React from 'react';
import { useController, type UseControllerProps } from 'react-hook-form';

import Typography, { typographyStyles } from './Typography';

interface TextFieldProps extends UseControllerProps {
  label?: string;
  className?: string;
  placeholder?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  className,
  placeholder,
  ...props
}) => {
  const { field, fieldState } = useController(props);
  const { error } = fieldState;

  return (
    <div className={cx('flex flex-col', className)}>
      {label && (
        <label
          htmlFor={field.name}
          className={cx(
            'mb-2 text-xs text-medium-grey font-bold',
            'dark:text-white',
          )}
        >
          {label}
        </label>
      )}
      <div className="relative flex w-full">
        <input
          {...field}
          placeholder={placeholder}
          className={cx(
            'w-full',
            typographyStyles['body-lg'],
            // TODO: Change border color to `border-lines-light`
            'rounded border border-black/25 px-4 py-2',
            'placeholder:text-black/25)',
            'focus:border-main-purple active:border-main-purple',
            error &&
              'border-red focus:border-red active:border-red dark:border-red dark:focus:border-red dark:active:border-red',
            'dark:bg-dark-grey dark:border-lines-dark dark:text-white dark:placeholder:text-lines-dark',
          )}
        />
        {error && (
          <Typography
            variant="body-lg"
            className="absolute right-4 mt-2 text-red"
          >
            {error.message}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default TextField;
