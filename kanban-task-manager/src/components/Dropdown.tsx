import cx from 'classix';
import Image from 'next/image';
import React, { useState } from 'react';

import IconChevronDown from '../../public/assets/icon-chevron-down.svg';
import IconChevronUp from '../../public/assets/icon-chevron-up.svg';
import { typographyStyles } from './Typography';

interface DropdownProps {
  label: string;
  options: string[];
  defaultValue?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  defaultValue,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    defaultValue || null,
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div>
      <label
        htmlFor="text-input"
        className={cx('text-xs text-medium-grey font-bold', 'dark:text-white')}
      >
        {label}
      </label>
      <div className="relative mt-2" role="button" tabIndex={0}>
        <button
          type="button"
          className={cx(
            'w-full px-4 py-2 flex justify-between items-center',
            typographyStyles['body-lg'],
            isOpen && 'focus:border-main-purple',
            'rounded border border-black/25 px-4 py-2',
            'dark:bg-dark-grey dark:border-lines-dark dark:text-white',
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption || 'Select an option'}
          <Image
            src={isOpen ? IconChevronUp : IconChevronDown}
            alt="Chevron Down"
            className=""
            width={10}
            height={10}
          />
        </button>
        {isOpen && (
          <ul
            className={cx(
              'absolute z-10 mt-2 w-full rounded-md bg-white py-1 shadow-lg',
              'flex flex-col',
              'dark:bg-very-dark-grey-black',
            )}
          >
            {options.map((option, index) => (
              <button
                key={option}
                tabIndex={index}
                type="button"
                className={cx(
                  typographyStyles['body-lg'],
                  'cursor-pointer px-4 py-2 text-left text-medium-grey hover:bg-gray-100 dark:hover:bg-gray-800',
                )}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
