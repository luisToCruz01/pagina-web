import { cn } from "@/app/lib/cn";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  size?: "wide" | "prose";
};

export function Container({ className, size = "wide", ...props }: Props) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 sm:px-10",
        size === "wide" && "max-w-[1280px]",
        size === "prose" && "max-w-[720px]",
        className,
      )}
      {...props}
    />
  );
}
