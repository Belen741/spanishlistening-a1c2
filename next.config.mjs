/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Force trailing slash behavior to avoid unnecessary redirects
  trailingSlash: false,
  
  images: {
    formats: ['image/webp'],
  },
  
  // Optimize audio serving
  async headers() {
    return [
      {
        source: '/audios/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
