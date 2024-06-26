import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary-gold-500 text-neutral-900 hover:boxShadow-lg transition",
        secondary:
          "bg-primary-gold-200 text-neutral-900 hover:boxShadow-lg transition",
        outline:
          "border border-input bg-white shadow-sm hover:bg-accent hover:text-accent-foreground",
        disabled:
          "bg-neutral-700 text-neutral-100 transition cursor-not-allowed",
        link: "text-primary underline-offset-4 hover:underline",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <>
        {asChild ? (
          <>
            <Slot
              className={cn(buttonVariants({ variant, size, className }))}
              ref={ref}
              {...props}
            />
          </>
        ) : (
          <>
            <button
              className={cn(buttonVariants({ variant, size, className }))}
              ref={ref}
              {...props}
            />
          </>
        )}
      </>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
