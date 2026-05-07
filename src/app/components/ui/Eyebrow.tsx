import { cn } from "@/app/lib/cn";
import { Sparkle } from "./Sparkle";

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "accent" | "muted";
  /** Show a small sparkle decoration next to the label */
  sparkle?: boolean;
};

export function Eyebrow({
  className,
  tone = "accent",
  sparkle = false,
  children,
  ...props
}: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-sans text-xs font-medium uppercase",
        "tracking-[0.28em]",
        tone === "accent" && "text-accent",
        tone === "muted" && "text-fg-faint",
        className,
      )}
      {...props}
    >
      {sparkle && <Sparkle size={9} className="opacity-80" />}
      <span>{children}</span>
    </span>
  );
}
