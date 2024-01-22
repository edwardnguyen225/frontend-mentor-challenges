import cx from 'classix';
import React, { useState } from 'react';

import { typographyStyles } from './Typography';

interface TextFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  className?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  placeholder,
  required,
  className,
  ...props
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (required && inputValue.trim() === '') {
      setError("Can't be empty");
    } else {
      setError(null);
    }
  };

  return (
    <div className={cx('flex flex-col', className)}>
      {label && (
        <label
          htmlFor="text-input"
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
          type="text"
          value={value}
          onChange={handleInputChange}
          className={cx(
            'w-full',
            typographyStyles['body-lg'],
            'rounded border border-black/25 px-4 py-2',
            'placeholder:text-black/25)',
            'focus:border-main-purple active:border-main-purple',
            error && 'border-red focus:border-red active:border-red',
            'dark:bg-dark-grey dark:border-lines-dark dark:text-white dark:placeholder:text-lines-dark',
          )}
          placeholder={placeholder}
          {...props}
        />
        {error && <p className="absolute right-4 mt-2 text-red">{error}</p>}
      </div>
    </div>
  );
};

export default TextField;
