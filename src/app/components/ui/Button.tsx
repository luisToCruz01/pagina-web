import Link from "next/link";
import { cn } from "@/app/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

type Props = ButtonAsLink | ButtonAsButton;

const baseStyles = cn(
  "inline-flex h-12 items-center justify-center gap-2",
  "px-8 rounded-[2px]",
  "font-sans text-sm font-medium tracking-[0.02em]",
  "transition-[opacity,background-color,border-color,color] duration-200 ease-out",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
  "disabled:opacity-40 disabled:cursor-not-allowed",
);

const variantStyles: Record<Variant, string> = {
  primary: "bg-accent text-surface hover:opacity-90",
  secondary:
    "bg-transparent text-fg border border-fg/15 hover:border-fg/40 hover:bg-fg/5",
  ghost:
    "bg-transparent text-fg-muted hover:text-fg px-2 h-auto rounded-none",
};

export function Button(props: Props) {
  const { variant = "primary", className, children } = props;
  const classes = cn(baseStyles, variantStyles[variant], className);

  if ("href" in props && props.href) {
    const { href, external, ...rest } = props as ButtonAsLink;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className={classes}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { ...rest } = props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
