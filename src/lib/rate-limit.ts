// In-memory rate limiter — cukup buat MVP.
//
// KETERBATASAN JUJUR: reset tiap kali serverless function cold-start, dan
// Vercel bisa jalanin beberapa instance route ini secara paralel, masing-masing
// punya memory sendiri — jadi limit ini gak 100% akurat di traffic tinggi.
// Ini trade-off yang disengaja buat sekarang. Begitu Redis masuk stack
// (udah ada di roadmap kamu), ganti ini dengan Upstash Redis sliding window
// yang persist across instance.

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 3;

const requestLog = new Map<string, number[]>();

export function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(identifier) ?? []).filter(
    (t) => now - t < WINDOW_MS
  );

  if (timestamps.length >= MAX_REQUESTS) {
    requestLog.set(identifier, timestamps);
    return true;
  }

  timestamps.push(now);
  requestLog.set(identifier, timestamps);
  return false;
}