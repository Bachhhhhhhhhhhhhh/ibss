import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#021a0f] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "btn-shine btn-luxury bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300 text-emerald-950 shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:shadow-[0_0_60px_rgba(16,185,129,0.55)] hover:scale-[1.03] active:scale-[0.97]",
        secondary:
          "bg-white/[0.04] text-white border border-white/10 hover:bg-white/[0.08] hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] backdrop-blur-sm",
        ghost: "hover:bg-white/5 text-white/70 hover:text-white",
        gold:
          "btn-shine bg-gradient-to-r from-amber-500 to-amber-400 text-emerald-950 shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.45)] hover:scale-[1.02]",
        outline:
          "border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400/60",
      },
      size: {
        default: "h-12 px-7 py-2",
        sm: "h-9 rounded-xl px-4 text-xs",
        lg: "h-14 px-10 text-base rounded-2xl",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };