// src/data/certificates.ts
//
// Buat nambah sertifikat baru: tinggal push object baru ke array ini +
// taruh gambarnya di /public/images/certificates/. Urutan tampil di web
// otomatis ngikutin issuedDate terbaru -> terlama (lihat sort di bawah),
// gak perlu re-order manual.

import type { Certificate } from "@/types/certificate";

const rawCertificates: Certificate[] = [
  {
    id: "hackerrank-python-basic",
    name: "Python (Basic)",
    issuer: "HackerRank",
    category: "Certificate of Accomplishment",
    issuedDate: "2026-08-10",
    credentialId: "C684307D2CE0",
    image: "/images/certificates/hackerrank-python-basic.jpg",
  },
  {
    id: "bnsp-wppe",
    name: "Wakil Perantara Pedagang Efek (WPPE)",
    issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
    category: "Sertifikat Kompetensi — Perantara Pedagang Efek",
    issuedDate: "2023-02-07",
    credentialId: "66142 2412 7 0000449 2023",
    image: "/images/certificates/bnsp-wppe.jpg",
  },
  {
    id: "ticmi-aekpi",
    name: "Analisa Ekonomi dan Penilaian Efek untuk Investasi",
    issuer: "TICMI — The Indonesia Capital Market Institute",
    category: "Online Course",
    issuedDate: "2022-11-15",
    credentialId: "AEKPI-0576/11/2022",
    image: "/images/certificates/ticmi-aekpi.jpg",
  },
  {
    id: "kominfo-cybersecurity",
    name: "Cyber Security Analyst untuk Sektor Publik",
    issuer: "KOMINFO — Thematic Academy Digital Talent Scholarship",
    category: "Sertifikat Pelatihan (60 Jam)",
    issuedDate: "2021-09-01",
    credentialId: "05106073151-31/TA.DTS/BLSDM.KOMINFO/2021",
    image: "/images/certificates/kominfo-cybersecurity.jpg",
  },
];

export const certificates: Certificate[] = [...rawCertificates].sort(
  (a, b) => new Date(b.issuedDate).getTime() - new Date(a.issuedDate).getTime()
);
