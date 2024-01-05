import cx from "classix";
import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "destructive";
  size?: "L" | "S";
  width?: string;
}

const colors = {
  primary: cx(
    "bg-[var(--color-main-purple)] hover:bg-[var(--color-main-purple-light)]",
    "text-white"
  ),
  secondary: cx(
    "bg-[#EFEFF9] hover:bg-[#D8D7F1]",
    "text-[var(--color-main-purple)]"
  ),
  destructive: cx(
    "bg-[var(--color-red)] hover:bg-[var(--color-red-hover)]",
    "text-white"
  ),
};

const sizes = {
  L: cx("py-4 px-6", "rounded-3xl", "text-[15px]"),
  S: cx("py-2 px-6", "rounded-[20px]", "text-[13px]"),
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "primary",
  size = "S",
  width,
}) => {
  return (
    <button
      className={cx(colors[variant], sizes[size], width, "font-bold")}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
