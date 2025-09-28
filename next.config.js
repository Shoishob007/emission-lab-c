/** @type {import('next').NextConfig} */
const nextConfig = {
  // REMOVE or comment out the next line!
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;