const IconChevronDown: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      width="10"
      height="7"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path stroke="#635FC7" stroke-width="2" fill="none" d="m1 1 4 4 4-4" />
    </svg>
  );
};

export default IconChevronDown;
