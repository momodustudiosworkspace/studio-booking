import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [25, 50, 75, 100],
    domains: ["tailwindcss.com", "images.unsplash.com", "lh3.googleusercontent.com", "res.cloudinary.com"],
  },

  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
