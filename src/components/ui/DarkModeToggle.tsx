// components/DarkModeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

function useMounted() {
  return useSyncExternalStore(
    () => () => {}, // no-op subscribe
    () => true, // client snapshot
    () => false // server snapshot
  );
}

export default function DarkModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return <div className="h-[55px] w-[115px]" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
     <div className="switch-button">
      <label className="switch-outer">
        <input
          type="checkbox"
          checked={isDark}
          onChange={() => setTheme(isDark ? "light" : "dark")}
          aria-label="Toggle dark mode"
        />
        <div className="button">
          <div className="button-toggle" />
          <div className="button-indicator" />
        </div>
      </label>
    </div>
  );
}