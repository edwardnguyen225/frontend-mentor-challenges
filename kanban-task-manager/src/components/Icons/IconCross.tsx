const IconCross: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" className={className}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 7.414l4.95-4.95 1.414 1.414L9.414 8l4.95 4.95-1.414 1.414L8 9.414l-4.95 4.95-1.414-1.414L6.586 8 1.636 3.05l1.414-1.414L8 6.586z"
    />
  </svg>
);

export default IconCross;
