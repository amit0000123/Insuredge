import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/term",
        destination: "/services?tab=term",
        permanent: true,
      },
      {
        source: "/health",
        destination: "/services?tab=health",
        permanent: true,
      },
      {
        source: "/savings",
        destination: "/services?tab=savings",
        permanent: true,
      },
      {
        source: "/mutual-funds",
        destination: "/services?tab=mutual-funds",
        permanent: true,
      },
      {
        source: "/claim-assistant",
        destination: "/services?tab=claims",
        permanent: true,
      },
      {
        source: "/what-fits-best",
        destination: "/plans",
        permanent: true,
      },
      {
        source: "/talk-to-expert",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
