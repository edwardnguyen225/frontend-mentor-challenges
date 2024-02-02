/**
 * If you don't know what is the right color, use this:
 * className={cx(
 * active ? 'fill-main-purple stroke-white' : 'fill-white stroke-main-purple',
 * )}
 */
const IconDelete: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...rest
}) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...rest}
  >
    <rect x="5" y="6" width="10" height="10" strokeWidth="2" />
    <path d="M3 6H17" strokeWidth="2" />
    <path d="M8 6V4H12V6" />
  </svg>
);

export default IconDelete;
