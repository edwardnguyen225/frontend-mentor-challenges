import cx from 'classix';
import React, { useState } from 'react';

import { typographyStyles } from './Typography';

interface TextFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  placeholder,
  onChange,
  required,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
    if (required && inputValue.trim() === '') {
      setError("Can't be empty");
    } else {
      setError(null);
    }
  };

  return (
    <div className="flex flex-col">
      <label
        htmlFor="text-input"
        className={cx('text-xs text-medium-grey font-bold', 'dark:text-white')}
      >
        {label}
      </label>
      <div className="static mt-2 flex w-full">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          className={cx(
            'w-full',
            typographyStyles['body-lg'],
            'rounded border border-black/25 px-4 py-2',
            'placeholder:text-black/25)',
            error && 'border-red focus:border-red active:border-red',
            'dark:bg-dark-grey dark:border-lines-dark dark:text-white dark:placeholder:text-lines-dark',
          )}
          placeholder={placeholder}
        />
        {error && <p className="absolute right-8 mt-2 text-red">{error}</p>}
      </div>
    </div>
  );
};

export default TextField;
