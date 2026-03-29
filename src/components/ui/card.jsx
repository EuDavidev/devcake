import { cn } from "@/lib/utils";

function Card({ className, ...props }) {
    return (
        <div
            className={cn(
                "rounded-3xl border border-browndev/15 bg-rosecakeLight/90 text-browndev shadow-sm",
                className,
            )}
            {...props}
        />
    );
}

function CardHeader({ className, ...props }) {
    return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />;
}

function CardTitle({ className, ...props }) {
    return <h3 className={cn("font-title text-2xl font-bold leading-none", className)} {...props} />;
}

function CardDescription({ className, ...props }) {
    return <p className={cn("text-sm text-browndev/80", className)} {...props} />;
}

function CardContent({ className, ...props }) {
    return <div className={cn("p-6 pt-0", className)} {...props} />;
}

function CardFooter({ className, ...props }) {
    return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />;
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
