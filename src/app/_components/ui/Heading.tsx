import { HTMLAttributes, forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const HeadingVariance = cva(
    "text-black dark:text-white text-center lg:text-left font-extrabold leading-tight tracking-tighter",
    {
        variants: {
            size: {
                default: "text-4xl md:text-5xl sm:text-6xl",
                sm: "text-2xl md:text-3xl sm:text-4xl",
                lg: "text-5xl md:text-6xl sm:text-7xl",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
);

interface HeadingProps
    extends HTMLAttributes<HTMLHeadingElement>,
        VariantProps<typeof HeadingVariance> {}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
    ({ className, size, children, ...props }, ref) => {
        return (
            <h1
                ref={ref}
                {...props}
                className={cn(HeadingVariance({ size, className }))}
            >
                {children}
            </h1>
        );
    }
);

Heading.displayName = "Heading";

export default Heading;
