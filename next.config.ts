import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  //

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.generated.photos',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn3d.iconscout.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
