/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  // Suppress the _document pages-router warning in app-router projects
  experimental: {},
};

export default nextConfig;
