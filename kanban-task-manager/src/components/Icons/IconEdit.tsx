/**
 * If you don't know what is the right color, use this:
 * className={cx(
 * active ? 'fill-main-purple stroke-white' : 'fill-white stroke-main-purple',
 * )}
 */
const IconEdit: React.FC<React.SVGProps<SVGSVGElement>> = ({
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
    <path d="M4 13V16H7L16 7L13 4L4 13Z" strokeWidth="2" />
  </svg>
);

export default IconEdit;
