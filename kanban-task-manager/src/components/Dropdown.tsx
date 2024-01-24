import { Listbox, Transition } from '@headlessui/react';
import cx from 'classix';
import React, { Fragment } from 'react';

import { IconChevronDown, IconChevronUp } from './Icons';
import Typography from './Typography';

interface DropdownProps {
  label: string;
  options: Array<any>;
  selectedOption: any;
  setSelectedOption: any;
  SelectedOption?: (option: any) => React.ReactNode;
  Option?: (props: {
    option: any;
    active: boolean;
    selected: boolean;
  }) => React.ReactNode;
}

const DefaultSelectedOption: DropdownProps['SelectedOption'] = ({ option }) => (
  <Typography variant="body-lg" className="dark:text-white">
    {option.name}
  </Typography>
);

const DefaultOption: DropdownProps['Option'] = ({
  option,
  active,
  selected,
}) => (
  <Typography
    variant="body-lg"
    className={cx(
      'block truncate',
      active ? 'text-white' : 'text-medium-grey',
      selected && 'font-bold',
    )}
  >
    {option.name}
  </Typography>
);

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedOption,
  setSelectedOption,
  SelectedOption = DefaultSelectedOption,
  Option = DefaultOption,
}) => {
  return (
    <Listbox value={selectedOption} onChange={setSelectedOption}>
      {({ open }) => (
        <div>
          {/* TODO: Wrap the below with label tag */}
          <Typography variant="body-md" className="text-medium-grey">
            {label}
          </Typography>

          <div className="relative">
            <Listbox.Button
              className={cx(
                'mt-2',
                'w-full px-4 py-2 flex justify-between items-center',
                'rounded border',
                'dark:bg-dark-grey',
                open
                  ? 'border-main-purple'
                  : 'border-lines-light dark:border-lines-dark ',
              )}
            >
              <SelectedOption option={selectedOption} />
              {open ? <IconChevronUp /> : <IconChevronDown />}
            </Listbox.Button>
            {open && (
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm dark:bg-dark-grey"
                  static
                >
                  {options.map((option) => (
                    <Listbox.Option
                      key={`option-${option.id}`}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-1 px-4 ${
                          active ? 'bg-main-purple-light' : ''
                        }`
                      }
                      value={option}
                    >
                      {({ active }) => (
                        <Option
                          option={option}
                          active={active}
                          selected={option.id === selectedOption.id}
                        />
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            )}
          </div>
        </div>
      )}
    </Listbox>
  );
};

export default Dropdown;
