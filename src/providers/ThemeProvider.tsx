// components/ThemeProvider.tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

// export function ThemeProvider({
//   children,
//   ...props
// }: ComponentProps<typeof NextThemesProvider>) {
//   return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
// }

// KNOWN ISSUE — next-themes@0.4.6 + React 19.2 + Next.js 16.2+
// next-themes menyisipkan <script> inline untuk mencegah flash tema sebelum hydration.
// React 19 memunculkan dev-warning untuk setiap <script> yang dirender di React tree,
// meskipun script ini tetap tereksekusi benar lewat SSR. Confirmed false positive,
// tracked di: https://github.com/pacocoursey/next-themes/issues/387
// TODO: hapus blok ini begitu next-themes atau Next.js merilis fix.
if (process.env.NODE_ENV === "development") {
  const originalConsoleError = console.error;
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("Encountered a script tag")) {
      return;
    }
    originalConsoleError(...args);
  };
}

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}