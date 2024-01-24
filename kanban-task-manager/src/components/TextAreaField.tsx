import cx from 'classix';
import React from 'react';
import { useController, type UseControllerProps } from 'react-hook-form';

import { typographyStyles } from './Typography';

interface TextAreaFieldProps extends UseControllerProps {
  label?: string;
  className?: string;
  placeholder?: string;
  inputClassName?: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  className,
  placeholder,
  inputClassName,
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
        <textarea
          {...field}
          placeholder={placeholder}
          className={cx(
            inputClassName,
            'w-full resize-none',
            typographyStyles['body-lg'],
            'rounded border border-black/25 px-4 py-2',
            'placeholder:text-black/25)',
            'focus:border-main-purple active:border-main-purple',
            error &&
              'border-red focus:border-red active:border-red dark:border-red dark:focus:border-red dark:active:border-red',
            'dark:bg-dark-grey dark:border-lines-dark dark:text-white dark:placeholder:text-lines-dark',
          )}
        />
        {error && (
          <p className="absolute right-4 mt-2 text-red">{error.message}</p>
        )}
      </div>
    </div>
  );
};

export default TextAreaField;
