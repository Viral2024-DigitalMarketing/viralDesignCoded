/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ✅ makes next export a static 'out' folder build
  eslint: {
    ignoreDuringBuilds: true, // ✅ avoids ESLint errors from blocking your build
  },
  images: {
    unoptimized: true, // ✅ disables Next Image optimization (needed for static hosting like Hostinger)
  },
};

module.exports = nextConfig;
