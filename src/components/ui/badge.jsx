import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
    {
        variants: {
            variant: {
                default: "border-transparent bg-browndev text-rosecakeLight",
                secondary: "border-transparent bg-rosecake text-browndev",
                outline: "border-browndev/40 text-browndev",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

function Badge({ className, variant, ...props }) {
    return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
