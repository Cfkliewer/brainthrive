import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  async redirects() {
    return [
      // The v2 "Modern Clinical" demo was promoted to the root paths.
      { source: "/v2", destination: "/", permanent: true },
      { source: "/v2/:path*", destination: "/:path*", permanent: true },
      // Retired demo versions.
      { source: "/v1", destination: "/", permanent: true },
      { source: "/v1/:path*", destination: "/", permanent: true },
      { source: "/v3", destination: "/", permanent: true },
      { source: "/v3/:path*", destination: "/", permanent: true },
      // Retired legacy-site routes.
      {
        source: "/services",
        destination: "/how-it-works#services",
        permanent: true,
      },
      { source: "/brain-lab", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
