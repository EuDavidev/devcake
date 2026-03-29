"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetPortal = DialogPrimitive.Portal;

const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        className={cn("fixed inset-0 z-50 bg-browndev/55", className)}
        {...props}
        ref={ref}
    />
));
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;

const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => (
    <SheetPortal>
        <SheetOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={cn(
                "fixed z-50 flex h-full w-[88vw] max-w-md flex-col border-l border-browndev/25 bg-rosecakeLight p-6 shadow-xl",
                side === "right" && "right-0 top-0",
                side === "left" && "left-0 top-0 border-r border-l-0",
                className,
            )}
            {...props}
        >
            {children}
            <SheetClose className="absolute right-4 top-4 rounded-full p-1 text-browndev transition hover:bg-rosecake">
                <X className="h-4 w-4" />
                <span className="sr-only">Fechar</span>
            </SheetClose>
        </DialogPrimitive.Content>
    </SheetPortal>
));
SheetContent.displayName = DialogPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }) => <div className={cn("mb-6", className)} {...props} />;
const SheetTitle = ({ className, ...props }) => (
    <h2 className={cn("font-title text-2xl font-bold text-browndev", className)} {...props} />
);

export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose };
