import { cn } from "@/app/lib/cn";

type Props = {
  className?: string;
  label?: string;
};

export function ScrollIndicator({ className, label = "Scroll" }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4",
        className,
      )}
    >
      <span className="font-sans text-[10px] uppercase tracking-[0.32em] text-fg-faint">
        {label}
      </span>
      <div className="relative h-12 w-px overflow-hidden bg-fg-faintest">
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-1/3 bg-accent animate-[scrollPulse_2s_cubic-bezier(0.65,0,0.35,1)_infinite]"
        />
      </div>
    </div>
  );
}
