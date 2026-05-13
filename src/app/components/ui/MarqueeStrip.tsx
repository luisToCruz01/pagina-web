import { cn } from "@/app/lib/cn";

type Props = {
  items: string[];
  className?: string;
  /** Pause the animation on hover */
  pauseOnHover?: boolean;
};

export function MarqueeStrip({ items, className, pauseOnHover = false }: Props) {
  // Duplicate items so we can translate -50% and feel infinite
  const doubled = [...items, ...items];
  return (
    <div
      className={cn(
        "group relative overflow-hidden border-y border-rule",
        "bg-surface",
        className,
      )}
      aria-hidden="true"
    >
      {/* Edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent" />

      <div
        className={cn(
          "flex w-max will-change-transform animate-[marquee_60s_linear_infinite]",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-12 px-6 py-6 font-display text-2xl font-light leading-none text-fg-faint"
          >
            <span>{item}</span>
            <span aria-hidden className="text-accent/60">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
