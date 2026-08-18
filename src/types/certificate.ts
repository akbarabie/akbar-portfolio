// src/types/certificate.ts

// Nama sertifikat, issuer, dan kredensial ID sengaja TIDAK di-translate —
// itu judul resmi dokumen (sama kayak project.title), harus identik ID/EN.
export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  /** Baris kecil di bawah issuer, misal jenis dokumen: "Sertifikat Kompetensi", "Online Course". */
  category: string;
  /** ISO date (YYYY-MM-DD) — dipakai buat sorting & format tanggal sesuai locale aktif. */
  issuedDate: string;
  credentialId?: string;
  verifyUrl?: string;
  image: string;
}
