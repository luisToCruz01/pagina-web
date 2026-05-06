import { cn } from "@/app/lib/cn";

type Props = {
  className?: string;
};

export function RuleLine({ className }: Props) {
  return <div className={cn("h-px w-full bg-rule", className)} />;
}
