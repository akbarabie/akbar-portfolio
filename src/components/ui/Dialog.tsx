"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  ariaLabel?: string;
  className?: string;
}

export function Dialog({ open, onOpenChange, children, ariaLabel, className }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={() => onOpenChange(false)}
      onClick={(e) => {
        if (e.target === dialogRef.current) onOpenChange(false);
      }}
      aria-label={ariaLabel}
      className={cn(
       "m-auto w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-0 text-foreground backdrop:bg-black/70",
      className
      )}
    >
      {children}
    </dialog>
  );
}