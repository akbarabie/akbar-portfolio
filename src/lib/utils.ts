// src/lib/utils.ts

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Menggabungkan className secara kondisional dan meng-resolve konflik
 * Tailwind (misal className default "p-4" di-override consumer jadi "p-2"
 * tidak akan menghasilkan keduanya nempel di DOM sekaligus).
 *
 * Dipakai di HAMPIR SEMUA reusable UI component (Button, Card, Badge, dll)
 * untuk menerima className tambahan dari luar tanpa merusak style default.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}