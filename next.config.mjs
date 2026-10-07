/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Emit /publications/index.html so both /publications and /publications/ work on GitHub Pages.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
