type BubbleMarkProps = {
  className?: string;
  ring?: string;
  fill?: string;
};

/**
 * The brand mark: a scantron answer bubble, filled slightly off-center
 * the way a pencil actually fills one in. Doubles as the favicon and
 * as a progress/loading motif inside the product.
 */
export function BubbleMark({
  className,
  ring = "currentColor",
  fill = "var(--brand)",
}: BubbleMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="26.5" stroke={ring} strokeWidth="5" />
      <ellipse
        cx="36.5"
        cy="35"
        rx="15"
        ry="12.5"
        fill={fill}
        transform="rotate(-16 36.5 35)"
      />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  markClassName?: string;
  withWordmark?: boolean;
};

export function Logo({
  className,
  markClassName = "h-8 w-8",
  withWordmark = true,
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-ink ${className ?? ""}`}>
      <BubbleMark className={markClassName} />
      {withWordmark ? (
        <span className="font-display text-[1.15rem] font-extrabold uppercase tracking-tight">
          LC <span className="text-brand">SAT</span> Academy
        </span>
      ) : null}
    </span>
  );
}
