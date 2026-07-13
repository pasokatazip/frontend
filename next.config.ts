import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    PETYOYO_IMAGE_URL: process.env.PETYOYO_IMAGE_URL ?? "",
  },
};

export default nextConfig;
