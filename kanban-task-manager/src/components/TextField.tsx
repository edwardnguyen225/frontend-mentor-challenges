import cx from 'classix';
import React, { useState } from 'react';

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
        className="mb-2 text-[var(--color-medium-grey)]"
      >
        {label}
      </label>
      <div className="static flex w-full">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          className={cx(
            'w-full',
            'rounded border border-[var--color-black]/25 px-4 py-2',
            'placeholder:text-[var(--color-black)]/25)',
            error &&
              'border-[var(--color-red)] focus:border-[var(--color-red)] active:border-[var(--color-red)]',
          )}
          placeholder={placeholder}
        />
        {error && (
          <p className="absolute right-8 mt-2 text-[var(--color-red)]">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextField;
