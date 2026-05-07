import { cn } from "@/app/lib/cn";

type Props = {
  className?: string;
  size?: number;
};

/**
 * 4-pointed sparkle vector. Pure SVG, no emoji.
 * Used as a small editorial accent next to eyebrows or section titles.
 */
export function Sparkle({ className, size = 12 }: Props) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      className={cn("inline-block text-accent", className)}
    >
      <path
        d="M6 0 C6 3 3 6 0 6 C3 6 6 9 6 12 C6 9 9 6 12 6 C9 6 6 3 6 0 Z"
        fill="currentColor"
      />
    </svg>
  );
}
