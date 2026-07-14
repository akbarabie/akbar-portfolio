import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-8", {
  variants: {
    size: {
      default: "max-w-7xl",
      narrow: "max-w-3xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type ContainerProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof containerVariants>;

function Container({ className, size, ...props }: ContainerProps) {
  return <div className={cn(containerVariants({ size, className }))} {...props} />;
}

export { Container, containerVariants };