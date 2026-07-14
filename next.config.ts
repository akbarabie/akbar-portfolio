import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // konfigurasi existing kamu (kalau ada) tetap di sini
};

export default withNextIntl(nextConfig);