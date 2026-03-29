import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <textarea
            className={cn(
                "min-h-[120px] w-full rounded-xl border border-browndev/30 bg-white/80 px-3 py-2 text-sm text-browndev shadow-sm placeholder:text-browndev/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-browndev",
                className,
            )}
            ref={ref}
            {...props}
        />
    );
});
Textarea.displayName = "Textarea";

export { Textarea };
