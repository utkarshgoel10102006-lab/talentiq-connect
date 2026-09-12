"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextValue | undefined>(undefined);

export function Dialog({
  open,
  defaultOpen,
  onOpenChange,
  children,
}: {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(open || defaultOpen || false);

  React.useEffect(() => {
    if (open !== undefined) setIsOpen(open);
  }, [open]);

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      if (open === undefined) setIsOpen(newOpen);
      onOpenChange?.(newOpen);
    },
    [onOpenChange, open]
  );

  return (
    <DialogContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({
  children,
  className,
  ...props
}: {
  asChild?: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(DialogContext);
  if (!context) throw new Error("DialogTrigger must be used within Dialog");

  return (
    <button
      type="button"
      className={className}
      onClick={() => context.onOpenChange(true)}
      {...props}
    >
      {children}
    </button>
  );
}

export function DialogContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(DialogContext);
  if (!context || !context.open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={() => context.onOpenChange(false)}
      />
      {/* Content */}
      <div
        className={cn(
          "relative z-50 w-full max-w-lg rounded-xl border bg-background p-6 shadow-2xl animate-in zoom-in-95 duration-200",
          className
        )}
        {...props}
      >
        <button
          onClick={() => context.onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 text-center sm:text-left mb-4", className)}
      {...props}
    />
  );
}

export function DialogTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6", className)}
      {...props}
    />
  );
}
