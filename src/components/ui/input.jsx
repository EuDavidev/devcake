import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                "flex h-11 w-full rounded-xl border border-browndev/30 bg-white/80 px-3 py-2 text-sm text-browndev shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-browndev/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-browndev",
                className,
            )}
            ref={ref}
            {...props}
        />
    );
});
Input.displayName = "Input";

export { Input };
