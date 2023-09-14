export default function Button({
  children,
  onClick,
  className,
  disabled,
  type,
  style,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      className={`moodiButton ${className}`}
      disabled={disabled}
      type={type}
      style={style}
    >
      {children}
    </button>
  );
}
