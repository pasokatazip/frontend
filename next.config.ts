import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_VAPID_PUBLIC_KEY:
      process.env.VAPID_PUBLIC_KEY ??
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ??
      "",
    PETYOYO_IMAGE_VERSION: process.env.PETYOYO_IMAGE_VERSION ?? "",
    PETYOYO_IMAGE_URL: process.env.PETYOYO_IMAGE_URL ?? "",
  },
};

export default nextConfig;
