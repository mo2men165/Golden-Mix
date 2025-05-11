import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { config } from 'process';

const nextConfig: NextConfig = {
  config: {
    turbo: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
