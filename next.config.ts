import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 82],
  },
  async redirects() {
    return [
      // 旧URL・表記ゆれの受け皿（薄い地域ページは作らず熊谷市ページへ）
      { source: "/area", destination: "/area/kumagaya", permanent: true },
      { source: "/service", destination: "/shopping-support", permanent: true },
    ];
  },
};

export default nextConfig;
