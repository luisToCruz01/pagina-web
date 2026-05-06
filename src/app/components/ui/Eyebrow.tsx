import { cn } from "@/app/lib/cn";

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "accent" | "muted";
};

export function Eyebrow({ className, tone = "accent", ...props }: Props) {
  return (
    <span
      className={cn(
        "inline-block font-sans text-xs font-medium uppercase",
        "tracking-[0.28em]",
        tone === "accent" && "text-accent",
        tone === "muted" && "text-fg-faint",
        className,
      )}
      {...props}
    />
  );
}
