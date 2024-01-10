import cx from 'classix';
import Image from 'next/image';
import React from 'react';

import IconCheck from '../../public/assets/icon-check.svg';

interface SubtaskCheckboxProps {
  id: string;
  children: string | string[];
  completed: boolean;
  onChange: () => void;
}

const SubtaskCheckbox: React.FC<SubtaskCheckboxProps> = ({
  id,
  children,
  completed,
  onChange,
}) => {
  const handleCheckboxChange = () => {
    onChange();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="flex items-center rounded bg-light-grey hover:bg-main-purple/25 dark:bg-very-dark-grey-black"
      onClick={handleCheckboxChange}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          handleCheckboxChange();
        }
      }}
    >
      <label
        htmlFor={`children-checkbox-${id}`}
        className={cx(
          'my-3 ml-3 mr-4 grid select-none grid-flow-col items-center gap-3 text-sm font-semibold dark:text-white',
          completed
            ? 'line-through text-black/50 dark:text-white/50'
            : 'text-black',
        )}
      >
        <div className="grid items-center justify-center">
          <input
            id={`children-checkbox-${id}`}
            type="checkbox"
            checked={completed}
            onChange={handleCheckboxChange}
            className="peer col-start-1 row-start-1 h-4 w-4 appearance-none rounded border border-slate-300 ring-transparent checked:border-violet-600 checked:bg-violet-600 dark:border-slate-600 dark:checked:border-violet-600 forced-colors:appearance-auto"
          />
          <Image
            src={IconCheck}
            alt="Checked"
            className="invisible col-start-1 row-start-1 mx-auto stroke-white peer-checked:visible dark:text-violet-300 forced-colors:hidden"
            width={10}
            height={10}
          />
        </div>
        {children}
      </label>
      <div />
    </div>
  );
};

export default SubtaskCheckbox;
