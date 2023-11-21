import clsx from "clsx";
import { Key } from "react";

const Tab = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <li className="me-2">
      <div
        className={clsx([
          "flex-grow",
          "uppercase text-[9px] font-bold tracking-[0.12em]",
          "inline-block p-4 border-b-2 rounded-t-lg",
          isActive && "text-white",
          isActive ? "border-b-4 border-[#419EBB]" : "border-transparent",
          "hover:text-white hover:bg-[#38384F]",
        ])}
        aria-current={isActive ? "page" : false}
        onClick={onClick}
      >
        {label}
      </div>
    </li>
  );
};

type TabsProps<T> = {
  options: T[];
  activeOptions: string;
  onOptionClick: (option: T) => void;
  containerClassName?: string;
};

const HorizontalTabs = <T,>({
  options,
  activeOptions,
  onOptionClick,
  containerClassName,
}: TabsProps<T>) => (
  <div
    className={clsx([
      "text-sm font-medium text-center text-white/50 border-b border-white/20 ",
      containerClassName,
    ])}
  >
    <ul className="flex justify-evenly">
      {options.map((option) => (
        <Tab
          key={option as Key}
          label={option as string}
          isActive={activeOptions === option}
          onClick={() => onOptionClick(option)}
        />
      ))}
    </ul>
  </div>
);

const VerticalTabs = <T,>({
  options,
  onOptionClick,
  activeOptions,
  containerClassName,
}: TabsProps<T>) => {
  return (
    <div className={containerClassName}>
      <ul className="w-full h-full flex flex-col justify-center items-end gap-4">
        {options.map((option, index) => (
          <div
            key={option as Key}
            className={clsx([
              "min-w-[280px] h-12 lg:w-full",
              "px-5 py-2",
              "flex items-center gap-6",
              "text-xs font-bold uppercase leading-[25px] tracking-[2.57px]",
              "border hover:bg-[#D8D8D8]/20 hover:border-[#D8D8D8]/20",
              option === activeOptions
                ? "bg-[#419EBB] border-[#419EBB]"
                : "border-white/20",
            ])}
            onClick={() => onOptionClick(option)}
          >
            <span className="opacity-50">0{index + 1}</span>
            {option as string}
          </div>
        ))}
      </ul>
    </div>
  );
};

const Tabs = {
  Horizontal: HorizontalTabs,
  Vertical: VerticalTabs,
};

export default Tabs;
export { HorizontalTabs, VerticalTabs };
