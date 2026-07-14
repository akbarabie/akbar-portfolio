// src/lib/asset-exists.ts
import fs from "node:fs";
import path from "node:path";

/**
 * Cek keberadaan file statis di /public secara sinkron.
 * Aman dipanggil di Server Component (jalan di Node runtime, bukan Edge/browser).
 * Dipakai untuk fallback placeholder selama asset asli (cover project, foto profil,
 * dst) belum di-upload — supaya gak nampilin broken image di production.
 */
export function publicAssetExists(publicPath: string): boolean {
  const filePath = path.join(process.cwd(), "public", publicPath);
  try {
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}