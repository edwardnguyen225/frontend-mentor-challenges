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
        "md:p-4 md:flex-col md:items-start md:gap-3",
      ])}
    >
      <span className="text-white/50 text-[8px] font-bold leading-none tracking-wide">
        {label}
      </span>
      <span
        className={clsx([
          "text-xl md:text-2xl tracking-tight",
          antonio.className,
        ])}
      >
        {value}
      </span>
    </div>
  );
};

export default CardInformation;
