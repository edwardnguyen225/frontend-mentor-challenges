import clsx from "clsx";
import { antonio } from "@lib/fonts";

const CardInformation = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div
      className={clsx([
        "px-6 py-3 w-full",
        "flex items-center justify-between",
        "border border-[#38384F]",
        "uppercase",
      ])}
    >
      <span className="text-white/50 text-[8px] font-bold leading-none tracking-wide">
        {label}
      </span>
      <span className={clsx(["text-xl", antonio.variable])}>{value}</span>
    </div>
  );
};

export default CardInformation;
